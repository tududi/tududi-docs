---
sidebar_position: 2
---

# Reporting Bugs

Found a bug in tududi? Thank you for helping us improve! This guide will help you report bugs effectively so we can fix them quickly.

## Before Reporting

Before creating a bug report, please:

1. **Check existing issues** - Your bug might already be reported
   - Visit [GitHub Issues](https://github.com/chrisvel/tududi/issues)
   - Search for keywords related to your bug
   - Check both open and closed issues

2. **Verify it's a bug** - Make sure it's not expected behavior
   - Check the [documentation](/getting-started/quick-start)
   - Try reproducing on a fresh installation
   - Clear browser cache and try again

3. **Update to latest version** - Ensure you're running the latest release
   - Pull the latest Docker image: `docker pull chrisvel/tududi:latest`
   - Check [releases](https://github.com/chrisvel/tududi/releases) for your version

## How to Report a Bug

### Create a GitHub Issue

Report bugs on our GitHub repository:

1. Go to [GitHub Issues](https://github.com/chrisvel/tududi/issues)
2. Click **"New Issue"**
3. Select **"Bug Report"** template (if available)
4. Fill in all required information

### Bug Report Template

A good bug report should include:

#### 1. **Title**
Clear, concise description of the issue.

**Good examples:**
- "Recurring tasks not creating next instance after completion"
- "Telegram notifications fail to send with special characters"
- "Dark mode toggle not persisting after page reload"

**Bad examples:**
- "It doesn't work"
- "Bug in tasks"
- "Error"

#### 2. **Description**
Detailed explanation of what's wrong.

```markdown
## Description
When I complete a recurring task that recurs every Monday,
the next instance is not automatically created. The task
just marks as complete and disappears from my task list.
```

#### 3. **Steps to Reproduce**
Exact steps to reproduce the bug. Be specific!

```markdown
## Steps to Reproduce
1. Create a new task: "Weekly team meeting"
2. Set recurrence to "Weekly on Monday"
3. Set recurrence type to "Completion-based"
4. Mark the task as complete on Monday
5. Refresh the page
6. Check the task list for next Monday

**Expected:** New task instance appears for next Monday
**Actual:** No new task is created, original task is just completed
```

#### 4. **Expected Behavior**
What should happen?

```markdown
## Expected Behavior
After completing the recurring task, a new instance should
automatically be created for the next Monday with the same
title, description, and recurrence settings.
```

#### 5. **Actual Behavior**
What actually happens?

```markdown
## Actual Behavior
The task is marked as complete and no new instance is created.
The task disappears from "Today" and "Upcoming" views.
```

#### 6. **Environment Information**
Help us reproduce your environment.

```markdown
## Environment
- **tududi Version:** v0.85-beta.1 (check in Settings → About)
- **Deployment Method:** Docker / Source / Docker Compose
- **Operating System:** Ubuntu 22.04 / macOS 14 / Windows 11
- **Browser:** Chrome 120 / Firefox 121 / Safari 17
- **Database:** SQLite (default) / PostgreSQL
- **Node.js Version:** 20.10.0 (if running from source)
```

#### 7. **Screenshots**
Visual aids help a lot!

```markdown
## Screenshots
[Attach screenshots showing:]
- The issue occurring
- Console errors (F12 → Console tab)
- Network errors (F12 → Network tab)
- Configuration settings
```

#### 8. **Logs**
Server and console logs are very helpful.

**Backend logs:**
```bash
# Docker logs
docker logs <container-name>

# Or if running from source
npm run backend:dev
# Copy relevant error output
```

**Browser console:**
```markdown
1. Open DevTools (F12)
2. Go to Console tab
3. Look for errors (red text)
4. Copy and paste error messages
```

#### 9. **Additional Context**
Any other relevant information.

```markdown
## Additional Context
- This started happening after updating to v0.85
- Only occurs when using completion-based recurrence
- Works fine with due-date-based recurrence
- Happens on both desktop and mobile
```

## Example Bug Reports

### Example 1: Good Bug Report

```markdown
# Title: Project sharing permissions not persisting after page refresh

## Description
When I share a project with read-only access and refresh the page,
the shared user gains read-write access instead.

## Steps to Reproduce
1. Create a new project "Test Project"
2. Click Share button
3. Add user "user@example.com" with "Read only" permission
4. Click "Share"
5. Refresh the page (F5)
6. Check sharing settings again

## Expected Behavior
User should maintain read-only access after page refresh.

## Actual Behavior
User permission changes to read-write after refresh.

## Environment
- tududi Version: v0.85-beta.1
- Deployment: Docker
- OS: Ubuntu 22.04
- Browser: Chrome 120.0.6099.109
- Database: SQLite

## Screenshots
[Screenshot 1: Before refresh showing read-only]
[Screenshot 2: After refresh showing read-write]

## Console Logs
```
GET /api/projects/123/shares 200 OK
Response: { "shares": [{ "email": "user@example.com", "permission": 2 }] }
// permission: 2 should be 1 for read-only
```

## Additional Context
- Happens with all projects
- Persists even after clearing browser cache
- Works correctly if I don't refresh
```

### Example 2: Security-Related Bug

```markdown
# Title: [SECURITY] Telegram bot token visible in client-side JavaScript

## Description
⚠️ SECURITY ISSUE ⚠️

The Telegram bot token is exposed in client-side JavaScript bundle,
allowing anyone to inspect the page source and extract it.

## Steps to Reproduce
1. Configure Telegram integration
2. Open DevTools → Sources
3. Search for "TELEGRAM_BOT_TOKEN"
4. Token is visible in minified JS

## Impact
- Anyone can extract and use the bot token
- Unauthorized users could send messages via the bot
- Bot could be compromised

## Suggested Fix
Move token to backend environment variables only.

## Environment
- tududi Version: v0.84
- Browser: Any
- Deployment: Docker

## Additional Context
This is a critical security vulnerability. Please handle privately.
I have emailed info@tududi.com with full details.
```

## Common Issues

### Issue: "It doesn't work"
**Problem:** Too vague
**Solution:** Be specific about what doesn't work and what you expected

### Issue: Missing environment details
**Problem:** We can't reproduce without knowing your setup
**Solution:** Always include tududi version, deployment method, OS, and browser

### Issue: No steps to reproduce
**Problem:** We can't fix what we can't reproduce
**Solution:** Provide exact, numbered steps

### Issue: Screenshot of text instead of copy-paste
**Problem:** We can't search or copy error messages
**Solution:** Copy and paste text errors, use screenshots for visual issues only

## After Reporting

### What Happens Next?

1. **Issue Triage** - Maintainers will review and label your issue
2. **Reproduction** - We'll try to reproduce the bug
3. **Questions** - We might ask for more information
4. **Fix** - The bug will be assigned and fixed
5. **Release** - Fix will be included in the next release

### Labels You Might See

- `bug` - Confirmed bug
- `needs-info` - We need more information from you
- `cannot-reproduce` - We couldn't reproduce the issue
- `duplicate` - Already reported elsewhere
- `wontfix` - Won't be fixed (with explanation)
- `security` - Security-related issue
- `priority-high` - Will be fixed soon
- `good-first-issue` - Good for new contributors

## Need Help?

If you're not sure if something is a bug or need help reporting:

- **Discord**: [Join our server](https://discord.gg/fkbeJ9CmcH) → #support
- **Reddit**: [r/tududi](https://www.reddit.com/r/tududi/)
- **GitHub Discussions**: [Ask questions](https://github.com/chrisvel/tududi/discussions)

## Related Pages

- **[Contributing](/community/contributing)** - Want to fix bugs yourself?
- **[Feature Requests](/community/feature-requests)** - Suggest improvements
- **[GitHub Issues](https://github.com/chrisvel/tududi/issues)** - View all issues

Thank you for helping make tududi better! 🐛🔨
