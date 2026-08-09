---
sidebar_position: 21
title: AI Assistant
description: Optional AI-powered daily briefs, task insights, and project insights backed by any OpenAI-compatible provider.
---
# AI Assistant

The AI Assistant adds three context-aware intelligence features to tududi. It is **optional and off by default** — nothing is sent anywhere unless you configure an API key yourself.

1. **Daily Brief** — a morning summary with a focus task, top priority actions, and risk flags
2. **Task Insights** — analysis, next steps, and useful links for a specific task
3. **Project Insights** — health assessment, next action, and risk flags for a specific project

All three call an OpenAI-compatible API and cache results in the database. Results persist until you explicitly regenerate them.

:::info Your data leaves your server
Unlike the rest of tududi, these features send task and project context to whichever LLM provider you configure. If that matters to you, point `LLM_BASE_URL` at a local model (Ollama, LM Studio) so nothing leaves your network — see [Custom provider or model](#optional-custom-provider-or-model).
:::

---
## Setup

### Required

Set an API key before starting the server. Use the generic `LLM_API_KEY` for any provider, or `OPENAI_API_KEY` if you are using OpenAI directly. Both are supported; `LLM_API_KEY` takes precedence.

```bash
# Generic: works with any provider
LLM_API_KEY=sk-...

# OpenAI legacy name: still works as a fallback
OPENAI_API_KEY=sk-...
```

Without a key, the generation endpoints return HTTP `503` with:

```json
{ "error": "AI assistant is not configured...", "code": "AI_NOT_CONFIGURED" }
```

The interface handles this gracefully — it skips auto-generation and shows a calm "AI is not configured" state rather than an error.

### Optional: custom provider or model

The service uses the OpenAI Node.js SDK, which is compatible with any provider implementing the OpenAI chat completions API (Ollama, LM Studio, Groq, Azure OpenAI, and others).

```bash
# Base URL of the provider (defaults to OpenAI)
LLM_BASE_URL=http://localhost:11434/v1  # e.g. local Ollama
# OPENAI_BASE_URL is still accepted as a fallback

# Model name the provider expects (defaults to gpt-4o-mini)
LLM_MODEL=llama3.2
# TUDUDI_AI_MODEL is still accepted as a fallback
```

:::note Reasoning models
Reasoning models (e.g. DeepSeek-R1, o1-mini) consume hidden tokens before producing output. The daily brief allows up to 1500 completion tokens to accommodate this; task and project insights allow 1000 and 600 respectively.
:::

### Enabling it in the interface

Once the server has a key, turn the assistant on per user in **Profile → Features & Add-ons**. See [Feature Toggles](feature-toggles.md).

---
## Configuration Reference

| Setting | Primary variable | Fallback variable | Default |
|---------|-----------------|-------------------|---------|
| API key | `LLM_API_KEY` | `OPENAI_API_KEY` | (required) |
| Base URL | `LLM_BASE_URL` | `OPENAI_BASE_URL` | OpenAI (`https://api.openai.com/v1`) |
| Model | `LLM_MODEL` | `TUDUDI_AI_MODEL` | `gpt-4o-mini` |

All three LLM calls request `response_format: { type: 'json_object' }` for structured output. If your provider does not support that parameter, the response parser still attempts to extract JSON from raw text, including code-fenced output.

---
## Daily Brief

Appears on the Today page. Generates once and caches the result for that day.

**What it returns:**

```json
{
  "focus": "Short phrase naming the single most important task today",
  "priority_actions": [
    {
      "action": "Exact task name",
      "project": "Project name or null",
      "reason": "Why this matters now (≤6 words)",
      "suggestion": "Specific motivating next step (≤12 words)"
    }
  ],
  "watch_out": ["At-risk task or project name"],
  "generated_at": "ISO timestamp",
  "model": "model name echoed from API response",
  "usage": { "prompt_tokens": 0, "completion_tokens": 0 }
}
```

**Context sent to the model:** active goals, active projects, today's task breakdown (overdue, in-progress, planned, suggested), weekly completion trend, and your "About You" profile text if set.

**Caching:** one brief per user per day. Fetching returns the cache; regenerating replaces it.

---
## Task Insights

Appears in the task detail panel. Generated on demand and cached per task.

**What it returns:**

```json
{
  "insight": "Domain-level explanation of what the task involves",
  "next_step": "Concrete first action with a real example",
  "breakdown": ["Step 1", "Step 2", "Step 3"],
  "links": [{ "label": "Display name", "url": "https://..." }],
  "watch_out": "Specific risk or dependency, or null",
  "generated_at": "ISO timestamp",
  "dismissed": false
}
```

**Context sent to the model:** task name, status, priority, due date, tags, subtask count, notes (truncated to 300 chars), project name, project status, area, goal, and project description (truncated to 200 chars).

**Dismissing:** hides the panel without deleting the cached data.

---
## Project Insights

Appears in the project detail panel. Generated on demand and cached per project.

**What it returns:**

```json
{
  "insight": "Domain-level explanation of what the project is about",
  "next_action": "Most concrete next step to advance the project",
  "health": "Honest assessment referencing actual task numbers",
  "watch_out": "Specific risk or null",
  "generated_at": "ISO timestamp",
  "dismissed": false
}
```

**Context sent to the model:** project name, status, priority, due date, area, goal, description (truncated to 300 chars), total/open/completed/in-progress task counts, and overdue task count.

---
## About You Profile

Set an "About You" text in **Profile → Features & Add-ons → Intelligence → About You**. This is injected into the daily brief prompt, letting the AI tailor its language to your actual domain (academic research, healthcare, design) rather than defaulting to software-development metaphors.

The field holds up to 500 characters.

---
## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/ai-assistant/config` | Report whether an API key is configured |
| `GET` | `/api/ai-assistant/daily-brief` | Return cached daily brief (or null) |
| `POST` | `/api/ai-assistant/daily-brief` | Generate and cache a new daily brief |
| `GET` | `/api/ai-assistant/task-insights/:taskUid` | Return cached task insights (or null) |
| `POST` | `/api/ai-assistant/task-insights` | Generate task insights |
| `PATCH` | `/api/ai-assistant/task-insights/:taskUid/dismissed` | Set the dismissed flag |
| `GET` | `/api/ai-assistant/project-insights/:projectUid` | Return cached project insights (or null) |
| `POST` | `/api/ai-assistant/project-insights` | Generate project insights |
| `PATCH` | `/api/ai-assistant/project-insights/:projectUid/dismissed` | Set the dismissed flag |

All endpoints require authentication. Unauthenticated requests return `401`.

---
## Caching

| Feature | Cache key |
|---------|-----------|
| Daily Brief | User, one brief per day |
| Task Insights | Task UID |
| Project Insights | Project UID |

Cached values are JSON objects including a `generated_at` timestamp. Nothing regenerates automatically beyond the once-per-day daily brief.

---
## Troubleshooting

**"AI is not configured" despite setting a key**
The key is read at server start. Restart tududi after changing environment variables.

**503 responses from generation endpoints**
No API key is set, or the key is empty. Check `GET /api/ai-assistant/config` — it reports `api_key_set`.

**Empty or malformed insights**
Your provider may not support `response_format: json_object`. The parser falls back to extracting JSON from raw text, but weaker models may still return unusable output. Try a more capable model.

**Reasoning models return nothing**
They may exhaust the completion token budget on hidden reasoning tokens. Use a non-reasoning model for insights.

---
## Related Documentation

- [Feature Toggles](feature-toggles.md) - Enabling the assistant per user
- [Today Page](today-page.md) - Where the daily brief appears
- [Configuration](/getting-started/configuration) - Full environment variable reference
- [Reports & Insights](reports.md) - Non-AI productivity metrics

**Technical Implementation Files:**
- AI module: `/backend/modules/ai-assistant/` (routes, controller, service)
- Daily brief widget: `/frontend/components/AI/DailyAssistant.tsx`
- Task insights panel: `/frontend/components/AI/TaskAIInsights.tsx`
- Project insights panel: `/frontend/components/AI/ProjectAIInsights.tsx`
- API client: `/frontend/utils/aiAssistantService.ts`
