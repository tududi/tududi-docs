---
sidebar_position: 2
---

# Hierarchical Organization

Organize your tasks and projects in a hierarchical structure that mirrors your workflow.

## Understanding the Hierarchy

Tududi supports unlimited nesting levels:

```
📁 Company
  ├── 📁 Marketing Department
  │   ├── 📁 Q4 Campaign
  │   │   ├── 📝 Design Assets
  │   │   │   ├── ✅ Create Logo
  │   │   │   └── 📝 Design Banner
  │   │   └── 📝 Launch Campaign
  │   └── 📁 Social Media
  └── 📁 Engineering
      ├── 📁 Frontend
      └── 📁 Backend
```

## Projects

Projects are containers for related tasks and can contain:

- Tasks
- Subtasks
- Other projects (nested projects)
- Files and documents
- Project-specific settings

### Creating Projects

1. Click "New Project" in the sidebar
2. Enter project details:
   - Name
   - Description
   - Color (for visual organization)
   - Icon (optional)
3. Click "Create"

### Project Views

Choose how to view your project:

- **List View**: Classic task list
- **Board View**: Kanban-style columns
- **Timeline View**: Gantt chart for scheduling
- **Calendar View**: See tasks by date

## Nested Tasks

Create subtasks to break down complex work:

### Creating Subtasks

1. Select a parent task
2. Click "Add Subtask"
3. Enter subtask details

### Managing Subtasks

- **Completion**: Parent tasks show progress based on subtask completion
- **Dependencies**: Link subtasks with dependencies
- **Reordering**: Drag and drop to reorder

### Example Structure

```
📝 Build Website (0/4 completed)
  ├── 📝 Design (0/2)
  │   ├── ✅ Wireframes
  │   └── 📝 Mockups
  ├── 📝 Development (0/3)
  │   ├── 📝 Frontend
  │   ├── 📝 Backend
  │   └── 📝 Database
  ├── 📝 Testing
  └── 📝 Deployment
```

## Moving Tasks

### Between Projects

Drag and drop tasks between projects:

1. Click and hold a task
2. Drag to target project
3. Drop to move

Or use the task menu:

1. Right-click task
2. Select "Move to..."
3. Choose destination project

### Reordering

Organize tasks by priority:

1. Drag tasks up or down in the list
2. Order is preserved automatically
3. Use "Sort by" for automatic ordering

## Organizational Strategies

### GTD (Getting Things Done)

```
📁 Inbox (capture everything)
📁 Next Actions (actionable tasks)
📁 Projects (multi-step outcomes)
📁 Waiting For (delegated tasks)
📁 Someday/Maybe (future ideas)
```

### PARA Method

```
📁 Projects (active work)
📁 Areas (ongoing responsibilities)
📁 Resources (reference materials)
📁 Archives (completed items)
```

### Agile/Scrum

```
📁 Product Backlog
📁 Sprint Planning
  ├── 📁 Sprint 1
  ├── 📁 Sprint 2
  └── 📁 Sprint 3
📁 In Progress
📁 Done
```

## Bulk Operations

Organize multiple items at once:

### Bulk Move

1. Select multiple tasks (Ctrl/Cmd + Click)
2. Right-click selection
3. Choose "Move to..."
4. Select destination

### Bulk Tag

Add tags to multiple items:

1. Select tasks
2. Click "Add Tags"
3. Enter or select tags
4. Apply to all selected

## Archiving

Keep your workspace clean:

### Archive Projects

1. Right-click project
2. Select "Archive"
3. Project moves to archive
4. Can be restored anytime

### Archive Completed Tasks

Automatically archive completed tasks:

1. Settings → Organization
2. Enable "Auto-archive completed tasks"
3. Set time period (e.g., after 30 days)

## Templates

Create project templates for recurring work:

### Creating Templates

1. Set up a project with desired structure
2. Right-click project
3. Select "Save as Template"
4. Name your template

### Using Templates

1. Click "New Project"
2. Select "From Template"
3. Choose template
4. Customize as needed

### Example Templates

**Software Project Template**:
```
📁 Project Name
  ├── 📁 Planning
  │   ├── 📝 Requirements gathering
  │   ├── 📝 Architecture design
  │   └── 📝 Sprint planning
  ├── 📁 Development
  │   ├── 📝 Frontend
  │   ├── 📝 Backend
  │   └── 📝 Database
  ├── 📁 Testing
  │   ├── 📝 Unit tests
  │   ├── 📝 Integration tests
  │   └── 📝 E2E tests
  └── 📁 Deployment
      ├── 📝 Staging
      └── 📝 Production
```

## Next Steps

- [Task Management](/docs/features/task-management) - Master task management
- [Multi-language Support](/docs/features/multi-language) - Work in any language
- [API Reference](/docs/api/overview) - Automate with the API
