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

- **Today** - Your main dashboard with 4 sections: Overdue, Planned, Suggested, and Completed tasks
- **Upcoming** - 7-day view of tasks with future due dates
- **Inbox** - Quick capture area for items awaiting processing (from Telegram or web)
- **Projects** - All your projects
- **Areas** - High-level life/work categories
- **Notes** - Standalone notes and documentation
- **Tags** - Browse by tag

### Top Bar

- **Search** - Universal search across tasks, projects, notes, and tags
- **User Menu** - Access settings, profile, and logout
- **Theme Toggle** - Switch between light and dark mode

---

## Understanding the Today Page

The Today page is your main dashboard, divided into **four intelligent sections**:

### 1. Overdue Section
Tasks past their due date that need attention. A task appears here if:
- Due date is before today
- Not already in the Planned section
- Not completed or cancelled

### 2. Planned Section
Tasks you're actively working on today. Shows tasks with these statuses:
- **In Progress** - Tasks you're actively working on
- **Planned** - Tasks you scheduled to work on
- **Waiting** - Tasks blocked or waiting for something

**Important**: Status matters, not just the due date! A task marked "Planned" appears here even without a due date.

### 3. Suggested Section
Up to 10 tasks automatically recommended for you to work on next, based on:
- Priority (high-priority tasks first)
- Due dates (time-sensitive work)
- Project associations
- Excludes tasks already in other sections

This section is hidden by default but can be enabled in Today Settings.

### 4. Completed Section
Tasks you finished today, sorted by completion time (most recent first). Includes:
- Regular tasks marked as "Done" today
- Recurring tasks completed today
- Weekly completion trend chart

---

## Creating Your First Task

The most basic action in tududi is creating a task.

### Quick Task Creation

1. Click the **"+ New Task"** button (or press `Ctrl/Cmd + N`)
2. Enter a task name, for example: "Buy groceries"
3. Press **Enter** to create

That's it! Your task is created. Without a due date, it won't appear in Today or Upcoming views until you schedule it.

### Adding Task Details

Click on a task to expand its details panel:

- **Due Date** - Click the calendar icon to set a due date
- **Priority** - Set Low (0), Medium (1), or High (2) priority
- **Description** - Add detailed notes about the task
- **Project** - Assign to a project (we'll create one next)
- **Tags** - Add tags for organization
- **Status** - Set task status

**Status Levels:**
- **Not Started (0)**: Default state, task hasn't been worked on yet
- **In Progress (1)**: Task is actively being worked on
- **Done (2)**: Task is completed
- **Archived (3)**: Task is finished and archived for historical record
- **Waiting (4)**: Task is blocked or waiting on something/someone
- **Cancelled (5)**: Task was abandoned or is no longer needed
- **Planned (6)**: Task is scheduled to be worked on

---

## Organizing with Projects

Projects group related tasks together. Perfect for anything with multiple steps.

### Create Your First Project

1. Click **"Projects"** in the sidebar
2. Click **"+ New Project"**
3. Enter a name, for example: "Home Renovation"
4. Optionally set:
   - **Status** - Planned, Not Started, In Progress, Waiting, Done, Cancelled
   - **Description** - Project details
   - **Priority** - Low, Medium, or High
   - **Due Date** - When the project should be completed
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

- **Contexts**: `home`, `office`, `phone`, `computer`
- **Energy Levels**: `quick-win`, `deep-work`, `low-energy`
- **Categories**: `urgent`, `important`, `research`, `creative`
- **Time-based**: `morning`, `evening`, `weekend`

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

1. Go to any task list (Today, Upcoming)
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
- "Quick Wins" - Tasks tagged `quick-win`
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

## Deferring Tasks (Defer Until)

Sometimes you can't work on a task yet, but don't want to see it cluttering your views. **Defer Until** hides tasks until a specific time.

### How Defer Until Works

1. Open a task
2. Set **"Defer Until"** to a future date/time
3. Task disappears from all views until that time
4. When defer time arrives, task automatically reappears

### Defer Until vs. Due Date

They serve different purposes:
- **Defer Until** = "Don't show me this until..." (when to START thinking about it)
- **Due Date** = "This needs to be finished by..." (deadline)

A task can have both! Example:
- Task: "Review contract"
- Defer Until: March 15 (waiting for contract to arrive)
- Due Date: March 20 (needs to be reviewed by this date)

### When to Use Defer Until

- Waiting for information or materials
- Task that can't be started yet ("Call plumber on Monday")
- Postponing a decision ("Remind me in 2 hours")
- Seasonal or future tasks ("Review Q2 goals in April")

**Pro Tip**: Deferred tasks appear in the Upcoming view on the day they become available, helping you plan ahead.

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
2. Change status to **"Done"** or click **"Complete"** button
3. Task moves to Today page's Completed section (if finished today)

### Viewing Completed Tasks

1. Open any view (Today or project detail pages)
2. Click **"Show Completed"** toggle
3. See completed tasks with completion dates

Completed tasks are automatically shown in the Today page's Completed section if finished today.

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
3. Enter the email address of the user you want to share with
4. Choose permission level:
   - **Read only (ro)** - Can view, can't edit
   - **Read & write (rw)** - Can view and edit
5. Click **"Share"**

The user receives a notification and sees this project in their projects list!

**Requirements:**
- The other user must have a tududi account
- Must use exact email address they registered with
- Cannot share with yourself

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

### Today Page Settings

Click the settings icon (⚙️) on the Today page to customize:

- **Show Overdue/Due Today** - Toggle Overdue section visibility (on by default)
- **Show Suggestions** - Toggle Suggested section visibility (off by default)
- **Show Completed** - Toggle Completed section visibility (on by default)
- **Show Metrics** - Toggle task metrics widget (off by default)
- **Show Daily Quote** - Toggle motivational quote (on by default)
- **Show Progress Bar** - Toggle completion progress bar (on by default)

Each section can also be collapsed/expanded - your preference is saved in your browser.

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
- Context tags (`home`, `office`)
- Energy tags (`quick-win`, `deep-work`)

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
1. Check Today page sections:
   - Overdue: Address urgent past-due tasks
   - Planned: Work on tasks in progress
   - Suggested: Pick next tasks to tackle
   - Completed: Review what you accomplished
2. Process inbox items (aim for inbox zero)
3. Mark completed tasks as done
4. Adjust priorities and statuses as needed
5. Review tomorrow's tasks in "Upcoming" (7-day view)
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
- Check you're in the right view (Today/Upcoming/Projects)
- Tasks without due dates won't appear in Today or Upcoming
- View all tasks in the Projects view or search for them
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

## Get Help

- **Discord Community**: [Join Discord](https://discord.gg/fkbeJ9CmcH)
- **Reddit**: [r/tududi](https://www.reddit.com/r/tududi/)
- **GitHub Issues**: [Report bugs or request features](https://github.com/chrisvel/tududi/issues)

Welcome to tududi - start building your perfect productivity system!
