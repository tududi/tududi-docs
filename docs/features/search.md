---
sidebar_position: 17
title: Universal Search
description: Search across tasks, projects, areas, notes, and tags, then save the filter as a reusable view.
---
# Universal Search

The search box in the top bar searches across your entire account at once — tasks, projects, areas, notes, and tags — with filters you can layer on and save for later.

---
## Searching

Click the search field in the top bar to open the results dropdown. Type to search by name and content; results are grouped by type (Tasks, Projects, Areas, Notes, Tags) and update as you type.

Clicking a result takes you straight to it — a task opens its detail page, a project opens its detail page, an area opens the projects list filtered to that area, and so on.

---
## Filters

Narrow results with filter chips for:

- **Type** — Task, Project, Area, Note (Tags are always included and have no chip of their own)
- **Priority** — Low, Medium, High
- **Due** — today, tomorrow, next week, next month
- **Defer** — same date ranges, applied to defer-until (tasks only)
- **Tags** — pick from your existing tags
- **Extras** — task-specific flags: overdue, has notes, deferred, has tags, assigned to a project, and recurring

Filters combine — for example, Priority: High + Due: today + Tags: work.

---
## Saving a Search as a View

Once you've built a filter you like, click **Save as Smart View**, give it a name, and it becomes a permanent entry under [Views](views.md) — reopen it anytime without re-entering the filters. tududi shows a confirmation with a direct link to the new view.

---
## API Reference

```
GET /api/search?q=...&filters=Task,Project&priority=high&due=today&tags=work&extras=overdue
```

Returns:

```json
{
  "results": [
    { "type": "Task", "id": 1, "uid": "...", "name": "...", "priority": 2 },
    { "type": "Project", "id": 2, "uid": "...", "name": "..." }
  ]
}
```

Add `limit` and `offset` to paginate; the response then includes a `pagination` object with `total`, `hasMore`, and the current window.

---
## Related Documentation

- [Views](views.md) - Reopening a saved search
- [Tags](tags.md) - How tags work as a filter

**Technical Implementation Files:**
- Search module: `/backend/modules/search/`
- Search UI: `/frontend/components/UniversalSearch/`
