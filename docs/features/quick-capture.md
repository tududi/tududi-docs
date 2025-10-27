---
sidebar_position: 3
---

# Quick Capture

Quick Capture is tududi's powerful system for capturing tasks, ideas, and notes with minimal friction. Using simple syntax with `#` tags and `+` projects, combined with intelligent AI suggestions, you can organize thoughts faster than ever.

## Overview

Quick Capture allows you to:
- 📝 **Capture fast** - Type naturally and let tududi organize
- 🏷️ **Tag instantly** - Use `#` to categorize on the fly
- 📁 **Assign projects** - Use `+` to file items immediately
- 🤖 **AI assistance** - Intelligent suggestions based on your text
- ⚡ **Auto-convert** - Tasks and notes created automatically

**Where Quick Capture Works:**
- Inbox (manual capture)
- Telegram messages (automatic inbox creation)
- Task creation modal
- Note creation modal

---

## Basic Syntax

### Tags with `#`

Use the hashtag symbol to add tags to your captures.

**Format:**
```
#tagname
```

**Rules:**
- Tags can contain letters, numbers, underscores, and hyphens
- No spaces allowed (use underscores or hyphens instead)
- Multiple tags must be consecutive to be recognized
- Tags are case-sensitive

**Examples:**
```
Buy groceries #shopping #home
→ Tags: shopping, home
→ Content: "Buy groceries"

Call dentist #urgent #health_care
→ Tags: urgent, health_care
→ Content: "Call dentist"

#work #meeting Prepare presentation
→ Tags: work, meeting
→ Content: "Prepare presentation"
```

**Important:** Tags must be grouped together:
```
✅ WORKS: #work #urgent Complete report
✅ WORKS: Complete report #work #urgent

❌ DOESN'T WORK: #work Complete #urgent report
   (Second tag won't be recognized)
```

---

### Projects with `+`

Use the plus symbol to assign captures to projects.

**Format:**
```
+projectname
+"Project Name with Spaces"
```

**Rules:**
- Project names without spaces: `+projectname`
- Project names with spaces: Use quotes `+"Project Name"`
- Multiple projects can be specified, but only the first is used
- Projects must be consecutive with tags to be recognized

**Examples:**
```
Fix bug in login +development
→ Project: development
→ Content: "Fix bug in login"

Schedule meeting +"Team Project" #work
→ Project: Team Project
→ Tags: work
→ Content: "Schedule meeting"

#urgent +work Review pull requests
→ Project: work
→ Tags: urgent
→ Content: "Review pull requests"
```

**Auto-Creation:**
If you reference a project that doesn't exist, tududi automatically creates it for you. No need to pre-create projects!

---

### Combined Syntax

Tags and projects work together seamlessly.

**Format:**
```
#tag1 #tag2 +project Your capture text here
```

**Examples:**
```
#shopping #urgent +home Buy milk before store closes
→ Tags: shopping, urgent
→ Project: home
→ Content: "Buy milk before store closes"

+"Work Presentation" #slides #deadline Finish Q4 report
→ Project: Work Presentation
→ Tags: slides, deadline
→ Content: "Finish Q4 report"

Review budget #finance #monthly +"Personal Finance"
→ Tags: finance, monthly
→ Project: Personal Finance
→ Content: "Review budget"
```

---

## Intelligent Suggestions

tududi uses Natural Language Processing (NLP) to analyze your captures and suggest the best action.

### How It Works

When you type a capture, tududi analyzes:
1. **Action verbs** - Does it start with a verb like "buy", "call", "fix"?
2. **URLs** - Does it contain a web link?
3. **Context** - Tags and project references

Based on this analysis, tududi suggests:
- **Create as Task** - Action-oriented captures
- **Create as Note** - Reference material or bookmarks
- **Save to Inbox** - Items needing more thought

### Task Detection

**What Makes a Task:**
tududi looks for action verbs at the start of your capture:
- Buy, Call, Send, Write, Create, Fix, Update, Schedule, etc.

**Examples:**
```
Buy groceries #shopping
→ Suggestion: CREATE AS TASK
→ Reason: Starts with action verb "Buy"

Call dentist tomorrow #health
→ Suggestion: CREATE AS TASK
→ Reason: Starts with action verb "Call"

Fix the broken link in footer +website
→ Suggestion: CREATE AS TASK
→ Reason: Starts with action verb "Fix"
```

**What's NOT a Task:**
```
Thinking about redesigning the website
→ Suggestion: SAVE TO INBOX
→ Reason: Starts with "Thinking" (not an action verb)

The meeting notes from yesterday
→ Suggestion: SAVE TO INBOX
→ Reason: Starts with "The" (not a verb)
```

### Note Detection

**What Makes a Note:**
tududi suggests creating a note when:
- Your capture contains a URL
- You use the `#bookmark` tag

**Examples:**
```
https://example.com/article #research
→ Suggestion: CREATE AS NOTE
→ Reason: Contains URL
→ Auto-tagged: #bookmark

Check out this tool https://tool.com
→ Suggestion: CREATE AS NOTE
→ Reason: Contains URL

Great article about productivity #bookmark
→ Suggestion: CREATE AS NOTE
→ Reason: #bookmark tag present
```

### Action Verbs Reference

tududi recognizes these action verbs (and many more):

**Common Actions:**
- Buy, Call, Send, Email, Write, Read
- Create, Make, Build, Design, Develop
- Fix, Update, Change, Modify, Edit
- Schedule, Plan, Organize, Arrange
- Check, Review, Verify, Confirm
- Research, Learn, Study, Practice

**Excluded (Not Actions):**
- Be, Have, Do, Will, Can, Should (auxiliary verbs)
- Think, Wonder, Consider (thoughts, not actions)

---

## Quick Capture Workflow

### 1. Capture from Inbox

**Steps:**
1. Click **"Inbox"** in sidebar
2. Click **"+ New Inbox Item"** or similar button
3. Type your capture using `#` and `+` syntax
4. Watch real-time suggestions appear
5. Click suggested action or choose manually

**Example Session:**
```
Type: "Buy milk #shopping +home"
→ Real-time analysis shows:
  - Tags: shopping
  - Project: home
  - Suggestion: Create as Task
→ Click "Create Task" or press Enter
→ Task created automatically, inbox stays clean
```

### 2. Capture from Telegram

**Steps:**
1. Send message to your Telegram bot
2. Message appears in tududi inbox automatically
3. Open inbox and review item
4. Process with one click using suggestions

**Example:**
```
Telegram message: "#urgent +work Fix production bug"
→ Appears in inbox within 30 seconds
→ Open tududi inbox
→ Suggestion: Create as Task in "work" project
→ Click to convert
→ Done!
```

### 3. Direct Task Creation

You can also use quick capture syntax when creating tasks directly:

**Steps:**
1. Click **"+ New Task"**
2. Enter: `#urgent +project Call client about proposal`
3. Tags and project are automatically parsed
4. Task created with all metadata

---

## Advanced Techniques

### Templated Captures

Create mental templates for recurring capture types:

**Morning Planning:**
```
#planning +daily Review priorities and schedule
#planning +daily Check email and respond to urgent items
#planning +daily Prepare for 9am meeting
```

**Meeting Capture:**
```
#meeting +work +"Q1 Planning" Discuss budget allocation
#meeting #action-items +work Follow up with Sarah on timeline
```

**Idea Capture:**
```
#idea +future App feature: Dark mode toggle
#idea #research Look into GraphQL for API
```

### URL Bookmarking

Quickly save articles and resources:

```
https://example.com/productivity-tips #productivity #bookmark
→ Creates note with link
→ Auto-tagged with #bookmark
→ Easily searchable later

Great tutorial https://tutorial.com #learning +"Study Resources"
→ Note in "Study Resources" project
→ Tagged for easy retrieval
```

### Context-Based Tagging

Use tags to add context to tasks:

**Location:**
```
#home #office #phone #computer #errands
```

**Energy Level:**
```
#quick-win #deep-work #low-energy #high-focus
```

**Time Blocks:**
```
#morning #afternoon #evening #weekend
```

**Priority:**
```
#urgent #important #someday #waiting
```

**Example:**
```
#quick-win #phone Call pharmacy +health
→ Quick task, can do by phone
→ Easy to filter for 5-minute phone tasks
```

### Batch Processing

Capture multiple items quickly, process later:

**Capture Phase (Fast):**
```
Buy eggs #shopping
Call mom #personal
Fix header bug +website #urgent
Review contract #work
https://article.com #read-later
```

**Process Phase (Thoughtful):**
- Open inbox
- Review suggestions
- Convert each to task/note
- Assign due dates if needed
- Adjust priorities

---

## Best Practices

### Do's

✅ **Capture immediately** - Don't overthink, just capture
✅ **Use consistent tags** - Stick to a core set of tags
✅ **Start with verbs** - "Buy groceries" not "Groceries to buy"
✅ **Group tags together** - All tags at start or end
✅ **Trust suggestions** - tududi's AI is usually right
✅ **Process regularly** - Don't let inbox pile up

### Don'ts

❌ **Don't perfect while capturing** - Capture fast, refine later
❌ **Don't create too many tags** - More tags = harder to find things
❌ **Don't split tags** - `#work text #urgent` won't parse second tag
❌ **Don't use spaces in tags** - Use `#quick_win` not `#quick win`
❌ **Don't ignore suggestions** - They're based on NLP analysis

---

## Real-World Examples

### Morning Routine

```
#planning +daily Review today's schedule
#planning +daily Process inbox to zero
#email #morning Reply to urgent emails
```

### Work Captures

```
#meeting +work Prepare for client presentation
Fix login bug +"Website Project" #urgent #development
#research Look into React 18 features
https://docs.react.dev/blog/2024/04/25 #react #bookmark
```

### Personal Life

```
#shopping +home Buy birthday gift for Sarah
#health Call dentist to schedule cleaning
#finance Review monthly budget +"Personal Finance"
#someday Plan summer vacation #ideas
```

### Learning & Development

```
#learning +"JavaScript Course" Complete module 5
https://tutorial.com/advanced-js #javascript #bookmark
#practice Build a todo app using hooks +"Side Projects"
```

---

## Quick Reference

### Syntax Cheat Sheet

| Syntax | Purpose | Example |
|--------|---------|---------|
| `#tag` | Add tag | `#urgent Buy milk` |
| `+project` | Assign to project | `+home Clean garage` |
| `+"Project Name"` | Project with spaces | `+"Work Tasks" Review PR` |
| `#tag1 #tag2 +project` | Combined | `#work #urgent +development Fix bug` |

### Common Patterns

```
# Quick task
Buy milk #shopping

# Task in project
Fix bug +development

# Tagged task in project
#urgent +work Review contract

# Multiple tags
#work #meeting #action Prepare slides

# Note with URL
https://example.com #bookmark

# Complex capture
#urgent #work +"Q1 Planning" Review budget before meeting
```

---

## Troubleshooting

### Tags Not Being Recognized

**Problem:** Tags aren't being parsed

**Solutions:**
- Ensure no spaces in tag names (use `#quick_win` not `#quick win`)
- Group all tags together (don't split with text)
- Check for special characters (only letters, numbers, `_`, `-` allowed)

**Example:**
```
❌ Buy #urgent milk #shopping
   → Only #urgent recognized

✅ #urgent #shopping Buy milk
   → Both tags recognized
```

### Projects Not Auto-Creating

**Problem:** Project referenced but not created

**Solutions:**
- Use quotes for projects with spaces: `+"Project Name"`
- Ensure project name is valid (letters, numbers, spaces, `_`, `-`)
- Check that you have permission to create projects

### Suggestions Not Appearing

**Problem:** No intelligent suggestions shown

**Solutions:**
- Wait a moment (300ms delay before analysis)
- Ensure you have internet connection (if using external NLP)
- Try starting with a clear action verb
- Check that text is not empty

### Wrong Suggestion Type

**Problem:** Task suggested when you want a note (or vice versa)

**Solutions:**
- Manually select the correct type (override suggestion)
- Add `#bookmark` to force note creation for URLs
- Rephrase to start with action verb for tasks
- Suggestions are just suggestions - you always have control

---

## Integration with Workflows

### GTD (Getting Things Done)

```
# Capture (Inbox)
#inbox Random thought about project structure

# Clarify (Process)
#work +development Refactor project structure
  → Converted to task with context

# Organize (Tag & Project)
Already done via quick capture!

# Review (Weekly)
Filter by #work, review all work tasks

# Engage (Do)
Use tags to filter by context (#office, #phone, etc.)
```

### Pomodoro Technique

```
#focus #pomodoro +writing Write blog post draft
  → Tag with #focus for focused work sessions
  → Filter for #pomodoro tasks during work blocks
```

### Time Blocking

```
#morning #quick-win +email Process inbox
#afternoon #deep-work +development Code new feature
#evening #low-energy +admin Review weekly reports
```

---

## Keyboard Shortcuts

Speed up capture with shortcuts:

| Shortcut | Action |
|----------|--------|
| `Ctrl/Cmd + N` | New capture (from anywhere) |
| `#` | Start typing tag |
| `+` | Start typing project |
| `Enter` | Submit capture |
| `Escape` | Cancel capture |
| `Ctrl/Cmd + Enter` | Force create as task |

---

## Mobile Quick Capture

Quick capture works seamlessly on mobile:

**Telegram (Best for Mobile):**
- Send message from anywhere
- Process later on desktop or mobile
- No app switching required

**Mobile Web Interface:**
- Quick capture button always accessible
- Tags and projects autocomplete
- Suggestions work on mobile too
- Swipe actions for processing

---

## Tips for Power Users

### 1. Create Tag Shortcuts

Develop muscle memory for common tag combinations:

```
#w = #work
#wm = #work #meeting
#wu = #work #urgent
#qw = #quick-win
```

### 2. Project Naming Convention

Use consistent project naming:
- `+work-client-projectname` for work
- `+home-category` for personal
- `+learn-topic` for learning

### 3. Templated Daily Captures

Create recurring captures for daily routines:

```
#planning +daily Morning review
#planning +daily Evening review
#health +daily Log meals
#health +daily Exercise
```

### 4. Batch Similar Captures

Capture related items in sequence:

```
#shopping +home Buy milk
#shopping +home Buy eggs
#shopping +home Buy bread
```

Process all at once, create shopping list project.

### 5. Use Inbox as Thought Dump

Don't overthink during capture:
- Brain dump everything to inbox
- Use minimal tagging during capture
- Process and refine during dedicated inbox review
- Trust the suggestions during processing

---

## Caveats & Limitations

### Tag Parsing

⚠️ **Caveat:** Tags must be consecutive to be recognized

```
❌ #work Complete the #urgent report
   → Only #work is recognized

✅ #work #urgent Complete the report
   → Both tags recognized
```

**Why:** This allows natural mixing of tags with text while maintaining parsing simplicity.

### Project References

⚠️ **Caveat:** Only the first project reference is used

```
#work +project1 +project2 Do the thing
→ Only assigned to: project1
→ project2 is ignored
```

**Why:** Tasks can only belong to one project in tududi.

### Quoted Project Names

⚠️ **Caveat:** Spaces require quotes

```
❌ +Work Project Do something
   → Project: "Work" (space breaks parsing)

✅ +"Work Project" Do something
   → Project: "Work Project"
```

**Workaround:** Use underscores or hyphens: `+Work_Project`

### NLP Limitations

⚠️ **Caveat:** Verb detection isn't perfect

```
"Being productive today"
→ Might not suggest task (starts with "Being", not clear action)

"Plan the meeting"
→ Correctly suggests task (starts with "Plan", action verb)
```

**Workaround:** You can always manually choose task/note type, suggestions are just helpers.

---

## Next Steps

Master quick capture and explore:

- **[First Steps](/getting-started/first-steps)** - Complete workflow guide
- **[Telegram Integration](/features/telegram-integration)** - Mobile capture setup
- **[Project Sharing](/features/project-sharing)** - Collaborate with your team

---

## Get Help

**Questions about quick capture?**

- **Discord Community**: [Join Discord](https://discord.gg/fkbeJ9CmcH)
- **Reddit**: [r/tududi](https://www.reddit.com/r/tududi/)
- **GitHub Issues**: [Report bugs or request features](https://github.com/chrisvel/tududi/issues)

Happy capturing! 🚀
