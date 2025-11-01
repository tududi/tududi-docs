---
sidebar_position: 2
---

# Bug Reports

Found a bug? Help us fix it!

## Before Reporting

1. **Search** [existing issues](https://github.com/chrisvel/tududi/issues)
2. **Update** to latest version: `docker pull chrisvel/tududi:latest`
3. **Verify** it's actually a bug (check docs, try fresh install)

## Report on GitHub

Go to [GitHub Issues](https://github.com/chrisvel/tududi/issues) → **New Issue**

## What to Include

### Title
Be specific: "Recurring tasks not creating next instance after completion"

### Description
```markdown
## What happened
When I complete a recurring task set to "Weekly on Monday",
no new instance is created for the next week.

## Steps to reproduce
1. Create task "Weekly meeting"
2. Set recurrence: Weekly on Monday, completion-based
3. Mark complete
4. Refresh page
5. No new task appears

## Expected
New task instance should appear for next Monday

## Environment
- tududi version: v0.85-beta.1
- Deployment: Docker
- OS: Ubuntu 22.04
- Browser: Chrome 120

## Logs
[Paste relevant error messages from console or docker logs]
```

## Common Mistakes

❌ "It doesn't work" → ✅ "Task recurrence not creating new instances"
❌ No version info → ✅ Include tududi version, OS, browser
❌ "I think there's a bug" → ✅ Exact steps to reproduce

## Security Issues

**Email security vulnerabilities to: info@tududi.com**

Do not create public issues for security problems.

## Need Help?

- [Discord](https://discord.gg/fkbeJ9CmcH) #support channel
- [Reddit r/tududi](https://www.reddit.com/r/tududi/)
