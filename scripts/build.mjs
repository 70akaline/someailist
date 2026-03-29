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

const trackingKeywordPattern =
  /(telemetry|tracking|analytics|analytic|metrics?|measure|measurement|stats|statistic|event|events|sentry|datadog|intake|collect|collector|beacon|pixel|sdk|log|logging|monitor|observability|sessionreplay)/i;

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

  return {
    name: sourceName,
    main,
    tracking,
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
  const sourceSummaries = fetched.map((source) => `${source.name}=${source.url}`);

  const mainRules = collected.flatMap((entry) => entry.main);
  const trackingRules = collected.flatMap((entry) => entry.tracking);

  await Promise.all([
    mkdir(path.join(repoRoot, "surge"), { recursive: true }),
    mkdir(path.join(repoRoot, "shadowrocket"), { recursive: true }),
  ]);

  const mainContent = renderList({
    title: "AI rules for Surge / Shadowrocket",
    generatedAt,
    sourceSummaries,
    rules: mainRules,
  });

  const trackingContent = renderList({
    title: "AI tracking rules for Surge / Shadowrocket",
    generatedAt,
    sourceSummaries,
    rules: trackingRules,
  });

  await Promise.all([
    writeFile(path.join(repoRoot, "surge", "ai.list"), mainContent, "utf8"),
    writeFile(path.join(repoRoot, "surge", "ai-tracking.list"), trackingContent, "utf8"),
    writeFile(path.join(repoRoot, "shadowrocket", "ai.list"), mainContent, "utf8"),
    writeFile(path.join(repoRoot, "shadowrocket", "ai-tracking.list"), trackingContent, "utf8"),
  ]);
}

await main();
