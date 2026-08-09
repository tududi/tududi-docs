---
sidebar_position: 26
title: Reports & Productivity Insights
description: A GTD-style weekly review report and a heuristic productivity assistant that flags stalled work.
---
# Reports & Productivity Insights

Two pages, both reached from the **Insights** section of the sidebar, help you step back from individual tasks and look at the shape of your work as a whole.

:::note Both are marked beta
Expect rougher edges and occasional changes in what they surface.
:::

---
## Reports

**URL:** `/insights/reports`

A GTD-style weekly review, in two tabs.

**Weekly Review:**
- Your current inbox count
- **Stalled projects** — in-progress projects with no task activity in the last 14 days
- **Waiting for** — projects marked Waiting, oldest first
- **Action debt** — active projects that currently have no open tasks at all, so there's nothing next to do on them

**Trends:**
- A bar chart of tasks completed per week over the last 8 weeks
- An area-by-area balance chart comparing completed (last 30 days) versus currently open tasks

Use this page the way you'd use a GTD weekly review: work through stalled projects and action debt first, since those are the ones quietly going nowhere.

---
## Productivity Assistant

**URL:** `/insights/productivity`

A lighter, always-on heuristic pass over your current tasks and projects, computed directly in your browser from what's already loaded — no separate data pull. It looks for:

- Projects flagged as stalled
- Projects with completed tasks but no open next action
- Tasks whose names read like whole projects rather than a single action ("Plan the launch", "Set up the new server")
- Tasks with vague or unclear names
- Tasks and projects with no recent activity in over 30 days

Each item links straight to the task or project it's about.

:::note This page is not the same as the Today page's suggestions
Despite similar names, this is a separate page from the "next task suggestion" feature on the Today page, and from the AI-powered [Daily Brief and Insights](ai-assistant.md). It runs the same lightweight heuristics regardless of your AI configuration.
:::

---
## Related Documentation

- [AI Assistant](ai-assistant.md) - AI-generated daily briefs and task/project insights, a separate and optional feature
- [Areas](areas.md) - What "area balance" is measuring
- [Today Page](today-page.md) - Day-to-day task metrics

**Technical Implementation Files:**
- GTD report: `/backend/modules/reports/`
- Reports page: `/frontend/components/Insights/ReportsPage.tsx`
- Productivity Assistant: `/frontend/components/Productivity/ProductivityAssistant.tsx`
