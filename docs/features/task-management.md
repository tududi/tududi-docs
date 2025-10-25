---
sidebar_position: 1
---

# Task Management

Comprehensive guide to managing tasks in Tududi.

## Creating Tasks

Tasks are the core building blocks of Tududi. Each task can contain:

- **Title**: A brief, descriptive name
- **Description**: Detailed information with Markdown support
- **Due Date**: When the task should be completed
- **Priority**: Low, Medium, or High
- **Status**: Not Started, In Progress, Completed
- **Tags**: For categorization and filtering
- **Attachments**: Files and documents

## Task Properties

### Title and Description

```markdown
# Task: Implement User Authentication

## Description
Implement OAuth 2.0 authentication with support for:
- Google Sign-In
- GitHub OAuth
- Email/Password fallback

## Technical Requirements
- Use JWT tokens
- Implement refresh token rotation
- Add rate limiting
```

### Priority Levels

- **Low**: Nice to have, no deadline pressure
- **Medium**: Important, should be done soon
- **High**: Critical, needs immediate attention

### Status Tracking

Tasks progress through different states:

1. **Not Started**: Task is planned but work hasn't begun
2. **In Progress**: Actively working on the task
3. **Blocked**: Waiting on external dependencies
4. **Completed**: Task is finished
5. **Archived**: Completed tasks moved to archive

## Advanced Features

### Recurring Tasks

Set tasks to repeat automatically:

```
Daily: Every day at 9 AM
Weekly: Every Monday
Monthly: First day of each month
Custom: Define your own schedule
```

### Task Dependencies

Link tasks that depend on each other:

```
Task A → must complete before → Task B
Task B → blocked by → Task A
```

### Time Tracking

Track time spent on tasks:

1. Click the timer icon on a task
2. Start tracking
3. Pause or stop when done
4. View time logs in task details

### Checklists

Break down tasks into smaller steps:

```markdown
- [ ] Research authentication libraries
- [ ] Set up OAuth providers
- [x] Implement login flow
- [ ] Add error handling
- [ ] Write tests
```

## Bulk Operations

Perform actions on multiple tasks:

1. Select multiple tasks (Shift+Click or Ctrl+Click)
2. Use bulk actions:
   - Change priority
   - Add tags
   - Move to project
   - Set due date
   - Mark as complete

## Filtering and Search

### Quick Filters

- All Tasks
- Today
- This Week
- Overdue
- High Priority
- Completed

### Advanced Search

Use search operators:

```
priority:high status:incomplete
tag:@work due:today
project:"Website Redesign" -tag:done
```

### Saved Filters

Save frequently used filters for quick access:

1. Create a filter
2. Click "Save Filter"
3. Access from sidebar

## Task Templates

Create templates for recurring task types:

1. Create a task with desired structure
2. Click "Save as Template"
3. Name your template
4. Reuse with "New from Template"

## Collaboration

### Task Assignment

Assign tasks to team members:

1. Open task details
2. Click "Assign to..."
3. Select user
4. Add optional message

### Comments and Discussion

Discuss tasks with your team:

1. Open task details
2. Add comments with Markdown support
3. @mention team members
4. Attach files or images

### Activity Log

View task history:

- Who created the task
- Changes to status, priority, or due date
- Comments and discussions
- Time tracking entries

## Notifications

Stay updated on task changes:

- **Email**: Receive email notifications
- **In-app**: Browser notifications
- **Telegram**: Bot notifications (if enabled)

Configure notification preferences:

1. Settings → Notifications
2. Choose notification types
3. Set delivery methods

## Next Steps

- [Hierarchical Organization](/features/hierarchical-organization) - Organize tasks in projects
- [Multi-language Support](/features/multi-language) - Use Tududi in your language
- [Telegram Integration](/features/telegram-integration) - Manage tasks via Telegram
