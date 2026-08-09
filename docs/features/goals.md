---
sidebar_position: 16
title: Goals
description: Set season- and year-scale outcomes, link projects and tasks to them, and track progress.
---
# Goals

This document explains how goals work in tududi from a user behavior perspective. For technical implementation details, see the backend code in `/backend/modules/goals/` and frontend components in `/frontend/components/Goal/`.

---
## Overview

**Goals** are top-level outcome intentions that answer *why* a group of projects or tasks exists. They are the highest-level planning layer — above areas — with their own list page, detail page, and sidebar navigation.

**Hierarchy position:**
```
Goals (season- or year-scale outcomes)   ← top level
  ├── Projects (specific initiatives)
  │     └── Tasks (actionable items)
  └── Tasks (directly assigned, without a project)

Areas (life domains, organizational containers)  ← parallel, not parent
  └── Projects (can belong to an area AND a goal)
```

**Key characteristics:**
- Top-level standalone entities — accessible from `/goals` and the sidebar
- Not tied to any area; goals are independent of the Areas system
- Projects can link to a goal regardless of which area they belong to
- Have a time horizon: `season` or `year`
- Have a status lifecycle: `active → achieved / paused / dropped`
- Tasks can be assigned directly to a goal (in addition to the project→goal path)

**URL:** `/goals`

---
## Goal Properties

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `title` | string | yes | The outcome statement. Max 255 chars. |
| `why` | text | no | The motivation behind the goal. Displayed in italics. |
| `horizon` | enum | yes | `season` or `year`. Default: `season`. |
| `target_date` | date | no | Optional deadline for the goal. |
| `status` | enum | yes | `active`, `achieved`, `paused`, `dropped`. Default: `active`. |
| `area_id` | integer | no | Stored in the database but not exposed in the UI. Goals are area-independent. |
| `uid` | string | auto | URL-safe unique identifier. |

---
## Goal Lifecycle

### Status transitions

```
active → achieved   (outcome reached)
active → paused     (temporarily on hold)
active → dropped    (abandoned or no longer relevant)
paused → active     (resuming)
```

There is no enforced ordering — any status can transition to any other.

### Creating a goal

Goals can be created from multiple entry points:

1. **Goals list page** (`/goals`) — header button opens the goal modal
2. **Sidebar** — click the **+** icon next to the Goals section heading
3. **Area detail page** — click **Add goal** next to the Goals heading

The goal modal has these fields:
- Title (required)
- Why (optional)
- Horizon (`season` / `year`)
- Status (defaults to `active`)
- Target date (optional)
- Area (optional — pick from the dropdown or leave blank)

### Editing a goal

Click the pencil (edit) icon on any goal card on the Goals list page, or the edit button in the goal detail page header. The goal modal opens pre-filled. Save to update.

From the area detail page, click the pencil icon on a goal row — the same modal opens.

### Deleting a goal

Click the trash icon (Goals list page, goal detail page, or area detail page). A confirmation dialog warns that linked projects will become unlinked. The goal record is deleted; projects that referenced it have their goal cleared.

---
## Scarcity Rule

The area detail page displays a warning banner when an area has **more than 5 active goals**. This is a soft nudge to keep you focused, not an enforced limit.

---
## Goals List Page

A grid view of all your goals across all areas.

**Layout:** Responsive grid (1 / 2 / 3 / 4 columns depending on screen size)

**Each goal card shows:**
- Title
- Why text (truncated)
- Status badge (color-coded)
- Horizon badge
- Area name (if set)
- Project count and task count in a footer stats bar
- Three-dot menu (on hover) with Edit and Delete

Clicking a card navigates to the goal detail page.

---
## Goal Detail Page

**URL format:** `/goal/{uid}-{title-slug}` — for example `/goal/abc123-launch-new-product`

**Header banner:**
- Goal title
- Why text (italic, below the title)
- Status badge and horizon badge
- Target date (if set)
- Area name as a link to the area (if set)
- Task and project counts
- Edit (pencil) and Delete (trash) buttons

**Two-column layout:**

```
┌─────────────────────┐  ┌─────────────────────────────┐
│  Projects (1/3)     │  │  Tasks (2/3)                │
│                     │  │                             │
│  [project card]     │  │  [active tasks list]        │
│  [project card]     │  │                             │
│                     │  │  Completed (n)              │
│                     │  │  [completed tasks list]     │
└─────────────────────┘  └─────────────────────────────┘
```

**Projects section:**
- Lists projects linked to this goal
- Each project shows name, status, and a left-colored border
- Click navigates to the project detail page

**Tasks section:**
- Lists tasks assigned directly to this goal (not via a project)
- Active tasks shown first, completed tasks below in a "Completed (n)" subsection
- Task rows show name, due date, and a check icon

---
## Sidebar Integration

The Goals section appears in the left sidebar between Areas and Notes.

- **Click the section label** → navigates to `/goals`
- **Click the `+` icon** (hover to reveal) → opens the goal modal to create a new goal
- **Click the chevron** → expands/collapses an inline list of active goals
- **Each goal row** in the expanded list → navigates to that goal's detail page

Only **active** goals appear in the expandable list.

---
## Projects and Goals

Each project in an area can be in one of three states relative to goals:

| State | Meaning |
|-------|---------|
| Linked to goal | Project is working toward a specific goal |
| Maintenance | Project keeps something running — not goal-directed |
| Unlinked | Project not yet assigned to a goal or marked as maintenance |

### Linking a project to a goal

**From the area detail page**, unlinked projects show a **link…** button. Clicking it opens an inline picker to select a goal or mark the project as maintenance.

**From the project modal** (when editing a project):
1. Expand the **Goal** section (flag icon in the toolbar)
2. An area must already be selected — goals are fetched for that area
3. Choose from: No goal / Maintenance / active goals / inactive goals

### Unlinking

Deleting a goal unlinks all of its projects. To unlink manually, open the project modal → Goal section → select **No goal**.

---
## Tasks and Goals

Tasks can be assigned directly to a goal, independent of any project.

### Assigning a task to a goal

On the **task detail page** (`/task/:uid`), the right sidebar contains a **Goal** card below the Area card. Click it to open a searchable dropdown of all goals, then select one to save.

To remove the goal, click the X button on the selected goal, or click the card and choose a different goal.

### What this means

- A task can carry its own goal that is separate from its project's goal.
- The goal detail page lists tasks that are directly assigned to the goal via this field.
- Tasks do **not** inherit a goal from their project — the two are independent fields.

---
## Area Detail Page — Goals Section

The area detail page (`/area/:uid-slug`) has a goals column showing all goals belonging to that area.

**Buckets in the goals column:**
1. **Active goals** — each with its linked project cards underneath
2. **Maintenance** — projects flagged as maintenance
3. **Unlinked** — projects with no goal and no maintenance flag
4. **Inactive goals** — collapsed into an expandable section

For the full area detail page layout, see [Areas](areas.md).

---
## API Reference

All endpoints require authentication. Responses are scoped to the current user.

### List goals

```
GET /api/goals
GET /api/goals?area_uid=:uid
GET /api/goals?area_id=:id
```

Returns `{ goals: Goal[] }`. Pass `area_uid` or `area_id` to filter to a single area.

### Get goal (with related tasks and projects)

```
GET /api/goals/:uid
```

Returns `{ goal: Goal }`. The `goal` object includes `Tasks` and `Projects` arrays.

### Create goal

```
POST /api/goals
Body: { title, area_id?, why?, horizon?, target_date?, status? }
```

Returns `{ goal: Goal, active_goals_count: number }`.

**Validation:**
- `title` required, non-empty
- `area_id` is optional (nullable)

### Update goal

```
PATCH /api/goals/:uid
Body: { title?, area_id?, why?, horizon?, target_date?, status? }
```

Returns `{ goal: Goal, active_goals_count: number }`.

### Delete goal

```
DELETE /api/goals/:uid
```

Returns 204. Projects and tasks referencing this goal become unlinked.

---
## MCP Tools

Goals are accessible via the MCP integration using five tools:

| Tool | Description |
|------|-------------|
| `list_goals` | List goals, optionally filtered by area or status |
| `get_goal` | Get a single goal by UID (includes linked tasks and projects) |
| `create_goal` | Create a new goal (`title` required; area is optional) |
| `update_goal` | Update title, why, horizon, target date, area, or status |
| `delete_goal` | Delete a goal (linked projects and tasks become unlinked) |

See [MCP Integration](mcp-integration.md) for full parameter details.

---
## Related Documentation

- [Areas](areas.md) - Goals can optionally belong to areas; the area detail page shows goals for that area
- [Projects](projects.md) - Projects can link to a goal or be flagged as maintenance
- [Tasks](tasks.md) - Tasks carry their own goal for direct assignment
- [MCP Integration](mcp-integration.md) - AI tool access to goals via Model Context Protocol
- [Database & Migrations](/development/database) - Data model details

**Technical Implementation Files:**
- Goal model: `/backend/models/goal.js`
- Goals module: `/backend/modules/goals/` (routes, controller, service, repository)
- MCP tools: `/backend/modules/mcp/tools/goalTools.js`
- Goals list page: `/frontend/components/Goals.tsx`
- Goal detail page: `/frontend/components/Goal/GoalDetails.tsx`
- Goal modal: `/frontend/components/Goal/GoalModal.tsx`
- Sidebar section: `/frontend/components/Sidebar/SidebarGoals.tsx`
- Task goal card: `/frontend/components/Task/TaskDetails/TaskGoalCard.tsx`
- Goals API client: `/frontend/utils/goalsService.ts`
