---
sidebar_position: 15
title: Boards
description: Prioritize with the Eisenhower Matrix or track progress on a Kanban board.
---
# Boards

tududi offers two alternative views of your tasks: the **Eisenhower Matrix** for prioritizing by urgency and importance, and a **Kanban board** for tracking progress across statuses. Both live under a **Boards** section in the sidebar, which appears once at least one is enabled.

---
## Enabling Boards

Both are **off by default**, toggled independently in **Profile → Features & Add-ons**:

- **Eisenhower Matrix**
- **Kanban Board**

See [Feature Toggles](feature-toggles.md). Turning a toggle off only hides its sidebar entry — the page itself stays reachable at its URL if you have the link.

---
## Eisenhower Matrix

**URL:** `/boards/eisenhower`

A four-quadrant grid for deciding what to act on now versus what to schedule, delegate, or drop.

### How quadrants are determined

| Axis | Rule |
|------|------|
| **Important** | Priority is Medium or High |
| **Urgent** | The task carries a tag literally named **`urgent`** |

Due dates are **not** part of this calculation — only priority and the `urgent` tag decide placement. The page reminds you of this: *"Tag tasks with 'urgent' to mark them as urgent."*

| | Urgent | Not Urgent |
|---|---|---|
| **Important** | 🔴 Do Now | 🔵 Schedule |
| **Not Important** | 🟡 Delegate | ⚪ Eliminate |

Only active tasks appear — completed, archived, and cancelled tasks are excluded, as are subtasks and recurring instances (you work with parent tasks here).

### Moving tasks between quadrants

Drag a card to a different quadrant to change its priority and tags in one motion:

- Dropping into an **Important** row raises priority to at least Medium (a High-priority task stays High)
- Dropping into a **Not Important** row sets priority to Low, even if it was High
- Dropping into an **Urgent** column adds the `urgent` tag
- Dropping into a **Not Urgent** column removes the `urgent` tag

Each quadrant can be collapsed by clicking its header, and shows a running count of tasks. Cards behave like normal task rows — you can complete, edit, or delete them in place.

---
## Kanban Board

**URL:** `/boards/kanban`

A column board where each column is a task **status** — moving a card between columns changes the task's status directly.

| Column | Status |
|--------|--------|
| To Do | Not started |
| Planned | Planned |
| In Progress | In progress |
| Waiting | Waiting |
| Cancelled | Cancelled |
| Done | Done |
| Archived | Archived |

### Choosing visible columns

Not all seven columns show by default. Use the gear menu to choose which ones appear; the default set is **To Do, In Progress, Waiting, Done**. This choice is remembered on your device (not synced across devices or accounts). Column order is fixed and cannot be rearranged.

### What's excluded

Any task tagged **`someday`**, or belonging to a project tagged `someday`, is hidden from the board entirely — this is the board's way of keeping speculative or backlog work out of your active view. Subtasks and recurring instances are excluded, same as the Eisenhower Matrix.

### Dragging cards

Dropping a card into a different column sets the task's status to match that column. Nothing else about the task changes. Cards within a column are not manually reorderable — position reflects the order tasks were returned in, not a saved rank.

---
## Related Documentation

- [Feature Toggles](feature-toggles.md) - Turning boards on and off
- [Tasks](tasks.md) - Priority, status, and tags
- [Tags](tags.md) - How the `urgent` and `someday` tags work

**Technical Implementation Files:**
- Eisenhower Matrix: `/frontend/components/Eisenhower/EisenhowerMatrix.tsx`
- Kanban board: `/frontend/components/Kanban/KanbanBoard.tsx`
- Sidebar section: `/frontend/components/Sidebar/SidebarBoards.tsx`
