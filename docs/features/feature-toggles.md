---
sidebar_position: 12
title: Feature Toggles
description: Turn optional sections of tududi on or off per account from Profile → Features & Add-ons.
---
# Feature Toggles

Several parts of tududi are optional and hidden until you turn them on. **Profile → Features & Add-ons** is where you do that — every toggle here is personal to your account, not instance-wide.

---
## Add-ons

| Toggle | Default | Turns on |
|--------|---------|----------|
| **Habits** | On | The Habits section in the sidebar |
| **Eisenhower Matrix** | Off | The Eisenhower board under Boards |
| **Kanban Board** | Off | The Kanban board under Boards |
| **Calendar** | Off | The Calendar section |
| **Templates** | On | The Templates section |
| **Pomodoro Timer** | On | The Pomodoro widget in the top bar |

:::note What these toggles actually control
Each one shows or hides its section's entry in the sidebar (or, for Pomodoro, the top-bar widget). None of them restrict the underlying page or its data — if you know the direct URL (`/habits`, `/boards/kanban`, `/calendar`, `/templates`), it opens regardless of the toggle. Treat these as decluttering your navigation, not as an access control or privacy setting.
:::

See [Habits](habits.md), [Boards](boards.md), [Calendar](calendar.md), and [Templates](templates.md) for what each section does.

---
## Intelligence

A second group of toggles governs smaller, in-context assistive features:

| Toggle | Default | Effect |
|--------|---------|--------|
| **Task Intelligence Assistant** | On | Shows inline guidance while typing a new task name — for example, a nudge if the name is too short to be a clear action |
| **Next Action Prompts** | Off | When you open a project, offers to help you set its first next action if it doesn't have one |
| **Next Task Suggestions** | On | Enables the "what should I work on next" suggestion on the Today page |
| **Productivity Insights** | On | Reserved for a future connection to the [Productivity Assistant](reports.md#productivity-assistant) page. In the current release this toggle has no visible effect — the Productivity Assistant page always runs its heuristics regardless of this setting |

An **About You** field for the AI Assistant lives on its own tab rather than here — see [AI Assistant](ai-assistant.md#about-you-profile).

---
## Related Documentation

- [Habits](habits.md), [Boards](boards.md), [Calendar](calendar.md), [Templates](templates.md) - What each add-on does
- [AI Assistant](ai-assistant.md) - A separate, server-configured feature with its own on/off switch
- [Reports & Productivity Insights](reports.md) - The Productivity Assistant page

**Technical Implementation Files:**
- Settings UI: `/frontend/components/Profile/tabs/FeaturesTab.tsx`
- Defaults: `/backend/models/user.js` (`features` column)
