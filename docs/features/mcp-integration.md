---
sidebar_position: 23
title: MCP Integration
description: Let Claude, Cursor, and other AI assistants read and manage your tududi data over the Model Context Protocol.
---
# MCP Integration

tududi ships an [MCP](https://modelcontextprotocol.io) server, so AI assistants like Claude Desktop and Cursor can read and modify your tasks, projects, inbox, and more through a standard protocol — no custom integration code required.

**What it provides:**
- **59 tools** covering tasks, projects, inbox, views, goals, areas, notes, tags, habits, and people
- **Token authentication** with strict per-user isolation
- **Two transport modes** — local (stdio) and remote (HTTP)
- **Opt-in** behind the `FF_ENABLE_MCP` feature flag
- **Config generator** in the web interface

MCP was introduced in tududi v1.0.0.

---
## What is MCP?

The Model Context Protocol is an open protocol that standardizes how AI applications connect to external data and tools — think of it as a universal connector for AI assistants.

tududi acts as an MCP **server**, exposing tools the AI client discovers and calls. In practice:

- The AI sees tududi as a set of tools like `list_tasks`, `create_task`, and `search`
- You speak naturally — "show me my overdue tasks" triggers `list_tasks`
- The AI can act — "create a task for X" triggers `create_task`
- Every call is authenticated with your API token

---
## Supported Clients

| Client | Transport | Setup |
|--------|-----------|-------|
| Claude Desktop | Stdio or HTTP | Easy |
| Cursor | Stdio | Easy |
| VS Code + Continue | Stdio | Medium |
| Windsurf (Codeium) | Stdio | Easy |
| Zed | Stdio | Medium |
| Any HTTP-capable client | HTTP | Medium |

---
## Setup

### Prerequisites

1. tududi v1.0.0 or later, running
2. An API token — generate one at **Profile → API Keys**
3. `FF_ENABLE_MCP=true` in your environment
4. An MCP-compatible client

### Enable the feature

```bash
# In your .env file
FF_ENABLE_MCP=true
```

Restart tududi. The **MCP Integration** tab appears in Profile settings once the flag is on, and it can generate client configuration for you.

### Generate an API token

1. Go to **Profile → API Keys**
2. Click **Generate New Token**
3. Copy it immediately and store it securely — it is shown only once

See [API Access & Security](api-security.md) for token abilities, expiry, and revocation.

---
## Choosing a Transport

### Stdio (local)

The client launches the MCP server as a child process on the same machine.

- **Auth:** `TUDUDI_API_TOKEN` environment variable
- **Latency:** lowest
- **Best for:** local development, single-machine Claude Desktop, direct CLI access

### HTTP (remote)

The client talks to your running tududi over HTTP at `/api/mcp` using streamable HTTP in stateless mode.

- **Auth:** Bearer token in the `Authorization` header
- **Requires:** the `mcp-remote` npm package as a bridge
- **Best for:** Docker deployments, cloud-hosted tududi, remote access, team environments

```json
{
    "mcpServers": {
        "tududi": {
            "command": "npx",
            "args": [
                "-y",
                "mcp-remote",
                "https://${TUDUDI_HOST}/api/mcp",
                "--header",
                "Authorization:Bearer ${TUDUDI_API_TOKEN}"
            ],
            "env": {
                "TUDUDI_API_TOKEN": "your-token-here",
                "TUDUDI_HOST": "tududi.yourdomain.tld"
            }
        }
    }
}
```

:::tip Running in Docker? Use HTTP
Stdio mode expects the client to spawn a process next to your tududi install, which does not work across a container boundary. Use HTTP mode for any Docker or remote deployment.
:::

---
## Client Setup

### Claude Desktop (local tududi)

Edit your Claude Desktop config:
- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Linux:** `~/.config/claude/claude_desktop_config.json`

```json
{
    "mcpServers": {
        "tududi": {
            "command": "node",
            "args": ["/path/to/tududi/backend/modules/mcp/server.js"],
            "env": {
                "TUDUDI_API_TOKEN": "your-token-here"
            }
        }
    }
}
```

Restart Claude Desktop — the tududi tools appear in the tool list.

For a remote tududi, use the HTTP configuration above instead.

### Cursor

Create or edit `~/.cursor/mcp.json` with the same structure:

```json
{
    "mcpServers": {
        "tududi": {
            "command": "node",
            "args": ["/path/to/tududi/backend/modules/mcp/server.js"],
            "env": {
                "TUDUDI_API_TOKEN": "your-token-here"
            }
        }
    }
}
```

Restart Cursor and open a new chat.

### VS Code + Continue

Install the [Continue](https://www.continue.dev/) extension, then add to `~/.continue/config.json`:

```json
{
    "mcpServers": [
        {
            "name": "tududi",
            "command": "node",
            "args": ["/path/to/tududi/backend/modules/mcp/server.js"],
            "env": {
                "TUDUDI_API_TOKEN": "your-token-here"
            }
        }
    ]
}
```

Reload the extension.

---
## Available Tools

All 59 tools are scoped to the authenticated user — you can never reach another user's data.

For the full parameter schema of every tool, query the server directly:

```bash
curl -X GET https://tududi.yourdomain.com/api/mcp/tools \
  -H "Authorization: Bearer YOUR_TOKEN"
```

| Category | Tools |
|----------|-------|
| **Tasks** (8) | `list_tasks`, `get_task`, `create_task`, `update_task`, `complete_task`, `delete_task`, `add_subtask`, `get_task_metrics` |
| **Projects** (5) | `list_projects`, `get_project`, `create_project`, `update_project`, `delete_project` |
| **Inbox** (6) | `list_inbox`, `add_to_inbox`, `get_inbox_item`, `update_inbox_item`, `process_inbox_item`, `delete_inbox_item` |
| **Views** (5) | `list_views`, `get_view`, `create_view`, `update_view`, `delete_view` |
| **Goals** (5) | `list_goals`, `get_goal`, `create_goal`, `update_goal`, `delete_goal` |
| **Areas** (5) | `list_areas`, `get_area`, `create_area`, `update_area`, `delete_area` |
| **Notes** (5) | `list_notes`, `get_note`, `create_note`, `update_note`, `delete_note` |
| **Tags** (5) | `list_tags`, `get_tag`, `create_tag`, `update_tag`, `delete_tag` |
| **Habits** (9) | `list_habits`, `get_habit`, `create_habit`, `update_habit`, `delete_habit`, `log_habit_completion`, `get_habit_completions`, `delete_habit_completion`, `get_habit_stats` |
| **People** (5) | `list_people`, `get_person`, `create_person`, `update_person`, `delete_person` |
| **Search** (1) | `search` |

### Example: listing today's tasks

`list_tasks` accepts a `type` filter (`today`, `upcoming`, `completed`, `archived`, `all`), a `status` filter, a `project_id`, and a `limit` (default 50):

```json
{
    "type": "today",
    "limit": 20
}
```

It returns full task objects including project, tags, subtasks, and priority.

---
## Using the HTTP API Directly

**Get the generated client config:**

```bash
curl -X GET https://tududi.yourdomain.com/api/mcp/config \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Call a tool:**

```bash
curl -X POST https://tududi.yourdomain.com/api/mcp \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "tools/call",
    "params": {
      "name": "list_tasks",
      "arguments": { "type": "today", "limit": 10 }
    }
  }'
```

**With the MCP SDK:**

```javascript
import { Client } from '@modelcontextprotocol/sdk/client/index.js';

const client = new Client({ name: 'my-app', version: '1.0.0' });

await client.connect({
    url: 'https://tududi.yourdomain.com/api/mcp',
    headers: {
        Authorization: 'Bearer YOUR_TOKEN',
    },
});

const tools = await client.listTools();

const result = await client.callTool({
    name: 'create_task',
    arguments: {
        name: 'New task from SDK',
        priority: 'high',
    },
});
```

---
## Security

**Authentication.** Every tool call authenticates with an API token scoped to a single user. Tokens can be revoked at any time from **Profile → API Keys**. HTTP mode expects the token as a Bearer credential.

**Opt-in.** MCP stays off until an administrator sets `FF_ENABLE_MCP=true`, and each user must generate their own token.

**Data isolation.** Every query filters by the authenticated user — tasks, projects, and search results alike.

:::warning Treat the token like a password
An MCP token grants full read and write access to that user's tududi data. Store it in your client's env config rather than in a shared file, and revoke it if a machine is lost.
:::

---
## Troubleshooting

### "Invalid or expired API token"

The token expired or was revoked. Generate a new one at **Profile → API Keys** and update your client config.

### "MCP feature is not enabled"

```bash
# In your .env file
FF_ENABLE_MCP=true
```

Restart tududi.

### HTTP connection refused

1. Verify tududi is running and reachable at the configured URL
2. Check firewall rules for remote deployments
3. Verify SSL certificates for HTTPS
4. Check CORS settings if the client runs in a browser

### Tools return empty results

Usually no data matches the filters. Verify the data exists, then start with broad parameters and narrow down.

### Claude does not show the tududi tools

1. Restart Claude Desktop completely
2. Confirm the MCP server shows as "Connected" in settings
3. Ask "what tools do you have available?"

### Docker deployments

Use HTTP mode. Make sure tududi is reachable from outside the container:

```yaml
services:
    tududi:
        ports:
            - '3002:3002'
        environment:
            - FF_ENABLE_MCP=true
            - BACKEND_URL=http://tududi.yourdomain.com:3002
```

---
## Related Documentation

- [API Access & Security](api-security.md) - Generating and managing API tokens
- [API Security](api-security.md) - Rate limits and token security
- [AI Assistant](ai-assistant.md) - tududi's own built-in AI features
- [Configuration](/getting-started/configuration) - Full environment variable reference

**Technical Implementation Files:**

| File | Purpose |
|------|---------|
| `backend/modules/mcp/server.js` | Stdio MCP server entry point |
| `backend/modules/mcp/httpTransport.js` | HTTP transport handler |
| `backend/modules/mcp/toolRegistry.js` | Registers all tool categories |
| `backend/modules/mcp/tools/` | Tool implementations, one file per category |
| `backend/modules/mcp/middleware.js` | API token authentication |
| `backend/modules/mcp/routes.js` | Express route definitions |
| `frontend/components/Profile/tabs/McpTab.tsx` | Config generator UI |
