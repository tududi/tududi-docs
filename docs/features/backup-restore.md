---
sidebar_position: 25
title: Backup & Restore (In-App)
description: Export and restore your data from inside tududi, without touching the server's filesystem.
---
# Backup & Restore (In-App)

tududi can export your data to a downloadable file and restore it back — from inside the app, with no server access needed. This is different from the raw SQLite file backups described in [Backups](/development/backups); that approach protects the whole database file at the infrastructure level, while this one gives you a portable, per-account snapshot you can download, move, and restore from the interface.

**URL:** `/backup`

---
## Enabling It

This feature is **off by default** and must be turned on by your administrator with `FF_ENABLE_BACKUPS=true`. If it's off, the page still loads but every action fails — ask your administrator to enable it. See [Configuration](/getting-started/configuration#feature-flags).

---
## What Gets Exported

Clicking **Export** captures your account in a single file: profile settings and preferences (not your password), plus areas, projects, tasks (with tags, completions, and attachment records), tags, notes, inbox items, task history, and saved views.

tududi keeps your **last 5 exports** automatically — older ones are deleted as new ones are created. Each appears in a list with its size, item counts, and creation date, and can be downloaded or deleted individually.

---
## Restoring

You can restore from a backup you previously saved in tududi, or **import a file** you downloaded earlier (or exported from another instance).

Before importing a file, tududi validates it and shows you a summary — item counts and the export date — so you know what you're about to bring in before committing.

:::note Restoring merges, it does not replace
Restoring adds anything that doesn't already exist in your account (matched by internal ID) and quietly skips anything that does. There is currently no option to wipe your account and replace it wholesale with a backup — if you need that, ask your administrator to restore from a raw database backup instead. See [Backups](/development/backups).
:::

This makes restore safe to run more than once: re-importing the same file a second time changes nothing, since everything in it already matches something in your account.

---
## API Reference

All endpoints require authentication and the backups feature flag.

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/api/backup/export` | Create and save a new backup |
| `GET` | `/api/backup/list` | List your last 5 saved backups |
| `GET` | `/api/backup/:uid/download` | Download a saved backup file |
| `POST` | `/api/backup/:uid/restore` | Merge-import a saved backup back into your account |
| `POST` | `/api/backup/validate` | Validate an uploaded file without importing it |
| `POST` | `/api/backup/import` | Upload and merge-import a file directly |
| `DELETE` | `/api/backup/:uid` | Delete a saved backup |

---
## Related Documentation

- [Backups](/development/backups) - Raw SQLite file backups, for administrators
- [Configuration](/getting-started/configuration#feature-flags) - Enabling `FF_ENABLE_BACKUPS`

**Technical Implementation Files:**
- Backup module: `/backend/modules/backup/`
- Backup logic: `/backend/services/backupService.js`
- Settings UI: `/frontend/components/Backup/BackupRestore.tsx`
