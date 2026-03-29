# someailist

Auto-updated OpenAI and Anthropic rule lists for Surge and Shadowrocket.

The source data comes from:

- `https://raw.githubusercontent.com/v2fly/domain-list-community/master/data/openai`
- `https://raw.githubusercontent.com/v2fly/domain-list-community/master/data/anthropic`

This repository updates itself daily with GitHub Actions.

## Quick Links

### Surge

#### OpenAI

- Raw: `https://raw.githubusercontent.com/70akaline/someailist/main/surge/openai.list`
- jsDelivr: `https://cdn.jsdelivr.net/gh/70akaline/someailist@main/surge/openai.list`
- ghproxy template: `<your-ghproxy-prefix>/https://raw.githubusercontent.com/70akaline/someailist/main/surge/openai.list`

#### OpenAI Tracking

- Raw: `https://raw.githubusercontent.com/70akaline/someailist/main/surge/openai-tracking.list`
- jsDelivr: `https://cdn.jsdelivr.net/gh/70akaline/someailist@main/surge/openai-tracking.list`
- ghproxy template: `<your-ghproxy-prefix>/https://raw.githubusercontent.com/70akaline/someailist/main/surge/openai-tracking.list`

#### Anthropic

- Raw: `https://raw.githubusercontent.com/70akaline/someailist/main/surge/anthropic.list`
- jsDelivr: `https://cdn.jsdelivr.net/gh/70akaline/someailist@main/surge/anthropic.list`
- ghproxy template: `<your-ghproxy-prefix>/https://raw.githubusercontent.com/70akaline/someailist/main/surge/anthropic.list`

#### Anthropic Tracking

- Raw: `https://raw.githubusercontent.com/70akaline/someailist/main/surge/anthropic-tracking.list`
- jsDelivr: `https://cdn.jsdelivr.net/gh/70akaline/someailist@main/surge/anthropic-tracking.list`
- ghproxy template: `<your-ghproxy-prefix>/https://raw.githubusercontent.com/70akaline/someailist/main/surge/anthropic-tracking.list`

### Shadowrocket

#### OpenAI

- Raw: `https://raw.githubusercontent.com/70akaline/someailist/main/shadowrocket/openai.list`
- jsDelivr: `https://cdn.jsdelivr.net/gh/70akaline/someailist@main/shadowrocket/openai.list`
- ghproxy template: `<your-ghproxy-prefix>/https://raw.githubusercontent.com/70akaline/someailist/main/shadowrocket/openai.list`

#### OpenAI Tracking

- Raw: `https://raw.githubusercontent.com/70akaline/someailist/main/shadowrocket/openai-tracking.list`
- jsDelivr: `https://cdn.jsdelivr.net/gh/70akaline/someailist@main/shadowrocket/openai-tracking.list`
- ghproxy template: `<your-ghproxy-prefix>/https://raw.githubusercontent.com/70akaline/someailist/main/shadowrocket/openai-tracking.list`

#### Anthropic

- Raw: `https://raw.githubusercontent.com/70akaline/someailist/main/shadowrocket/anthropic.list`
- jsDelivr: `https://cdn.jsdelivr.net/gh/70akaline/someailist@main/shadowrocket/anthropic.list`
- ghproxy template: `<your-ghproxy-prefix>/https://raw.githubusercontent.com/70akaline/someailist/main/shadowrocket/anthropic.list`

#### Anthropic Tracking

- Raw: `https://raw.githubusercontent.com/70akaline/someailist/main/shadowrocket/anthropic-tracking.list`
- jsDelivr: `https://cdn.jsdelivr.net/gh/70akaline/someailist@main/shadowrocket/anthropic-tracking.list`
- ghproxy template: `<your-ghproxy-prefix>/https://raw.githubusercontent.com/70akaline/someailist/main/shadowrocket/anthropic-tracking.list`

## Notes

- `Anthropic Tracking` is currently almost empty because the upstream `anthropic` source does not explicitly mark separate tracking domains right now.
- If you use a GitHub proxy service, replace `<your-ghproxy-prefix>` with your preferred prefix.
- The rule files are plain text lists that are easy to consume from subscription tools, scripts, and CDN mirrors.
