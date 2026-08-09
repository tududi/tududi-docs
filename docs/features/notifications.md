---
sidebar_position: 18
title: Notifications
description: In-app and Telegram alerts for due and overdue tasks and projects, plus daily task digests.
---
# Notifications

tududi checks your tasks and projects on a schedule and raises notifications for what needs attention — due soon, overdue, or newly available after a defer date. Notifications appear in the bell in the top bar and, if configured, in Telegram.

---
## What Triggers a Notification

| Event | When | Level |
|-------|------|-------|
| Task due soon | Due within 24 hours, not yet done | Warning |
| Task overdue | Past due, not yet done | Error |
| Task now active | Its defer-until time has arrived | Info |
| Project due soon | Due within 24 hours, not completed | Warning |
| Project overdue | Past due, not completed | Error |

These checks run automatically every 15 minutes for tasks and projects, and every 5 minutes for defer-until activations — see [Background Jobs](/getting-started/configuration#background-jobs) if you need to disable them.

tududi avoids spamming you for the same item: once you **read** a notification it will not be recreated with a fresher timestamp, and once you **delete** it, it is gone for good for that occurrence — it will not resurface on the next check.

:::note "Delete" really means dismiss
Deleting a notification hides it permanently rather than just clearing it from view. If you want a reminder to keep nudging you until you deal with the underlying task, leave it unread rather than deleting it.
:::

---
## Delivery Channels

| Channel | Status |
|---------|--------|
| In-app (the bell) | Available |
| Telegram | Available, once [Telegram](telegram-integration.md) is connected |
| Email | Not yet available |
| Push | Not yet available |

The Notifications settings tab marks Email and Push "Coming Soon" — the toggles are visible but disabled. Enabling email delivery (`ENABLE_EMAIL` and SMTP settings) covers other parts of tududi like registration mail, but it does not currently deliver these notifications.

The Telegram toggle only becomes usable once your Telegram bot token and chat ID are set — see [Telegram Integration](telegram-integration.md).

---
## Choosing What You Get Notified About

**Profile → Notifications** has a grid: five notification types down the side, delivery channels across the top.

| Type | Default |
|------|---------|
| Due Tasks | In-app on |
| Overdue Tasks | In-app on |
| Due Projects | In-app on |
| Overdue Projects | In-app on |
| Defer Until (task now active) | In-app on |

Telegram is off by default for every type; turn on the ones you want pushed to your phone. A **Send Test** control lets you fire a sample notification for any type to confirm your settings work before you rely on them.

---
## The Notification Bell

Click the bell in the top bar to open your recent notifications — the 20 most recent, read and unread together. The badge shows your unread count and refreshes automatically.

Each row shows a level icon, title, message, and a relative timestamp. Rows tied to a task or project are clickable and take you straight there. Use the check icon to mark a single notification read, the X to dismiss it, or **Mark all as read** in the header.

---
## Daily Task Summaries

Separate from the notification system, tududi can send you a **daily digest** of your tasks over Telegram — due today, in progress, suggested, and completed today. Configure it in **Profile → Telegram**; see [Telegram Integration](telegram-integration.md#daily-task-summaries) for frequency options and message format.

---
## API Reference

All endpoints require authentication.

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/notifications` | List. Query: `limit`, `offset`, `includeRead`, `type` |
| `GET` | `/api/notifications/unread-count` | `{ count }` |
| `POST` | `/api/notifications/:uid/read` | Mark read |
| `POST` | `/api/notifications/mark-all-read` | Mark all read |
| `DELETE` | `/api/notifications/:uid` | Dismiss (permanent) |
| `POST` | `/api/test-notifications/trigger` | Send yourself a test notification. Body: `{ type }` |
| `PATCH` | `/api/profile` | Save `notification_preferences` |

---
## Related Documentation

- [Telegram Integration](telegram-integration.md) - Connecting Telegram and setting up daily summaries
- [Tasks](tasks.md) - Due dates and defer-until
- [Configuration](/getting-started/configuration#background-jobs) - Disabling background jobs entirely

**Technical Implementation Files:**
- Notifications module: `/backend/modules/notifications/`
- Notification model: `/backend/models/notification.js`
- Due/overdue checks: `/backend/modules/tasks/dueTaskService.js`, `/backend/modules/tasks/deferredTaskService.js`, `/backend/modules/projects/dueProjectService.js`
- Scheduler: `/backend/modules/tasks/taskScheduler.js`
- Settings UI: `/frontend/components/Profile/tabs/NotificationsTab.tsx`
- Bell dropdown: `/frontend/components/Notifications/NotificationsDropdown.tsx`
