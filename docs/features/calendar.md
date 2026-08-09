---
sidebar_position: 16
title: Calendar
description: See your tasks by due date and defer date in day, week, or month views.
---
# Calendar

The Calendar shows your tasks laid out by date instead of by list — due dates and defer dates plotted across a day, week, or month.

**URL:** `/calendar`

---
## Enabling It

Calendar is **off by default**. Turn it on in **Profile → Features & Add-ons → Calendar**. See [Feature Toggles](feature-toggles.md).

---
## What Appears on the Calendar

Every task with a **due date** gets an entry (blue, or green once completed). Every task with a **defer-until date** gets a separate entry (amber, or green once completed). A task with both shows up twice — once on each date.

Entries are one-hour blocks; tasks don't have a stored duration, so this is a fixed visual size rather than a real time range. Future occurrences of recurring tasks appear as their own entries as they're generated.

---
## Views

- **Month** — the whole month in a grid, up to 3 entries per day with a "+N" overflow indicator for busier days
- **Week** — seven day-columns against 24 hourly rows
- **Day** — one day against 24 hourly rows

All three respect your configured first day of the week (**Profile → General**), falling back to your browser's locale if unset. Switch views with the segmented control, and use **Today** to jump back to the current date.

---
## Interacting with Entries

Click an entry to open a quick-view panel with the task's status, priority, due and defer dates, project, tags, and note. From there, **Open task** takes you to the full task page.

**Drag an entry to a new day or time** to reschedule it — this updates the task's due date or defer date directly, depending on which kind of entry you moved. If the update fails, the calendar reloads to show the task's actual current schedule.

Clicking empty space on the calendar does nothing — there is no "create task here" action yet.

---
## Related Documentation

- [Feature Toggles](feature-toggles.md) - Turning the Calendar on
- [Tasks](tasks.md) - Due dates and defer-until
- [Today Page](today-page.md) - A list-based view of the same tasks

**Technical Implementation Files:**
- `/frontend/components/Calendar.tsx`
- `/frontend/components/Calendar/CalendarDayView.tsx`, `CalendarWeekView.tsx`, `CalendarMonthView.tsx`
