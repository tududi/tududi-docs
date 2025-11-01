---
sidebar_position: 3
---

# Feature Requests

Have an idea to make tududi better? We'd love to hear it! This guide will help you suggest new features or improvements effectively.

## Before Requesting

Before creating a feature request, please:

1. **Check existing requests** - Your idea might already be suggested
   - Visit [GitHub Issues](https://github.com/chrisvel/tududi/issues)
   - Search with label `enhancement` or `feature-request`
   - Check the [Roadmap](https://github.com/users/chrisvel/projects/2) for planned features

2. **Check the documentation** - Feature might already exist
   - Browse the [documentation](/intro)
   - Try the search function (Ctrl/Cmd + K)
   - Ask in [Discord](https://discord.gg/fkbeJ9CmcH) if unsure

3. **Consider the scope** - Is it aligned with tududi's goals?
   - Self-hosted and privacy-focused
   - Simple yet powerful task management
   - Works across devices

## How to Request a Feature

### Create a GitHub Issue

Submit feature requests on our GitHub repository:

1. Go to [GitHub Issues](https://github.com/chrisvel/tududi/issues)
2. Click **"New Issue"**
3. Select **"Feature Request"** template (if available)
4. Fill in all required information

### Feature Request Template

A good feature request should include:

#### 1. **Title**
Clear, concise summary of the feature.

**Good examples:**
- "Add support for task dependencies (blocking tasks)"
- "Allow exporting tasks to CSV/JSON"
- "Integrate with CalDAV for calendar sync"

**Bad examples:**
- "Make it better"
- "Add more features"
- "Calendar"

#### 2. **Problem Statement**
What problem does this solve? Why do you need this feature?

```markdown
## Problem Statement
Currently, I can't see which tasks are blocking other tasks.
For complex projects, I need to know the order of task completion.
Without this, I have to manually track dependencies in task descriptions.
```

#### 3. **Proposed Solution**
How should this feature work? Be specific!

```markdown
## Proposed Solution

### User Interface
- Add a "Dependencies" section in task details panel
- Show a "Depends on" dropdown to select other tasks
- Display blocked tasks with a lock icon in task lists
- Show dependency relationships in a visual graph

### Behavior
- Blocked tasks remain in "Someday" until dependencies are complete
- When a blocking task is completed, notify about unblocked tasks
- Prevent circular dependencies with validation
- Allow multiple dependencies per task

### Example
Task: "Deploy to production"
  Depends on:
    - ✓ "Complete testing" (completed)
    - ⏳ "Security review" (in progress)
  Status: Blocked until all dependencies are complete
```

#### 4. **Alternative Solutions**
What else could work? Show you've thought about options.

```markdown
## Alternatives Considered

1. **Simple text tags**: Use tags like #depends-on-123
   - Pro: Easy to implement
   - Con: No visual representation or automation

2. **Subtask approach**: Make dependencies as subtasks
   - Pro: Uses existing features
   - Con: Changes project structure, not suitable for cross-project dependencies

3. **External tool integration**: Use dedicated project management tools
   - Pro: More features
   - Con: Loses self-hosted privacy benefit
```

#### 5. **Use Cases**
Real-world examples of how you'd use this feature.

```markdown
## Use Cases

### Use Case 1: Software Development
- Task "Deploy app" depends on "Pass CI tests" and "Code review"
- Prevents premature deployment
- Automatically notifies when ready to deploy

### Use Case 2: Event Planning
- Task "Send invitations" depends on "Finalize guest list"
- Task "Book catering" depends on "Get headcount"
- Ensures logical order of planning steps

### Use Case 3: Home Renovation
- Task "Install flooring" depends on "Finish painting"
- Visual timeline shows project flow
- Helps contractors understand order of work
```

#### 6. **Additional Context**
Mockups, screenshots, examples from other tools.

```markdown
## Additional Context

**Similar features in other tools:**
- Asana: Task dependencies with Gantt chart view
- Todoist: "Blocks" relationship between tasks
- Microsoft Project: Critical path analysis

**Mockup:**
[Attach wireframe or sketch showing the UI]

**Impact:**
- Would help: Project managers, developers, event planners
- Complexity: Medium (requires database changes)
- Priority: Nice to have, not critical
```

## Example Feature Requests

### Example 1: Well-Defined Feature Request

```markdown
# Title: Add kanban board view for projects

## Problem Statement
Currently, tasks are displayed only in list view. For visual thinkers
and teams using agile workflows, a kanban board view would make it
easier to see task status at a glance and move tasks between stages.

## Proposed Solution

### Board Structure
- Create customizable columns (e.g., "To Do", "In Progress", "Review", "Done")
- Allow drag-and-drop to move tasks between columns
- Show task cards with title, due date, priority, and assignee
- Toggle between list view and kanban view per project

### Implementation Ideas
- Store column configuration per project
- Map columns to existing status field (0-4)
- Use existing task card components
- Add view toggle in project header

### UI Mockup
[Columns layout sketch]
```
┌─────────────┬─────────────┬─────────────┬─────────────┐
│   To Do     │ In Progress │   Review    │    Done     │
├─────────────┼─────────────┼─────────────┼─────────────┤
│ Task 1      │ Task 4      │ Task 7      │ Task 9      │
│ Task 2      │ Task 5      │ Task 8      │ Task 10     │
│ Task 3      │ Task 6      │             │             │
└─────────────┴─────────────┴─────────────┴─────────────┘
```

## Alternatives Considered

1. **Status tags only**: Just use existing status field
   - Con: No visual workflow, requires changing task details

2. **Third-party integration**: Use Trello or similar
   - Con: Breaks self-hosted benefit, data in multiple places

3. **Project templates**: Pre-configure status values
   - Con: Doesn't provide visual board interface

## Use Cases

### Software Development Team
- Columns: Backlog → In Dev → Code Review → Testing → Done
- Developers drag tasks as they progress
- Team sees bottlenecks at a glance

### Content Creation
- Columns: Ideas → Drafting → Editing → Ready to Publish
- Writers move articles through pipeline
- Editor sees what needs review

### Personal GTD Workflow
- Columns: Someday → Next Actions → Waiting → Done
- Visual separation of contexts
- Easy weekly review process

## Additional Context

**Priority:** Medium - Enhances existing functionality
**Complexity:** Medium - Requires UI work but uses existing data
**Inspiration:** Trello, Notion, GitHub Projects
**Mobile:** Should work on tablets, maybe simplified on phones
```

### Example 2: Small Improvement Request

```markdown
# Title: Add keyboard shortcut to create new task (Ctrl/Cmd + N)

## Problem Statement
Currently, creating a new task requires clicking the "+ New Task" button.
For power users who create many tasks throughout the day, a keyboard
shortcut would significantly speed up workflow.

## Proposed Solution
- Add global keyboard shortcut: `Ctrl + N` (Windows/Linux) or `Cmd + N` (Mac)
- Opens new task creation dialog
- Focus is on task title input
- Can type and press Enter to quickly create task

## Alternatives Considered
- Different shortcut key (e.g., `Ctrl + T` for "task")
- Inline task creation (type in any view)
- Quick capture popup (floating button)

## Use Cases
- Creating tasks from captured notes or emails
- Quick thought capture during meetings
- Batch task creation during planning sessions

## Additional Context
**Priority:** Low - Nice to have quality of life improvement
**Complexity:** Low - Simple keyboard event handler
**Inspiration:** Todoist (Ctrl/Cmd + Q), Things (Cmd + N)
**Note:** Should check for conflicts with browser shortcuts
```

## Feature Request Categories

### UI/UX Improvements
- Visual design changes
- Navigation improvements
- Accessibility features
- Mobile experience

### New Functionality
- Task dependencies
- Time tracking
- File attachments
- Calendar integration

### Integrations
- Email integration
- Calendar sync (CalDAV)
- API webhooks
- Import/export formats

### Performance & Technical
- Faster page loads
- Offline support
- Better search
- Database optimization

## What Happens Next?

### Review Process

1. **Community Discussion** - Others can comment and vote
2. **Maintainer Review** - We'll assess feasibility and fit
3. **Roadmap Consideration** - Popular features added to roadmap
4. **Implementation** - Could be by maintainers or community

### Labels You Might See

- `enhancement` - Accepted feature request
- `wontfix` - Won't be implemented (with explanation)
- `help-wanted` - Open for community contribution
- `needs-discussion` - Needs more input
- `on-roadmap` - Planned for future release
- `duplicate` - Already requested

### Voting

Show support for feature requests:
- 👍 Upvote the issue
- 💬 Comment with your use case
- 🔔 Subscribe to get updates

Popular requests are more likely to be implemented!

## Contributing Implementation

Want to implement your own feature request?

1. Comment on the issue saying you'd like to work on it
2. Wait for maintainer approval to avoid duplicate work
3. Follow the [contributing guide](/community/contributing)
4. Submit a pull request with your implementation

## Tips for Great Feature Requests

### ✅ Do:
- Explain the "why" (problem) before the "what" (solution)
- Provide specific examples and use cases
- Consider different user perspectives
- Include mockups or sketches when helpful
- Be open to alternative approaches
- Check for duplicates first

### ❌ Don't:
- Request features that break privacy/self-hosting principles
- Make demands ("You should add X")
- Be vague about requirements
- Combine multiple unrelated features in one request
- Expect immediate implementation
- Ignore feedback or discussion

## Need Help?

Not sure if your idea is a good fit or need help refining it?

- **Discord**: [#feature-ideas channel](https://discord.gg/fkbeJ9CmcH)
- **Reddit**: [r/tududi](https://www.reddit.com/r/tududi/)
- **GitHub Discussions**: [Start a discussion](https://github.com/chrisvel/tududi/discussions)

## Related Pages

- **[Contributing](/community/contributing)** - Implement features yourself
- **[Bug Reports](/community/bug-reports)** - Report issues
- **[Project Roadmap](https://github.com/users/chrisvel/projects/2)** - See planned features
- **[GitHub Issues](https://github.com/chrisvel/tududi/issues)** - View all requests

Thank you for helping shape the future of tududi! 💡✨
