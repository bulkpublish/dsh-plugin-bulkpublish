import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { apply, name } from '../lib/index.js'
import { buildMcpConfig } from '../lib/config.js'

test('exports name and apply', () => {
  assert.equal(name, 'bulkpublish')
  assert.equal(typeof apply, 'function')
})

test('builds streamable-http config with bearer token from env', () => {
  const c = buildMcpConfig({}, { BULKPUBLISH_API_KEY: 'k' })
  assert.equal(c.url, 'https://mcp.bulkpublish.com')
  assert.equal(c.transport, 'streamable-http')
  assert.equal(c.headers.Authorization, 'Bearer k')
})

test('returns null without key', () => assert.equal(buildMcpConfig({}, {}), null))

test('apply registers mcp-client child plugin', async () => {
  const calls = []
  const ctx = { plugin: (p, c) => calls.push([p, c]) }
  const fake = { name: 'mcp-client' }
  await apply(ctx, {}, { env: { BULKPUBLISH_API_KEY: 'x' }, mcpClient: fake })
  assert.equal(calls.length, 1)
  assert.equal(calls[0][0], fake)
  assert.equal(calls[0][1].serverName, 'bulkpublish')
})

test('apply without key does not register', async () => {
  const calls = []
  await apply({ plugin: () => calls.push(1), logger: () => ({ warn() {} }) }, {}, { env: {} })
  assert.equal(calls.length, 0)
})

test('manifest declares dsh.bundle.patch pointing at an existing file', () => {
  const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url)))
  assert.equal(pkg.dsh.bundle.patch, './cordis.patch.yml')
  const yml = readFileSync(new URL('../cordis.patch.yml', import.meta.url), 'utf8')
  assert.match(yml, /name: 'dsh-plugin-bulkpublish'/)
})
