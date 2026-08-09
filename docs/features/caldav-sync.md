---
sidebar_position: 22
title: CalDAV Sync
description: Use tududi as a CalDAV server for Apple Reminders and tasks.org, or sync two-way with Nextcloud and Baikal.
---
# CalDAV Sync

CalDAV is the industry-standard protocol for accessing calendar and task data. tududi implements it in **both directions**:

- **As a server** — connect Apple Reminders, tasks.org, Thunderbird, or Evolution directly to tududi
- **As a client** — sync two-way with Nextcloud, Baikal, or any CalDAV-compatible server

**Key capabilities:**
- Bidirectional sync — changes flow both ways
- Recurring tasks via RRULE (RFC 5545)
- Automatic conflict detection with configurable resolution
- Background periodic sync
- Standards-compliant: RFC 4791 (CalDAV) and RFC 5545 (iCalendar)

---
## Enabling CalDAV

CalDAV is **off by default**. Enable it with environment variables, then restart tududi.

```bash
# Enable the CalDAV feature (FF_ENABLE_CALDAV is an accepted alias)
CALDAV_ENABLED=true

# Encryption key for stored remote-calendar passwords (32 bytes)
ENCRYPTION_KEY=$(openssl rand -hex 32)

# Optional defaults
CALDAV_DEFAULT_SYNC_INTERVAL=15              # Minutes between syncs
CALDAV_MAX_RECURRING_INSTANCES=365           # Future recurring instances
CALDAV_CONFLICT_RESOLUTION=last_write_wins   # Default strategy
```

Restart:

```bash
docker compose restart   # Docker
npm start                # Standalone
```

Then configure calendars in **Profile → Settings → CalDAV**. The tab only appears once the feature flag is on.

### Environment variable reference

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `CALDAV_ENABLED` | Yes | `false` | Enable the CalDAV feature. `FF_ENABLE_CALDAV=true` works too |
| `ENCRYPTION_KEY` | Recommended | falls back to `SECRET_KEY` | AES-256-GCM key for encrypting remote calendar passwords |
| `CALDAV_PROJECTS_AS_CALENDARS` | No | `false` | Serve one calendar **per project** (plus a "(No Project)" calendar) instead of a single combined list. With this on, Apple Reminders shows one list per project |
| `CALDAV_DEFAULT_SYNC_INTERVAL` | No | `15` | Default sync interval in minutes |
| `CALDAV_MAX_RECURRING_INSTANCES` | No | `365` | Maximum future recurring instances to expand |
| `CALDAV_CONFLICT_RESOLUTION` | No | `last_write_wins` | Default conflict strategy |
| `CALDAV_RATE_LIMIT` | No | `60` | Requests per minute per IP |
| `CALDAV_MAX_SYNC_TASKS` | No | `1000` | Maximum tasks per sync operation |
| `CALDAV_REQUEST_TIMEOUT` | No | `30000` | Request timeout in milliseconds |
| `CALDAV_LOG_LEVEL` | No | `info` | `error`, `warn`, `info`, or `debug` |
| `CALDAV_LOG_REQUESTS` | No | `false` | Log every CalDAV HTTP request |

:::warning Set ENCRYPTION_KEY explicitly
Remote calendar passwords are encrypted with a key derived from `ENCRYPTION_KEY`, falling back to `SECRET_KEY`. If that value ever changes, previously stored remote passwords become undecryptable and you will have to re-enter them.
:::

---
## Connecting a Client to tududi

In this mode tududi *is* the CalDAV server. Clients authenticate with HTTP Basic Auth using your tududi email and password.

Base URL: `https://your-tududi-domain.com/caldav/`

:::danger Use HTTPS
CalDAV uses HTTP Basic Auth, which transmits your credentials on every request. Always serve tududi over HTTPS in production.
:::

### tasks.org (Android/iOS)

1. Open tasks.org → **☰ Menu → Settings → Synchronization**
2. Select **CalDAV**
3. Enter:
   - **URL:** `https://your-tududi-domain.com/caldav/`
   - **Username:** your tududi email
   - **Password:** your tududi password
4. Tap **Add Account**, select the **tasks** calendar, then **Sync**

Supports full task CRUD, RRULE recurrence, due and start dates, priorities, status, and subtasks via `RELATED-TO`. Habit mode and tags are stored in custom fields and may not display.

### Apple Reminders (iOS)

1. **Settings → Reminders → Accounts → Add Account → Other**
2. Select **Add CalDAV Account**
3. Enter:
   - **Server:** `your-tududi-domain.com`
   - **Username:** your tududi email
   - **Password:** your tududi password
   - **Description:** Tududi Tasks
4. **Next → Save**, then open Reminders

### Apple Reminders (macOS)

1. **System Settings → Internet Accounts**
2. **+ → Add Other Account → CalDAV Account**
3. Set **Account Type** to Manual, then enter your email, password, and
   **Server Address:** `https://your-tududi-domain.com/caldav/`
4. **Sign In**, then open Reminders

Supports task creation and editing, due dates and reminders, priorities, completion, and limited recurrence patterns.

:::tip One list per project
Set `CALDAV_PROJECTS_AS_CALENDARS=true` to make Apple Reminders show each tududi project as its own list instead of one combined list.
:::

### Thunderbird (Desktop)

1. Open the **Calendar** tab
2. Right-click the calendar list → **New Calendar → On the Network → CalDAV**
3. **Location:** `https://your-tududi-domain.com/caldav/{your-username}/tasks/`
4. Enter credentials when prompted, select **Tasks**, click **Finish**

Thunderbird has the most complete support: full task management, advanced recurrence, all date fields, priority, status, descriptions, and subtask hierarchy.

### Evolution (Linux)

1. **File → New → Task List → CalDAV**
2. **URL:** `https://your-tududi-domain.com/caldav/{your-username}/tasks/`
3. Enter your tududi email and password, click **Apply**

---
## Syncing with a Remote Server

In this mode tududi acts as a CalDAV *client*, periodically fetching remote changes and pushing local ones. This is useful for cloud backup, keeping multiple tududi instances in sync, or integrating with existing calendar infrastructure.

### Nextcloud

1. **Profile → Settings → CalDAV → Add Remote Calendar**
2. Select **Nextcloud**
3. Enter:
   - **Name:** My Nextcloud Tasks
   - **Server URL:** `https://your-nextcloud-domain.com`
   - **Calendar Path:** `/remote.php/dav/calendars/{username}/tasks/`
   - **Username / Password:** your Nextcloud credentials
4. Choose a sync direction and interval
5. **Save**, then **Sync Now** to test

**Use an app password.** In Nextcloud go to **Settings → Security → Devices & sessions**, create a new app password named `Tududi`, and use that instead of your account password.

### Baikal

Same flow, selecting **Baikal** as the server type:
- **Server URL:** `https://your-baikal-domain.com`
- **Calendar Path:** `/dav.php/calendars/{username}/tasks/`

### Generic CalDAV server

Select **Generic CalDAV** and supply the full server URL, calendar path, credentials, and auth type (Basic by default).

Most servers follow the pattern `/calendars/{username}/{calendar-name}/`. Check your server's documentation for the exact format.

### Testing before saving

The remote calendar form includes a **Test Connection** action that validates the URL and credentials without creating the calendar.

---
## Managing Calendars

**Profile → Settings → CalDAV** lists your local and remote calendars with their sync status.

Each calendar card shows the last successful sync time, current status (Synced / Syncing / Error), and any error details.

- **Add Calendar** — create a local calendar served at `https://your-domain.com/caldav/{username}/tasks/`
- **Add Remote Calendar** — connect an external server
- **Edit** — change name, sync interval, or direction
- **Sync Now** — trigger an immediate sync
- **Delete** — removes the CalDAV configuration only. **Your tasks are not deleted.**

### Sync direction

| Direction | Behavior |
|---|---|
| Bidirectional | Changes sync both ways (default) |
| Pull only | Import from remote into tududi |
| Push only | Export from tududi to remote |

### Sync interval

5, 15 (default), 30, or 60 minutes, or **Manual only** to disable automatic sync while keeping the **Sync Now** button available.

---
## Conflict Resolution

A conflict occurs when the same task changes both in tududi and remotely between syncs.

| Strategy | Behavior |
|---|---|
| `last_write_wins` | Most recent change wins (default, recommended) |
| `local_wins` | Always keep the tududi version |
| `remote_wins` | Always keep the remote version |
| `manual` | Flag the conflict for you to resolve |

With `manual`, a red badge appears on the CalDAV tab and a conflict count on the affected calendar card. Click **View Conflicts** to see a side-by-side comparison of the local and remote versions, then choose **Keep Local** or **Keep Remote**. Merging is not yet implemented.

---
## How Sync Works

tududi uses a three-phase sync algorithm:

1. **Pull** — fetch remote changes, parse VTODO items, buffer them
2. **Merge** — compare versions using ETags, detect conflicts, apply the resolution strategy
3. **Push** — serialize local changes to VTODO and PUT them to the remote server, then update sync state

**ETags** identify each task version and let clients detect changes efficiently; `If-Match` headers prevent conflicting updates. **CTags** cover the whole calendar collection, enabling a cheap "has anything changed?" check that avoids unnecessary full syncs.

---
## Field Mappings

| tududi field | VTODO property | Notes |
|--------------|----------------|-------|
| Name | `SUMMARY` | Task title |
| Note | `DESCRIPTION` | Task description |
| Due date | `DUE` | ISO 8601 UTC |
| Defer until | `DTSTART` | Start date/time |
| Completed at | `COMPLETED` | Completion timestamp |
| Status | `STATUS` | See below |
| Priority | `PRIORITY` | Inverse scale, see below |
| Recurrence | `RRULE` | RFC 5545 |
| Subtasks | `RELATED-TO` | Parent task UID |

### Status mapping

| tududi status | VTODO status |
|---------------|--------------|
| Not started | `NEEDS-ACTION` |
| In progress | `IN-PROCESS` |
| Done | `COMPLETED` |
| Archived | `COMPLETED` |
| Waiting | `NEEDS-ACTION` |
| Cancelled | `CANCELLED` |
| Planned | `NEEDS-ACTION` |

Seven tududi statuses collapse into four CalDAV statuses, so some nuance is lost in external clients.

### Priority mapping

CalDAV uses an inverse scale where 1 is highest:

| tududi priority | VTODO priority |
|-----------------|----------------|
| High | 3 |
| Medium | 5 |
| Low | 7 |

### Custom fields

tududi-specific data is preserved in extended properties that external clients generally will not display:

- `X-TUDUDI-HABIT-MODE` — habit tracking settings
- `X-TUDUDI-PROJECT-UID` — project association
- `X-TUDUDI-TAGS` — task tags

---
## Recurring Tasks

Recurring tasks are stored **once** in tududi with a recurrence rule — there are no duplicate rows for future occurrences. For CalDAV, the parent is expanded on demand into virtual instances, each with a unique `RECURRENCE-ID`, so clients see discrete entries.

| Pattern | RRULE |
|---------|-------|
| Daily | `FREQ=DAILY` |
| Every N days | `FREQ=DAILY;INTERVAL=3` |
| Weekly on set days | `FREQ=WEEKLY;BYDAY=MO,WE,FR` |
| Monthly by date | `FREQ=MONTHLY;BYMONTHDAY=15` |
| Monthly by weekday | `FREQ=MONTHLY;BYDAY=2TH` (2nd Thursday) |
| Yearly | `FREQ=YEARLY;BYMONTH=1;BYMONTHDAY=1` |

Editing a single instance creates an override. Deleting the parent removes all instances. Expansion is capped by `CALDAV_MAX_RECURRING_INSTANCES` (default 365).

See [Recurring Tasks](recurring-tasks.md) for how recurrence behaves inside tududi.

---
## Security

**Password storage.** Remote calendar passwords are encrypted with AES-256-GCM using a key derived from `ENCRYPTION_KEY` (or `SECRET_KEY`). Prefer app-specific passwords over main account passwords wherever the remote server supports them.

**Authentication.** CalDAV endpoints use HTTP Basic Auth. Use HTTPS in production — Basic Auth sends credentials on every request.

**Rate limiting.** CalDAV protocol endpoints allow 60 requests per minute by default (`CALDAV_RATE_LIMIT`); manual sync triggers are limited to 5 per minute.

---
## Troubleshooting

### Authentication fails (401)

1. Verify your email and password are correct
2. Confirm `CALDAV_ENABLED=true` and the server was restarted
3. Make sure your client supports HTTP Basic Auth
4. Check that your reverse proxy is not stripping the `Authorization` header

### Tasks not syncing

1. Check the sync status and last sync time on the calendar card
2. Click **Sync Now** to force a sync
3. Confirm sync direction is **Bidirectional** rather than pull- or push-only
4. Check the conflict list for unresolved conflicts
5. Review the backend logs — set `CALDAV_LOG_LEVEL=debug` for detail

### Only the first recurring instance appears

1. Confirm your client supports RRULE
2. Check `CALDAV_MAX_RECURRING_INSTANCES` (default 365)
3. Some clients need a manual refresh to pick up new instances

### Sync is slow or times out

1. Archive completed tasks to reduce volume
2. Raise `CALDAV_REQUEST_TIMEOUT` (e.g. `60000`)
3. Lower the sync frequency from 5 minutes to 15
4. Check server CPU, memory, and disk I/O

### "Invalid VTODO" or parse errors

1. Verify the client is sending valid iCalendar data
2. Enable `CALDAV_LOG_REQUESTS=true` and review the logs
3. Test with a different client to isolate whether it is client-specific

---
## Known Limitations

1. **Subtasks** — supported via `RELATED-TO`, but not every client renders the hierarchy
2. **Habit mode** — stored in custom fields, invisible externally
3. **Tags** — exported as `CATEGORIES`; colors and metadata stay in tududi
4. **Projects** — association stored in `X-TUDUDI-PROJECT-UID`, not shown externally unless `CALDAV_PROJECTS_AS_CALENDARS` is on
5. **Status granularity** — 7 tududi statuses map onto 4 CalDAV statuses
6. **Timezones** — all dates stored as UTC; clients convert locally
7. **Large recurring sequences** — expanding far into the future creates many VTODOs

---
## FAQ

**Can I use multiple CalDAV clients at once?**
Yes. Changes from any client sync to all the others.

**What happens if I delete a task in a CalDAV client?**
With bidirectional sync it is deleted in tududi on the next sync.

**Can I sync multiple remote calendars?**
Yes, and each syncs independently.

**Do I need a separate CalDAV server?**
No. tududi is itself a CalDAV server — clients can connect to it directly.

**Can I disable automatic sync?**
Yes, set the interval to **Manual only**. The **Sync Now** button still works.

---
## Related Documentation

- [Tasks](tasks.md) - Task fields that map to VTODO properties
- [Recurring Tasks](recurring-tasks.md) - How recurrence behaves in tududi
- [Configuration](/getting-started/configuration) - Full environment variable reference
- [Calendar](calendar.md) - tududi's built-in calendar views

**Protocol references:**
- [RFC 4791 — CalDAV](https://datatracker.ietf.org/doc/html/rfc4791)
- [RFC 5545 — iCalendar](https://datatracker.ietf.org/doc/html/rfc5545)
- [RFC 6578 — Sync Collection](https://datatracker.ietf.org/doc/html/rfc6578)

**Technical Implementation Files:**
- CalDAV protocol routes: `/backend/modules/caldav/routes.js`
- REST API routes: `/backend/modules/caldav/api/routes.js`
- Sync engine: `/backend/modules/caldav/sync/` (pull, merge, push, conflict resolver)
- iCalendar parsing: `/backend/modules/caldav/icalendar/`
- Sync scheduler: `/backend/modules/caldav/services/sync-scheduler.js`
- Password encryption: `/backend/modules/caldav/services/encryption-service.js`
- Settings UI: `/frontend/components/Profile/tabs/CalDAVTab.tsx`
- Setup wizard and conflict resolver: `/frontend/components/CalDAV/`
