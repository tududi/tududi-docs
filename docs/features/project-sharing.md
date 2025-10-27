---
sidebar_position: 3
---

# Project Sharing

## Overview

The project sharing feature allows you to collaborate with other users by granting them access to your projects. When you share a project, the recipient automatically gets access to all tasks and notes within that project.

## How to Share a Project

1. **Open the Share dialog**: Click the Share button on any project you own
2. **Select a user**: Choose who you want to share with from the dropdown menu
3. **Choose permission level**:
   - **Read only** - User can view the project and its contents
   - **Read & write** - User can view and edit the project and its contents
4. **Grant access**: Click to share

The shared user will immediately see the project appear in their projects list.

## Permission Levels

### Read Only (`ro`)
- View project details
- View all tasks and notes in the project
- Cannot edit, create, or delete anything

### Read & Write (`rw`)
- Everything in Read Only, plus:
- Edit project details
- Create, edit, and delete tasks
- Create, edit, and delete notes
- Modify task statuses and properties

> **Note:** Only the project owner can share or revoke access. Recipients cannot re-share the project with others.

## Managing Shares

### View Current Shares
Open the Share dialog to see everyone who has access to the project, including:
- Their email address
- Permission level
- When access was granted

### Revoke Access
Click the "Revoke" button next to any user in the shares list to remove their access. This immediately:
- Removes the project from their projects list
- Removes access to all tasks and notes in the project

### Visual Indicators
Shared projects display a green share icon to help you identify which projects you're collaborating on.

## What Recipients See

When a project is shared with you:
- It appears in your projects list alongside your own projects
- The share icon indicates it's a shared project
- Your access level determines what actions you can perform
- You cannot share the project with others (only the owner can)

## Permission Inheritance

Sharing works hierarchically:

```
📁 Project (shared at "Read & write")
  ├── ✓ All tasks (automatically Read & write)
  ├── ✓ All subtasks (automatically Read & write)
  └── ✓ All notes (automatically Read & write)
```

When you share a project, the recipient gets the same permission level on **everything inside it**. There's no need to share individual tasks or notes separately.

## Security & Privacy

- **Owner control**: Only the project owner (creator) can grant or revoke access
- **Audit trail**: All sharing actions are logged with timestamps and actor information
- **No self-sharing**: You cannot share a project with yourself
- **Admin access**: System administrators have full access to all projects

## Common Use Cases

**Team collaboration**: Share a project with "Read & write" access so team members can update tasks together

**Status updates**: Share with "Read only" access for stakeholders who need visibility but shouldn't make changes

**Handoff**: Share with "Read & write" access when transferring project ownership or onboarding team members
