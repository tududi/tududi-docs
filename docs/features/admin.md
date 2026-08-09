---
sidebar_position: 13
title: Admin
description: Manage users, roles, and public registration for a multi-user tududi instance.
---
# Admin

Administrators can manage every account on the instance, control roles, and decide whether new people can self-register.

**URL:** `/admin/users` — visible in the sidebar, and reachable, only to admins.

---
## Becoming an Admin

**The first person to register on a fresh instance automatically becomes an admin.** After that, only an existing admin can promote anyone else — there's no self-service path to admin beyond the very first account.

---
## Managing Users

The admin page lists every user with their name, email, creation date, and role.

- **Add User** — create an account directly with an email, password, optional name, and role. This bypasses registration entirely, which is useful when public registration is turned off
- **Edit** — change a user's email, reset their password, update their name, or change their role between admin and user
- **Delete** — permanently removes the account and **everything tied to it**: tasks, projects, areas, notes, tags, inbox items, views, notifications, API tokens, and sharing permissions. This cannot be undone

:::warning No safety net when changing roles
Deleting your own account, or deleting the last remaining admin, is blocked by the server. **Changing roles is not equally protected** — nothing stops an admin from demoting themselves, or demoting the only other admin, and there's no confirmation step or way to undo it. Think before you change a role, especially on a small instance.
:::

---
## Public Registration

A single instance-wide switch controls whether the `/register` page accepts new signups. Turning it off doesn't affect existing accounts — it only closes the door to new self-service registrations. Use **Add User** above to create accounts manually while registration is closed.

---
## API Reference

All endpoints require an admin account.

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/admin/users` | List all users |
| `POST` | `/api/admin/users` | Create a user |
| `PUT` | `/api/admin/users/:id` | Update a user, including role |
| `DELETE` | `/api/admin/users/:id` | Delete a user and all their data |
| `POST` | `/api/admin/toggle-registration` | Enable or disable public registration |

---
## Related Documentation

- [User Management](user-management.md) - Roles, profiles, and registration from the end-user side
- [Project Sharing](project-sharing.md) - Sharing between users without full admin access

**Technical Implementation Files:**
- Admin module: `/backend/modules/admin/`
- First-admin bootstrap: `/backend/models/user.js` (`afterCreate` hook)
- Admin page: `/frontend/components/Admin/AdminUsersPage.tsx`
