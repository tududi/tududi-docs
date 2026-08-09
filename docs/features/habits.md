---
sidebar_position: 14
title: Habits
description: Track recurring behaviours with streaks, a 90-day history calendar, and daily, weekly, or monthly periods.
---
# Habits

Habits track recurring behaviours you want to sustain — exercise, reading, journalling — and reward consistency with streaks. Unlike a [recurring task](recurring-tasks.md), a habit is not something you finish; it is something you keep doing.

**URL:** `/habits`

---
## Creating a Habit

Click **New Habit** on the Habits page (or use the sidebar). The habit detail page opens in creation mode with four fields:

| Field | Default | Meaning |
|-------|---------|---------|
| **Name** | — | Required |
| **Target frequency** | 1× per Day | A count plus a period: Day, Week, or Month |
| **Scheduling** | Flexible | Flexible (anytime) or Strict |
| **Streak calculation** | Calendar days | Calendar days or Scheduled periods |

Click **Save** to create it. On an existing habit each field edits inline — press Enter or click away to save, Escape to cancel. Every edit saves immediately.

---
## How Periods Work

The **period** — day, week, or month — is the single most important setting, because it defines what counts as one tick.

| Period | Starts | Ends |
|--------|--------|------|
| Daily | Local midnight | End of that day |
| Weekly | **Monday** | Sunday 23:59 |
| Monthly | 1st of the month | Last day of the month |

Two consequences follow from this:

**One completion per period.** Marking a habit complete a second time within the same period does nothing — the existing completion is returned unchanged. A weekly habit can be ticked once between Monday and Sunday, no matter how many times you press the button.

**Streaks count consecutive periods, not days.** A weekly habit completed every week has a streak that grows by one per week. Your streak survives as long as each successive period contains at least one completion.

:::caution The target count is a label, not a rule
Because only one completion per period is recorded, a habit set to "3× per week" cannot actually be ticked three times. The count is used for the display label and for an internal completion-rate figure — it does not gate streaks, and nothing requires you to hit it. Treat it as a note to yourself about your intent.
:::

### Scheduling and streak calculation

Both of these settings appear in the interface, but in the current release **neither changes the numbers you see**:

- **Streak calculation** (Calendar days vs Scheduled periods) — both options run the same period-based calculation, so your streak is identical either way.
- **Scheduling** (Flexible vs Strict) — this is not consulted by completion logging, streaks, the habits list, the detail page, or the Today page.

They are safe to leave at their defaults. They are documented here so the fields are not mistaken for something that is silently affecting your data.

---
## Logging Completions

**From the Habits page** — click the circle on a habit card. The card turns green once the habit is complete for the current period.

**From the Today page** — habits appear in two dashed blocks, "Habits planned for today" and "Habits completed today", each with a Complete or **Undo** action on hover.

**From the habit detail page** — the **Last 90 Days** calendar shows three months of history. Click any past or current day to toggle it: an empty day records a completion at noon that day, and a completed day removes it. Future days are disabled.

### Undoing

Deleting a completion recomputes everything from scratch — total completions, last completion, current streak, and best streak. Your best streak can therefore go *down* when you remove a completion, which is intentional: it reflects the corrected history.

:::note Backfilling a past day
Ticking a day in the past sets your streak to what it was *on that date*, and moves the "last completion" marker back to that date. If you are filling in history, work oldest to newest, and finish with today so the current streak reflects the present.
:::

---
## The Habits Page

**Overview cards** across the top:
- **Total Habits**
- **Active Streaks** — how many habits have a streak above zero, with the combined day count
- **Best Streak** — the highest best-streak across all habits
- **Total Completions** — all time

**Habit cards** below show the name, the frequency label, a 30-day dot strip of recent history, and footer stats for current streak, best streak, and total completions. Click a card to open the habit.

Empty state: *"No habits yet. Create your first habit to get started!"*

---
## The Habit Detail Page

**URL:** `/habit/:uid`

- **Header** — flame icon, click-to-edit title, and Complete and Delete buttons
- **Details panel** — the four settings, each inline-editable
- **Three stat cards** — Current Streak, Best Streak, and Total Completions, each with a 14-day mini chart
- **Last 90 Days** — three monthly calendars, oldest to newest, clickable to toggle any day. The legend marks Completed, Not completed, and Today

---
## Habits on the Today Page

Habits are listed separately from tasks: those still open appear under "Habits planned for today" inside the Planned section, and those ticked appear under "Habits completed today".

:::note Weekly and monthly habits still show up daily
The Today page treats a habit as outstanding based on the calendar day, not its period. A weekly habit completed on Monday will still appear under "planned for today" on Tuesday. Ticking it again has no effect — the completion is already recorded for that week — so you can safely ignore it until the next week begins.
:::

---
## Enabling and Disabling

Habits are controlled by the **Habits** toggle in **Profile → Features & Add-ons**, which is **on by default**. Turning it off hides the Habits entry in the sidebar. The `/habits` URL and the Today page blocks remain reachable. See [Feature Toggles](feature-toggles.md).

---
## Interaction with Tasks

A habit is stored as a special kind of task, which produces a few visible effects:

- Habit items in task lists show a habit badge and no completion checkbox — clicking one opens the habit page rather than a task modal
- Marking a habit complete sets its underlying task to Done, so habits appear in the **Done** column of the [Kanban board](boards.md). Undoing a completion does not move it back
- Habits are excluded from regular task lists on the Today page and from completed-task productivity metrics, which count habit completions separately

---
## API Reference

All endpoints require authentication.

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/habits` | All habits, newest first, excluding archived |
| `POST` | `/api/habits` | Create a habit |
| `PUT` | `/api/habits/:uid` | Update a habit |
| `DELETE` | `/api/habits/:uid` | Delete a habit |
| `POST` | `/api/habits/:uid/complete` | Log a completion. Body: `{ completed_at? }` |
| `GET` | `/api/habits/:uid/completions` | Completions in a window. Query: `start_date`, `end_date` (default: last 30 days) |
| `DELETE` | `/api/habits/:uid/completions/:completionId` | Remove a completion and recompute streaks |
| `GET` | `/api/habits/:uid/stats` | Stats for a window (default: last 30 days) |

`GET /api/habits/:uid/stats` returns:

```json
{
  "totalCompletions": 12,
  "currentStreak": 4,
  "bestStreak": 9,
  "completionRate": 80,
  "completions": [{ "id": 1, "completed_at": "..." }]
}
```

`totalCompletions` is scoped to the requested window; `currentStreak` and `bestStreak` are the habit's stored all-time values. `completionRate` is `null` unless both a target count and a period are set.

Habits are also available through [MCP](mcp-integration.md) via nine tools including `log_habit_completion` and `get_habit_stats`.

---
## Related Documentation

- [Recurring Tasks](recurring-tasks.md) - For repeating work you finish, rather than behaviours you sustain
- [Today Page](today-page.md) - Where habits appear in your daily view
- [Feature Toggles](feature-toggles.md) - Turning habits on and off
- [Boards](boards.md) - Why completed habits appear in the Kanban Done column

**Technical Implementation Files:**
- Habits module: `/backend/modules/habits/` (routes, controller, service, repository, habitService)
- Habit fields: `/backend/models/task.js`
- Completions: `/backend/models/recurringCompletion.js`
- Habits page: `/frontend/components/Habits/Habits.tsx`
- Habit detail: `/frontend/components/Habits/HabitDetails.tsx`
- Habit card: `/frontend/components/Habits/HabitCard.tsx`
- Period helpers: `/frontend/utils/habitUtils.ts`
