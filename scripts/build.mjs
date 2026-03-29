import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..");

const sources = [
  {
    name: "openai",
    url: "https://raw.githubusercontent.com/v2fly/domain-list-community/master/data/openai",
  },
  {
    name: "anthropic",
    url: "https://raw.githubusercontent.com/v2fly/domain-list-community/master/data/anthropic",
  },
];

const extraMainRulesBySource = {
  anthropic: ["DOMAIN,cdn.usefathom.com"],
};

const trackingKeywordPattern =
  /(telemetry|tracking|analytics|analytic|metrics?|measure|measurement|stats|statistic|event|events|sentry|datadog|intake|collect|collector|beacon|pixel|sdk|log|logging|monitor|observability|sessionreplay)/i;

function dedupeRules(rules) {
  const seen = new Set();
  const deduped = [];

  for (const rule of rules) {
    if (seen.has(rule)) {
      continue;
    }
    seen.add(rule);
    deduped.push(rule);
  }

  return deduped;
}

function stripComment(line) {
  const commentIndex = line.indexOf("#");
  if (commentIndex === -1) {
    return { content: line.trim(), comment: "" };
  }

  return {
    content: line.slice(0, commentIndex).trim(),
    comment: line.slice(commentIndex + 1).trim(),
  };
}

function parseEntry(rawLine, currentSection) {
  const trimmed = rawLine.trim();
  if (!trimmed) {
    return { type: "empty" };
  }

  if (trimmed.startsWith("#")) {
    return { type: "comment", comment: trimmed.slice(1).trim() };
  }

  const { content } = stripComment(trimmed);
  if (!content) {
    return { type: "empty" };
  }

  const parts = content.split(/\s+/);
  const primary = parts[0];
  const attributes = parts.slice(1).filter((part) => part.startsWith("@"));

  let ruleType = "DOMAIN-SUFFIX";
  let value = primary;

  if (primary.startsWith("full:")) {
    ruleType = "DOMAIN";
    value = primary.slice("full:".length);
  } else if (primary.startsWith("keyword:")) {
    ruleType = "DOMAIN-KEYWORD";
    value = primary.slice("keyword:".length);
  } else if (primary.startsWith("regexp:")) {
    ruleType = "URL-REGEX";
    const regexBody = primary
      .slice("regexp:".length)
      .replace(/^\^/, "")
      .replace(/\$$/, "");
    value = `^https?:\\/\\/${regexBody}(?::\\d+)?(?:\\/|$)`;
  }

  const trackingByAttribute = attributes.some((attribute) => attribute.toLowerCase() === "@ads");
  const trackingBySection = /tracking/i.test(currentSection);
  const trackingByKeyword = trackingKeywordPattern.test(primary);

  return {
    type: "entry",
    source: primary,
    rule: `${ruleType},${value}`,
    tracking: trackingByAttribute || trackingBySection || trackingByKeyword,
  };
}

function collectRules(sourceName, text) {
  const main = [];
  const tracking = [];
  const seenMain = new Set();
  const seenTracking = new Set();
  let currentSection = "";

  for (const line of text.split(/\r?\n/)) {
    const parsed = parseEntry(line, currentSection);

    if (parsed.type === "comment") {
      currentSection = parsed.comment;
      continue;
    }

    if (parsed.type !== "entry") {
      continue;
    }

    const target = parsed.tracking ? tracking : main;
    const seen = parsed.tracking ? seenTracking : seenMain;
    const annotatedRule = `${parsed.rule}`;

    if (!seen.has(annotatedRule)) {
      target.push(annotatedRule);
      seen.add(annotatedRule);
    }
  }

  for (const rule of extraMainRulesBySource[sourceName] ?? []) {
    if (!seenMain.has(rule)) {
      main.push(rule);
      seenMain.add(rule);
    }
  }

  return {
    name: sourceName,
    main: dedupeRules(main),
    tracking: dedupeRules(tracking),
  };
}

function renderList({ title, generatedAt, sourceSummaries, rules }) {
  const lines = [
    `# ${title}`,
    `# Generated at: ${generatedAt}`,
    `# Sources: ${sourceSummaries.join(", ")}`,
    "",
    ...rules,
    "",
  ];

  return `${lines.join("\n")}`;
}

async function fetchText(url) {
  const response = await fetch(url, {
    headers: {
      "user-agent": "someailist-builder",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
  }

  return response.text();
}

async function main() {
  const fetched = await Promise.all(
    sources.map(async (source) => ({
      ...source,
      text: await fetchText(source.url),
    })),
  );

  const collected = fetched.map((source) => collectRules(source.name, source.text));
  const generatedAt = new Date().toISOString();

  await Promise.all([
    mkdir(path.join(repoRoot, "surge"), { recursive: true }),
    mkdir(path.join(repoRoot, "shadowrocket"), { recursive: true }),
  ]);

  const writes = [];

  for (const entry of collected) {
    const sourceSummaries = sources
      .filter((source) => source.name === entry.name)
      .map((source) => `${source.name}=${source.url}`);

    const mainContent = renderList({
      title: `${entry.name} rules for Surge / Shadowrocket`,
      generatedAt,
      sourceSummaries,
      rules: entry.main,
    });

    const trackingContent = renderList({
      title: `${entry.name} tracking rules for Surge / Shadowrocket`,
      generatedAt,
      sourceSummaries,
      rules: entry.tracking,
    });

    writes.push(
      writeFile(path.join(repoRoot, "surge", `${entry.name}.list`), mainContent, "utf8"),
      writeFile(
        path.join(repoRoot, "surge", `${entry.name}-tracking.list`),
        trackingContent,
        "utf8",
      ),
      writeFile(path.join(repoRoot, "shadowrocket", `${entry.name}.list`), mainContent, "utf8"),
      writeFile(
        path.join(repoRoot, "shadowrocket", `${entry.name}-tracking.list`),
        trackingContent,
        "utf8",
      ),
    );
  }

  await Promise.all(writes);
}

await main();
