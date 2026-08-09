---
sidebar_position: 20
title: Project Templates
description: Turn a project into a reusable template, clone it into new projects, and browse the community marketplace.
---
# Project Templates

Templates let you capture the shape of a project — its tasks and subtasks — and reuse it. Save a real project as a template once, then spin up new projects from it whenever the same kind of work comes up again.

**URL:** `/templates`

---
## Enabling Templates

Templates are on by default at the server level (`PROJECT_TEMPLATES_ENABLED`, defaults to `true`) and shown by default in the interface. If your administrator has turned the server-side flag off, every template action returns a "feature not enabled" error even if the sidebar link is still visible — see [Configuration](/getting-started/configuration#project-templates).

---
## Saving a Project as a Template

From a project's card menu or its detail page, choose **Save as Template**. tududi creates a new template containing:

- Task names, notes, priorities, and due dates
- Parent/subtask structure (one level)
- Tags on both the project and its tasks

**What is not carried over:** task status (everything resets to Not Started), recurrence rules (stripped entirely), defer dates, attachments, and the project's own area, goal, priority, and due date.

You can also start a template from scratch with **New Template**, which creates an empty template you fill in directly.

### Categories

Templates have a free-text **category** (e.g. "Sales", "Engineering", "Onboarding") used only for grouping and color-coding on the template cards — there's no fixed list to choose from.

---
## Using a Template

Click **Use Template** on any template card to open the clone dialog:

- **Name** for the new project (defaults to "*Template Name* (Copy)")
- **Area** to file it under, optionally
- **Start Date** — if set, every task's due date shifts by the same offset as the gap between the template's earliest due date and this new start date, preserving the relative spacing between tasks
- **Reset all tasks to Not Started** — checked by default

The new project is a normal project, not a template — it's independent from then on. tududi keeps a quiet link back to the source template and increments its use count, shown on the template card.

---
## Marketplace

If your administrator has configured `MARKETPLACE_URL`, a **Marketplace** tab lets you browse and install templates shared by the community — filterable by category, with a preview before installing. **Install** works exactly like using one of your own templates: it clones the marketplace template's task structure into a new local template you can then use.

Some marketplace templates may be marked paid; installing those requires an active subscription tied to the marketplace account, and tududi surfaces an access-denied error if you're not entitled to it. Without `MARKETPLACE_URL` configured, the tab shows no templates rather than an error.

---
## Limits

Each account can hold up to **50 templates** by default (`MAX_TEMPLATES_PER_USER`), whether created locally or installed from the marketplace. Cloning a template into a new project does not count against this limit — only the templates themselves do.

---
## API Reference

All endpoints require authentication.

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/templates` | List your templates |
| `GET` | `/api/template/:uid` | Get one, with full task structure |
| `POST` | `/api/template` | Create a blank template |
| `PATCH` | `/api/template/:uid` | Update name, description, category, or tags |
| `DELETE` | `/api/template/:uid` | Delete a template. Projects already cloned from it are unaffected |
| `POST` | `/api/project/:uid/save-as-template` | Create a template from an existing project |
| `POST` | `/api/template/:uid/clone` | Create a new project from a template |
| `GET` | `/api/marketplace/templates` | Browse the configured marketplace |
| `GET` | `/api/marketplace/templates/:uid` | Marketplace template detail |
| `POST` | `/api/marketplace/templates/:uid/install` | Install a marketplace template as a local template |

---
## Related Documentation

- [Projects](projects.md) - What gets templated
- [Configuration](/getting-started/configuration#project-templates) - `PROJECT_TEMPLATES_ENABLED`, `MAX_TEMPLATES_PER_USER`, marketplace settings

**Technical Implementation Files:**
- Templates module: `/backend/modules/templates/`
- Templates page: `/frontend/components/Templates/Templates.tsx`
- Clone dialog: `/frontend/components/Templates/TemplateCloneModal.tsx`
- Marketplace UI: `/frontend/components/Templates/MarketplaceTemplates.tsx`
