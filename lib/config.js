export const DEFAULT_URL = 'https://mcp.bulkpublish.com'
export const DEFAULT_ENV = 'BULKPUBLISH_API_KEY'
export const SERVER_NAME = 'bulkpublish'

/** Resolve plugin config into a @deepseek-ai/dsh-mcp-client streamable-http config, or null without a key. */
export function buildMcpConfig(config = {}, env = process.env) {
  const url = config.url || DEFAULT_URL
  const apiKey = config.apiKey || env[config.apiKeyEnv || DEFAULT_ENV]
  if (!apiKey) return null
  return {
    serverName: config.serverName || SERVER_NAME,
    transport: 'streamable-http',
    url,
    headers: { Authorization: `Bearer ${apiKey}` },
    toolCallTimeoutMs: config.toolCallTimeoutMs ?? 60000,
  }
}
