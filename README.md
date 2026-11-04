# dsh-plugin-bulkpublish

[BulkPublish](https://www.bulkpublish.com) plugin for DeepSeek Harness (dsh). It connects dsh to the remote BulkPublish MCP server (`https://mcp.bulkpublish.com`) so the model can draft, schedule, publish and analyse social media posts across 15 social platforms.

Docs: https://www.bulkpublish.com/integrations/mcp-server/

## Install

```sh
dsh plugin --profile web add dsh-plugin-bulkpublish
```

Until the npm package is published, install from source:

```sh
dsh plugin --profile web add github:bulkpublish/dsh-plugin-bulkpublish
```

## Authentication

The plugin uses a BulkPublish API key (sent as a bearer token). Create a key in your BulkPublish account, then export it before starting dsh:

```sh
export BULKPUBLISH_API_KEY=your_key_here
```

The key is read at runtime and is never written to the profile or shipped with this package. If no key is set, the plugin logs a warning and registers no tools.

## Configuration

The bundle inserts this entry into your profile (`cordis.patch.yml`):

```yaml
- id: bulkpublish
  name: 'dsh-plugin-bulkpublish'
  config:
    url: 'https://mcp.bulkpublish.com'
```

Optional fields: `apiKeyEnv` (name of the env var, default `BULKPUBLISH_API_KEY`), `serverName` (tool namespace, default `bulkpublish`), `toolCallTimeoutMs`.

## How it works

`apply(ctx, config)` reads the key and loads `@deepseek-ai/dsh-mcp-client` as a child plugin with a `streamable-http` transport and an `Authorization: Bearer …` header. BulkPublish tools then appear to the model as `mcp__bulkpublish__<tool>`.

**External service:** all tool calls go to `mcp.bulkpublish.com` and act on your BulkPublish account (they can publish posts to your connected channels).

## Development

```sh
npm test
```

## License

MIT © BulkPublish
