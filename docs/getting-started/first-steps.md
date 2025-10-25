---
sidebar_position: 3
---

# First Steps

Get started with Tududi and create your first tasks.

## Creating Your First Account

1. Navigate to `http://localhost:3000` in your browser
2. Click "Sign Up" or register your first user via CLI:

```bash
npm run user:create
```

Follow the prompts to create your account.

## Creating Your First Task

### Via Web Interface

1. Log in to your Tududi account
2. Click the "+" button or "New Task"
3. Enter task details:
   - **Title**: Brief description of the task
   - **Description**: Detailed information (supports Markdown)
   - **Due Date**: When the task should be completed
   - **Priority**: Low, Medium, or High
   - **Tags**: Organize tasks with tags

4. Click "Create Task"

### Via Telegram Bot

If you have Telegram integration enabled:

1. Start a chat with your Tududi bot
2. Send a message: `/newtask Buy groceries`
3. The bot will create the task and confirm

## Organizing Tasks

### Creating Projects

Projects help you group related tasks:

1. Click "New Project"
2. Enter project name and description
3. Drag and drop tasks into the project

### Hierarchical Structure

Create subtasks for better organization:

1. Select a task
2. Click "Add Subtask"
3. Enter subtask details

Tasks can be nested multiple levels deep:

```
📁 Website Redesign
  ├── 📝 Design Homepage
  │   ├── ✅ Create wireframes
  │   └── 📝 Design mockups
  ├── 📝 Develop Frontend
  └── 📝 Testing
```

## Using Tags

Tags help categorize and filter tasks:

1. When creating or editing a task, add tags
2. Use the tag filter in the sidebar to view tasks by tag
3. Common tag patterns:
   - **Context**: `@home`, `@work`, `@computer`
   - **Status**: `#urgent`, `#waiting`, `#blocked`
   - **Project**: `+website`, `+mobile-app`

## Setting Up Your Workflow

### Daily Review

1. View today's tasks in the "Today" view
2. Mark completed tasks as done
3. Reschedule tasks as needed

### Weekly Planning

1. Use the "Week" view to see upcoming tasks
2. Drag tasks to different days
3. Prioritize important tasks

## Keyboard Shortcuts

Speed up your workflow with keyboard shortcuts:

- `N` - New task
- `P` - New project
- `Space` - Toggle task completion
- `/` - Focus search
- `Esc` - Close dialog

## Customizing Your Experience

### Language Settings

1. Click your profile icon
2. Select "Settings"
3. Choose your preferred language
4. Click "Save"

### Theme

Toggle between light and dark mode:

1. Click your profile icon
2. Select "Settings"
3. Choose theme preference

## Data Management

### Exporting Tasks

Export your tasks to various formats:

1. Go to Settings → Export
2. Choose format (JSON, CSV, or Markdown)
3. Click "Export"

### Importing Tasks

Import tasks from other tools:

1. Go to Settings → Import
2. Upload your file
3. Map fields if necessary
4. Click "Import"

## Next Steps

- [Task Management Features](/features/task-management) - Learn advanced task management
- [Hierarchical Organization](/features/hierarchical-organization) - Master project organization
- [Telegram Integration](/features/telegram-integration) - Use Tududi via Telegram

## Need Help?

- Join our [Community Discussions](https://github.com/tududi/tududi/discussions)
- Report issues on [GitHub](https://github.com/tududi/tududi/issues)
