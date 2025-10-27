---
sidebar_position: 2
---

# First Steps

Welcome to tududi! This guide will walk you through the essential features and help you get productive quickly.

## Your First Login

After installation, navigate to your tududi instance and log in with the credentials you set during setup:

- **Email**: The value you set for `TUDUDI_USER_EMAIL`
- **Password**: The value you set for `TUDUDI_USER_PASSWORD`

Once logged in, you'll see the main task view. Let's explore!

---

## Understanding the Interface

### Main Navigation

The left sidebar contains your main navigation:

- **Today** - Tasks due today or overdue
- **Upcoming** - Tasks with future due dates
- **Someday** - Tasks without due dates (your backlog)
- **Inbox** - Items captured from Telegram awaiting processing
- **Projects** - All your projects
- **Areas** - High-level life/work categories
- **Notes** - Standalone notes and documentation
- **Tags** - Browse by tag

### Top Bar

- **Search** - Universal search across tasks, projects, notes, and tags
- **User Menu** - Access settings, profile, and logout
- **Theme Toggle** - Switch between light and dark mode

---

## Creating Your First Task

The most basic action in tududi is creating a task.

### Quick Task Creation

1. Click the **"+ New Task"** button (or press `Ctrl/Cmd + N`)
2. Enter a task name, for example: "Buy groceries"
3. Press **Enter** to create

That's it! Your task is now in the "Someday" view.

### Adding Task Details

Click on a task to expand its details panel:

- **Due Date** - Click the calendar icon to set a due date
- **Priority** - Set Low (0), Medium (1), or High (2) priority
- **Description** - Add detailed notes about the task
- **Project** - Assign to a project (we'll create one next)
- **Tags** - Add tags for organization
- **Status** - Set task status (0-4) or archive

**Status Levels:**
- 0: Not started
- 1: In planning
- 2: In progress
- 3: Review/blocked
- 4: Nearly complete
- Archive: Remove from active views but keep for reference

---

## Organizing with Projects

Projects group related tasks together. Perfect for anything with multiple steps.

### Create Your First Project

1. Click **"Projects"** in the sidebar
2. Click **"+ New Project"**
3. Enter a name, for example: "Home Renovation"
4. Optionally set:
   - **State** - Idea, Planned, In Progress, On Hold, Complete, Archived
   - **Description** - Project details
   - **Area** - Assign to an area (we'll cover this next)
   - **Tags** - Add project tags

### Add Tasks to a Project

**Method 1: From Task Details**
1. Click on any task
2. In the details panel, click the **Project** dropdown
3. Select your project

**Method 2: From Project View**
1. Open a project
2. Click **"+ Add Task"** within the project
3. Task is automatically assigned to this project

### Project Views

Projects have multiple view modes:
- **Card View** - Visual cards with status, progress, and quick actions
- **List View** - Compact list with inline editing
- **Sort Options** - Order by name, due date, created date, or priority

---

## Grouping with Areas

Areas are high-level categories for your projects. Think of them as life domains.

### Common Area Examples

- **Personal** - Personal projects and tasks
- **Work** - Professional projects
- **Health** - Fitness, wellness, medical
- **Finance** - Budget, investments, financial planning
- **Learning** - Courses, skills, education

### Create Your First Area

1. Click **"Areas"** in the sidebar
2. Click **"+ New Area"**
3. Enter a name, for example: "Work"
4. Optionally add a description

### Assign Projects to Areas

1. Open a project
2. Click the **Area** dropdown
3. Select an area

Now your projects are organized by life domain!

---

## Organizing with Tags

Tags provide flexible, cross-cutting organization. Use them for contexts, priorities, or any custom categorization.

### Tag Ideas

- **Contexts**: `@home`, `@office`, `@phone`, `@computer`
- **Energy Levels**: `#quick-win`, `#deep-work`, `#low-energy`
- **Categories**: `#urgent`, `#important`, `#research`, `#creative`
- **Time-based**: `#morning`, `#evening`, `#weekend`

### Adding Tags

**To a Task:**
1. Click on a task
2. In the details panel, find the **Tags** section
3. Type a tag name and press **Enter**
4. Tags are created automatically if they don't exist

**To a Note:**
1. Open a note
2. Use the tags section
3. Add tags the same way as tasks

### Browsing by Tag

1. Click **"Tags"** in the sidebar
2. Click on any tag to see all tagged items
3. Filter by task or note type

---

## Using Custom Views

Views let you create filtered, personalized task lists.

### Create a Custom View

1. Go to any task list (Today, Upcoming, Someday)
2. Apply filters (project, area, tag, status, etc.)
3. Click **"Save View"**
4. Name your view, for example: "Work Tasks - High Priority"
5. Optionally **pin** the view for quick access

### Pin Views for Quick Access

Pinned views appear in your sidebar for instant access.

**To pin a view:**
1. Create or open a saved view
2. Click the **pin icon**
3. View appears in sidebar

**Common View Examples:**
- "Today - Work Only" - Today's tasks filtered by work area
- "High Priority Upcoming" - Upcoming tasks with priority 2
- "Quick Wins" - Tasks tagged `#quick-win`
- "Waiting For" - Tasks in status 3 (review/blocked)

---

## Working with Subtasks

Break complex tasks into manageable steps.

### Create Subtasks

1. Open a task
2. Click **"Add Subtask"**
3. Enter subtask name
4. Add as many subtasks as needed

### Subtask Features

- **Progress Tracking** - Visual progress bar shows completion percentage
- **Independent Due Dates** - Each subtask can have its own due date
- **Reordering** - Drag and drop to reorder subtasks
- **Navigation** - Click subtask to view full details
- **Completion** - Check off subtasks as you complete them

**Pro Tip**: Use subtasks to break down any task that takes more than one session to complete.

---

## Setting Up Recurring Tasks

Automate repetitive tasks with sophisticated recurring patterns.

### Create a Recurring Task

1. Create or open a task
2. In the details panel, find **"Recurrence"**
3. Click **"Set Recurrence"**
4. Choose pattern:
   - **Daily** - Every day or every N days
   - **Weekly** - Specific days of the week
   - **Monthly** - On specific date or last day of month
   - **Monthly on Weekday** - E.g., "First Monday" or "Last Friday"
5. Set options:
   - **Interval** - Every 1 week, every 2 weeks, etc.
   - **Based on** - Completion date or due date
   - **End date** - Optional end to the recurrence
6. Save

### How Recurring Tasks Work

- **Automatic Generation** - New task instances are created based on your pattern
- **Parent-Child Linking** - Generated tasks link back to the original
- **Edit Recurrence** - Change recurrence settings from any instance
- **Complete One, Next Appears** - Completing a task generates the next occurrence

**Example**: "Weekly team meeting" set to recur every Monday
- Complete Monday's task → Next Monday's task is automatically created
- Due date-based: Task always created for upcoming Monday
- Completion-based: Task created 7 days after completion

---

## Creating Notes

Notes capture documentation, ideas, and reference material.

### Standalone Notes

1. Click **"Notes"** in sidebar
2. Click **"+ New Note"**
3. Enter title and content
4. Add tags for organization
5. Optionally attach to a project

### Project Notes

Notes attached to projects serve as documentation:

1. Open a project
2. Click **"Notes"** tab
3. Click **"+ Add Note"**
4. Create note (automatically associated with project)

**Use Cases:**
- Project requirements and specifications
- Meeting notes and decisions
- Research and reference links
- Ideas and brainstorming
- Documentation and how-tos

---

## Managing Your Inbox

The inbox is your capture system for quick ideas, especially from Telegram.

### Processing Inbox Items

1. Click **"Inbox"** in sidebar
2. Review each item
3. For each item, decide:
   - **Convert to Task** - Create a task with this content
   - **Convert to Project** - This needs multiple steps
   - **Convert to Note** - This is reference material
   - **Delete** - Not needed anymore

**Inbox Zero Workflow:**
1. Process inbox daily
2. Don't leave items sitting for more than 24 hours
3. Make quick decisions: task, project, note, or delete
4. Keep inbox empty for mental clarity

---

## Keyboard Shortcuts

Speed up your workflow with keyboard shortcuts:

| Shortcut | Action |
|----------|--------|
| `Ctrl/Cmd + N` | New task |
| `Ctrl/Cmd + K` | Quick search |
| `Ctrl/Cmd + /` | Show keyboard shortcuts |
| `Escape` | Close dialog/panel |
| `Enter` | Save when editing |

> **Tip**: Press `Ctrl/Cmd + /` in the app to see all available shortcuts.

---

## Completing and Archiving Tasks

### Mark a Task Complete

**Quick Method:**
- Click the checkbox next to any task

**Detail Method:**
1. Open task details
2. Click **"Complete"** button
3. Task moves to archive

### Viewing Completed Tasks

1. Open any view (Today, Upcoming, Someday)
2. Click **"Show Completed"** toggle
3. See completed tasks with completion dates

### Archive vs. Delete

- **Complete** - Task is done, keep for reference
- **Archive** - Remove from active views, keep in database
- **Delete** - Permanently remove (can't be undone)

**Best Practice**: Complete tasks when done, archive when no longer relevant, delete only if created by mistake.

---

## Sharing Projects (Team Collaboration)

Invite others to collaborate on projects.

### Share a Project

1. Open a project
2. Click the **Share** button
3. Select a user from the dropdown
4. Choose permission level:
   - **Read only** - Can view, can't edit
   - **Read & write** - Can view and edit
5. Click **"Share"**

The user now sees this project in their projects list!

### Manage Shares

From the Share dialog:
- View all users with access
- See their permission levels
- Revoke access anytime

**Important**: Only the project owner can share or revoke access.

For more details, see the [Project Sharing Guide](/features/project-sharing)

---

## Settings and Preferences

### User Settings

Access via user menu (top right):

- **Profile** - Update name, email, password
- **Preferences** - Default views, sorting, date formats
- **Theme** - Light, dark, or system default
- **Language** - Choose from 24 supported languages

### Telegram Settings

Set up task capture via Telegram:

1. Go to **Settings → Telegram**
2. Enter your Telegram bot token (get from @BotFather)
3. Click **"Setup Telegram"**
4. Start chatting with your bot

Messages to your bot create inbox items automatically!

For detailed setup, see [Telegram Integration](/features/telegram-integration)

---

## Tips for Success

### Start Small
Don't migrate your entire task list on day one. Start with:
1. Today's tasks
2. One active project
3. Your most urgent items

Build your system gradually as you learn the interface.

### Use Areas Wisely
Don't create too many areas. Start with 3-5 major life domains:
- Work
- Personal
- Health

Add more only when genuinely needed.

### Tag Sparingly
Tags are powerful but can become overwhelming. Start with a few essential tags:
- Context tags (`@home`, `@office`)
- Energy tags (`#quick-win`, `#deep-work`)

Add more tags only when you find yourself repeatedly filtering for something.

### Review Weekly
Set up a weekly review routine:
1. Process inbox to zero
2. Review upcoming tasks
3. Update project statuses
4. Archive completed items

This keeps your system clean and trustworthy.

### Recurring Tasks for Routines
Use recurring tasks for:
- Weekly planning sessions
- Monthly reviews
- Regular errands (grocery shopping, etc.)
- Routine maintenance tasks

Automate the routine to focus on the important.

---

## Common Workflows

### Daily Review
```
1. Check "Today" view
2. Process inbox items
3. Mark completed tasks as done
4. Adjust priorities as needed
5. Review tomorrow's tasks in "Upcoming"
```

### Weekly Planning
```
1. Review last week's accomplishments
2. Archive completed projects
3. Check "Upcoming" for next week
4. Adjust project priorities
5. Set 3-5 most important outcomes for the week
6. Create custom view: "This Week's Focus"
```

### Project Kickoff
```
1. Create new project
2. Assign to appropriate area
3. Add project notes with:
   - Goals and objectives
   - Success criteria
   - Resources and links
4. Break down into tasks
5. Set due dates
6. Share with collaborators if needed
```

### Quick Capture (with Telegram)
```
1. Idea comes to mind → Send message to Telegram bot
2. Later: Open tududi inbox
3. Process item: Convert to task/project/note
4. Assign details (project, due date, priority)
5. Delete from inbox
```

---

## Troubleshooting

### Can't see tasks I created
- Check you're in the right view (Today/Upcoming/Someday)
- Tasks without due dates go to "Someday"
- Check filter settings (clear all filters)

### Tasks not appearing in "Today"
- Verify the task has a due date
- Check the due date is today or earlier
- Refresh the page

### Shared project not visible
- Verify you've been given access
- Refresh the page
- Check with the project owner that share was completed

### Lost my password
- Contact your system administrator (if multi-user)
- For self-hosted single-user: Reset via database or create new user with admin privileges

---

## Next Steps

Now that you're familiar with the basics, explore:

- **[Project Sharing](/features/project-sharing)** - Detailed collaboration guide
- **[Telegram Integration](/features/telegram-integration)** - Advanced capture workflows
- **[Hierarchical Organization](/features/hierarchical-organization)** - Advanced organization techniques

## Get Help

- **Discord Community**: [Join Discord](https://discord.gg/fkbeJ9CmcH)
- **Reddit**: [r/tududi](https://www.reddit.com/r/tududi/)
- **GitHub Issues**: [Report bugs or request features](https://github.com/chrisvel/tududi/issues)

Welcome to tududi - start building your perfect productivity system!
