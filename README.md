# someailist
Thanks: [v2fly/domain-list-community](https://github.com/v2fly/domain-list-community) and [Loyalsoldier/v2ray-rules-dat](https://github.com/Loyalsoldier/v2ray-rules-dat)

Auto-updated OpenAI, Anthropic, and Grok rule lists for Surge and Shadowrocket.

The source data comes from:

- `https://raw.githubusercontent.com/v2fly/domain-list-community/master/data/openai`
- `https://raw.githubusercontent.com/v2fly/domain-list-community/master/data/anthropic`
- `https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Claude/Claude.list`

This repository updates itself daily with GitHub Actions.

## Quick Links

<details>
<summary><strong>Surge</strong></summary>

#### OpenAI

- Raw: `https://raw.githubusercontent.com/70akaline/someailist/main/surge/openai.list`
- jsDelivr: `https://cdn.jsdelivr.net/gh/70akaline/someailist@main/surge/openai.list`
- ghproxy: `https://ghfast.top/https://raw.githubusercontent.com/70akaline/someailist/main/surge/openai.list`

#### OpenAI Tracking

- Raw: `https://raw.githubusercontent.com/70akaline/someailist/main/surge/openai-tracking.list`
- jsDelivr: `https://cdn.jsdelivr.net/gh/70akaline/someailist@main/surge/openai-tracking.list`
- ghproxy: `https://ghfast.top/https://raw.githubusercontent.com/70akaline/someailist/main/surge/openai-tracking.list`

#### Anthropic

- Raw: `https://raw.githubusercontent.com/70akaline/someailist/main/surge/anthropic.list`
- jsDelivr: `https://cdn.jsdelivr.net/gh/70akaline/someailist@main/surge/anthropic.list`
- ghproxy: `https://ghfast.top/https://raw.githubusercontent.com/70akaline/someailist/main/surge/anthropic.list`

#### Anthropic Tracking

- Raw: `https://raw.githubusercontent.com/70akaline/someailist/main/surge/anthropic-tracking.list`
- jsDelivr: `https://cdn.jsdelivr.net/gh/70akaline/someailist@main/surge/anthropic-tracking.list`
- ghproxy: `https://ghfast.top/https://raw.githubusercontent.com/70akaline/someailist/main/surge/anthropic-tracking.list`

#### Grok

- Raw: `https://raw.githubusercontent.com/70akaline/someailist/main/surge/grok.list`
- jsDelivr: `https://cdn.jsdelivr.net/gh/70akaline/someailist@main/surge/grok.list`
- ghproxy: `https://ghfast.top/https://raw.githubusercontent.com/70akaline/someailist/main/surge/grok.list`

</details>

### Shadowrocket

#### OpenAI

- Raw: `https://raw.githubusercontent.com/70akaline/someailist/main/shadowrocket/openai.list`
- jsDelivr: `https://cdn.jsdelivr.net/gh/70akaline/someailist@main/shadowrocket/openai.list`
- ghproxy: `https://ghfast.top/https://raw.githubusercontent.com/70akaline/someailist/main/shadowrocket/openai.list`

<details>
<summary><strong>OpenAI Tracking</strong></summary>

- Raw: `https://raw.githubusercontent.com/70akaline/someailist/main/shadowrocket/openai-tracking.list`
- jsDelivr: `https://cdn.jsdelivr.net/gh/70akaline/someailist@main/shadowrocket/openai-tracking.list`
- ghproxy: `https://ghfast.top/https://raw.githubusercontent.com/70akaline/someailist/main/shadowrocket/openai-tracking.list`

</details>

#### Anthropic

- Raw: `https://raw.githubusercontent.com/70akaline/someailist/main/shadowrocket/anthropic.list`
- jsDelivr: `https://cdn.jsdelivr.net/gh/70akaline/someailist@main/shadowrocket/anthropic.list`
- ghproxy: `https://ghfast.top/https://raw.githubusercontent.com/70akaline/someailist/main/shadowrocket/anthropic.list`

#### Grok

- Raw: `https://raw.githubusercontent.com/70akaline/someailist/main/shadowrocket/grok.list`
- jsDelivr: `https://cdn.jsdelivr.net/gh/70akaline/someailist@main/shadowrocket/grok.list`
- ghproxy: `https://ghfast.top/https://raw.githubusercontent.com/70akaline/someailist/main/shadowrocket/grok.list`

<details>
<summary><strong>Anthropic Tracking</strong></summary>

- Raw: `https://raw.githubusercontent.com/70akaline/someailist/main/shadowrocket/anthropic-tracking.list`
- jsDelivr: `https://cdn.jsdelivr.net/gh/70akaline/someailist@main/shadowrocket/anthropic-tracking.list`
- ghproxy: `https://ghfast.top/https://raw.githubusercontent.com/70akaline/someailist/main/shadowrocket/anthropic-tracking.list`

</details>

## Notes

- `Anthropic Tracking` is currently almost empty because the upstream `anthropic` source does not explicitly mark separate tracking domains right now.
- GitHub proxy examples in this README use `https://ghfast.top/` as the fixed prefix.
- The rule files are plain text lists that are easy to consume from subscription tools, scripts, and CDN mirrors.
