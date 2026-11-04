// dsh-plugin-bulkpublish: registers the remote BulkPublish MCP server with DeepSeek Harness.
// Tools appear to the model as mcp__bulkpublish__<tool>.
import { buildMcpConfig, DEFAULT_ENV } from './config.js'

export const name = 'bulkpublish'

/** Plain config description (all optional). */
export const Config = {
  url: 'BulkPublish MCP endpoint (default https://mcp.bulkpublish.com)',
  apiKeyEnv: `Environment variable holding your BulkPublish API key (default ${DEFAULT_ENV})`,
  apiKey: 'API key (prefer the environment variable; never commit it)',
  serverName: 'Tool namespace (default bulkpublish)',
}

export async function apply(ctx, config = {}, deps = {}) {
  const mcpConfig = buildMcpConfig(config, deps.env || process.env)
  if (!mcpConfig) {
    const msg = `BulkPublish: no API key found. Set ${config.apiKeyEnv || DEFAULT_ENV} (create a key at https://www.bulkpublish.com) and reload.`
    ctx.logger?.('bulkpublish')?.warn?.(msg) ?? console.warn(msg)
    return
  }
  const mcpClient = deps.mcpClient || (await import('@deepseek-ai/dsh-mcp-client'))
  ctx.plugin(mcpClient, mcpConfig)
}
