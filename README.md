<p align="center">
  <a href="https://www.bulkpublish.com"><img src="assets/logo.png" alt="BulkPublish" width="120" height="120"></a>
</p>

<h1 align="center">BulkPublish for DeepSeek Harness</h1>

<p align="center">
  <a href="https://www.bulkpublish.com">bulkpublish.com</a> ·
  <a href="https://www.bulkpublish.com/integrations/mcp-server/">MCP server docs</a> ·
  <a href="https://www.npmjs.com/package/dsh-plugin-bulkpublish">npm</a>
</p>

## What it does

`dsh-plugin-bulkpublish` connects DeepSeek Harness (dsh) to the [BulkPublish](https://www.bulkpublish.com) MCP server at `https://mcp.bulkpublish.com`. Once it is installed, the model can draft, schedule, publish and analyse social media posts, upload and browse media, and work through inbox conversations and post comments, all from a dsh chat.

The plugin's `apply(ctx, config)` loads DSH's own `@deepseek-ai/dsh-mcp-client` as a child plugin with a `streamable-http` transport. BulkPublish tools then appear to the model as `mcp__bulkpublish__<tool>`.

## Supported platforms (15)

Facebook · Instagram · X/Twitter · TikTok · YouTube · Threads · Bluesky · Pinterest · Google Business Profile · LinkedIn · Mastodon · Discord · Telegram · Tumblr · Snapchat

## Setup

1. Create a BulkPublish account at [bulkpublish.com](https://www.bulkpublish.com) and connect the channels you want to post to.
2. Get an API key from the **Developer** dashboard: [app.bulkpublish.com/developer](https://app.bulkpublish.com/developer). Keys start with `bp_`.
3. Export it before you start dsh:

   ```sh
   export BULKPUBLISH_API_KEY=bp_your_key_here
   ```

Authentication uses a BulkPublish API key sent as a bearer token (`Authorization: Bearer <key>`). The key is read from the environment at runtime. It is not written into your profile or shipped with this package. If no key is set, the plugin logs a warning and registers no tools.

## Install

```sh
dsh plugin --profile web add dsh-plugin-bulkpublish
```

From source:

```sh
dsh plugin --profile web add github:bulkpublish/dsh-plugin-bulkpublish
```

The bundle inserts this entry into your profile (`cordis.patch.yml`):

```yaml
- id: bulkpublish
  name: 'dsh-plugin-bulkpublish'
  config:
    url: 'https://mcp.bulkpublish.com'
```

Optional config: `apiKeyEnv` (env var name, default `BULKPUBLISH_API_KEY`), `serverName` (tool namespace, default `bulkpublish`), `toolCallTimeoutMs` (default `60000`).

## Example prompts

- "List my connected channels and tell me which ones need reconnecting."
- "Draft a LinkedIn and X post announcing our spring sale, and schedule it for the next free queue slot."
- "Upload https://example.com/banner.png and schedule an Instagram post with it for Friday at 10:00."
- "Show me last month's analytics broken down by platform."
- "Retry the failed platforms on yesterday's post."
- "Show the unread inbox conversations and draft replies for me to review."

## Tools

These are the 32 tools the BulkPublish MCP server returns from `tools/list`:

| Area | Tools |
|---|---|
| Posts | `create_post`, `update_post`, `get_post`, `list_posts`, `delete_post`, `publish_post`, `retry_post`, `get_queue_slot` |
| Approval | `approve_post`, `reject_post` |
| Channels | `list_channels`, `get_channel_options`, `update_channel` |
| Media | `upload_media`, `list_media`, `create_media_upload`, `finalize_media_upload` |
| Labels | `list_labels` |
| Analytics | `get_analytics`, `get_post_metrics` |
| Inbox | `list_conversations`, `get_conversation`, `reply_to_conversation`, `update_conversation` |
| Comments | `list_post_comments`, `reply_to_comment`, `moderate_comment` |
| Interactive views | `compose_post`, `view_posts`, `view_channels`, `view_media`, `view_analytics` |

Publishing, replies and comment moderation act on your real accounts right away. Review what the model proposes before you approve those calls.

## Support

- Website: [bulkpublish.com](https://www.bulkpublish.com)
- MCP server docs: [bulkpublish.com/integrations/mcp-server](https://www.bulkpublish.com/integrations/mcp-server/)
- Issues: [github.com/bulkpublish/dsh-plugin-bulkpublish/issues](https://github.com/bulkpublish/dsh-plugin-bulkpublish/issues)

## License

[MIT](LICENSE) © BulkPublish
