---
sidebar_position: 19
title: People
description: Keep a lightweight contact list and assign tasks to family, colleagues, or collaborators.
---
# People

The People section is a lightweight contact list you can assign tasks to — family, colleagues, or anyone else work involves. It is not a full CRM; it exists to answer "who's doing this?" on a task.

**URL:** `/people`

---
## Person Fields

| Field | Notes |
|-------|-------|
| Name | Required, unique per account |
| Relationship | Family, Work, Friend, or Other |
| Email | Optional |
| Phone | Optional |
| Notes | Optional, free text |
| Color | Optional, used as the card and banner background |

---
## Creating and Editing

Click **New Person** on the People page, or the pencil icon on an existing card, to open the person form: name, relationship, email, phone, notes, and a color picker.

---
## A "You" Entry Is Created Automatically

Every account gets a self-entry in People the first time it's needed, linked to your user account and named after you. This is what lets you assign a task to yourself the same way you'd assign it to anyone else. Linked entries show a small account icon; you cannot unlink or edit this link from the interface.

---
## Archiving

Rather than deleting someone outright, you can archive them. Archived people:

- Are hidden from the People list by default
- Are hidden from the assignee picker on tasks
- Still display correctly if a task is already assigned to them

:::caution No filter to view archived people
Once archived, a person disappears from `/people` with no toggle in the interface to bring them back into view. If you need to find or unarchive someone, you'll need their direct link (`/person/:uid`) — check your task assignments or an old bookmark, or use the API (`GET /api/people?archived=true`).
:::

To archive or unarchive, use the ⋮ menu on their card or the button on their detail page.

---
## Assigning Tasks

On any task's detail page, the **Assigned To** card lets you pick a person from a dropdown (archived people are excluded) or leave it unassigned. If a task is shared with you and assigned to someone outside your own People list, that assignee still displays correctly.

The person's detail page lists their currently active assigned tasks, each linking back to the task.

:::note Deleting a person with assigned tasks is blocked
tududi refuses to delete a person who still has tasks assigned to them — including completed ones. Archive or unassign first, or delete the tasks.
:::

There is currently no assignee indicator on task list rows or cards — assignment only shows on the task detail page and the person's detail page.

---
## The Person Detail Page

**URL:** `/person/:uid`

A colored header banner (if a color is set) shows the name, relationship, and badges for a linked account, archived status, and assigned task count. Edit, archive/unarchive, and delete actions are in the top corner. Below that: contact details (clickable email and phone links), notes, and the list of assigned tasks.

---
## API Reference

All endpoints require authentication.

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/people` | List. Query: `archived` (default `false`), `sort`, `relationship_type`, `unlinked` |
| `GET` | `/api/people/:uid` | Get one |
| `POST` | `/api/people` | Create |
| `PATCH` | `/api/people/:uid` | Update, including `archived: true/false` |
| `DELETE` | `/api/people/:uid` | Delete. Fails if tasks are still assigned |

---
## Related Documentation

- [Tasks](tasks.md) - Assigning a task to a person
- [Project Sharing](project-sharing.md) - Sharing work with someone who isn't in your People list yet

**Technical Implementation Files:**
- People module: `/backend/modules/people/`
- Person model: `/backend/models/person.js`
- Self-person creation: `/backend/models/index.js` (`afterCreate` hook)
- People list page: `/frontend/components/People/PeopleList.tsx`
- Person detail: `/frontend/components/People/PersonDetails.tsx`
- Assignee picker: `/frontend/components/Task/TaskDetails/TaskAssignedToCard.tsx`
