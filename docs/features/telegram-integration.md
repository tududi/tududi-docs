---
sidebar_position: 2
---

# Telegram Integration

tududi's Telegram integration allows you to capture tasks, ideas, and notes directly from Telegram messages. This creates a powerful quick-capture system that works wherever you are.

## Overview

The Telegram integration works by connecting a Telegram bot to your tududi instance. Any message you send to your bot automatically creates an item in your tududi inbox, ready to be processed into tasks, projects, or notes.

**Key Features:**
- **Quick Capture** - Send messages from anywhere, process them later
- **Automatic Inbox Creation** - Every message becomes an inbox item
- **Daily Task Summaries** - Optional notifications with your daily tasks
- **Privacy First** - All data stays on your self-hosted instance
- **No Third Parties** - Direct connection between Telegram and your tududi server

---

## Prerequisites

Before setting up Telegram integration, ensure:

- ✅ tududi is installed and running
- ✅ You have a Telegram account
- ✅ Your tududi server can reach the internet (to access Telegram's API)
- ✅ You're logged into tududi with admin privileges

---

## Creating Your Telegram Bot

### Step 1: Start a Chat with BotFather

1. Open Telegram
2. Search for **@BotFather** (official Telegram bot for creating bots)
3. Start a chat by clicking **Start** or sending `/start`

### Step 2: Create a New Bot

1. Send the command: `/newbot`
2. BotFather will ask for a **name** for your bot
   - Example: "My tududi Bot" or "John's Task Bot"
   - This is the display name users will see
3. BotFather will ask for a **username** for your bot
   - Must end with "bot" (e.g., `mytududi_bot`, `johntasks_bot`)
   - Must be unique across all Telegram
   - Cannot contain spaces or special characters except underscores

### Step 3: Save Your Bot Token

BotFather will respond with a success message containing your bot token:

```
Done! Congratulations on your new bot. You will find it at t.me/mytududi_bot

Use this token to access the HTTP API:
123456789:ABCdefGHIjklMNOpqrSTUvwxyz

Keep your token secure and store it safely, it can be used by anyone to control your bot.
```

**Important:**
- ⚠️ **Copy and save this token immediately**
- ⚠️ **Keep it secret** - anyone with this token can control your bot
- ⚠️ Don't share it publicly or commit it to version control
- 💡 You can always retrieve it later with `/mybots` → select your bot → API Token

---

## Configuring Telegram in tududi

### Step 1: Access Telegram Settings

1. Log into your tududi instance
2. Click your **user menu** (top right corner)
3. Select **Settings**
4. Navigate to the **Telegram** tab

### Step 2: Enter Your Bot Token

1. In the Telegram settings page, find the **Bot Token** field
2. Paste your bot token from BotFather (e.g., `123456789:ABCdefGHIjklMNOpqrSTUvwxyz`)
3. Click **"Setup Telegram"** or **"Save"**

### Step 3: Verify Connection

After saving, tududi will:
- ✅ Validate your bot token with Telegram's API
- ✅ Display your bot's username
- ✅ Show connection status (Connected/Disconnected)
- ✅ Provide a direct link to start chatting with your bot

If the connection is successful, you'll see:
- Bot username (e.g., `@mytududi_bot`)
- Status: **Connected** (usually shown in green)
- A link or button to open your bot in Telegram

---

## Starting to Use Your Bot

### Step 1: Start a Conversation

**Option A: Use the Link from tududi**
- Click the link provided in tududi's Telegram settings
- This opens your bot in Telegram
- Click **Start** to begin the conversation

**Option B: Search in Telegram**
- Open Telegram
- Search for your bot's username (e.g., `@mytududi_bot`)
- Click on your bot
- Click **Start**

### Step 2: Send Your First Message

Simply type any message and send it to your bot:

```
Buy groceries tomorrow
```

### Step 3: Check Your tududi Inbox

1. Return to tududi
2. Click **Inbox** in the sidebar
3. You should see your message as a new inbox item!

**If you don't see it immediately:**
- Wait 30 seconds (polling interval)
- Refresh the page
- Check the Telegram settings for polling status

---

## How It Works

### Message Polling

tududi uses **polling** to check for new messages:

1. **Every 30 seconds**, tududi asks Telegram: "Any new messages?"
2. If yes, Telegram sends the new messages
3. tududi creates inbox items for each message
4. Messages are marked as processed to prevent duplicates

**Technical Details:**
- Polling runs automatically when bot token is configured
- Polling can be paused/resumed from Telegram settings
- Only messages sent after bot setup are captured
- Historical messages are not imported

### Inbox Item Creation

When you send a message to your bot:

```
Message: "Buy groceries tomorrow"
         ↓
Telegram Bot API receives message
         ↓
tududi polls and retrieves message
         ↓
Creates Inbox Item:
  - Content: "Buy groceries tomorrow"
  - Source: Telegram
  - Status: "added"
  - Timestamp: When message was sent
```

### Duplicate Prevention

tududi prevents the same message from creating multiple inbox items by:
- Tracking Telegram message IDs
- Only processing new messages since last poll
- Maintaining update offset to skip old messages

---

## Processing Inbox Items

Messages from Telegram land in your **Inbox** awaiting processing.

### Inbox Workflow

1. **Review** - Open the Inbox and review captured items
2. **Process** - For each item, decide its fate:
   - **Convert to Task** - Create a task with this content
   - **Convert to Project** - This needs multiple steps
   - **Convert to Note** - Reference material or idea
   - **Delete** - Not needed

### Convert to Task

1. Open the inbox item
2. Click **"Convert to Task"** or similar action
3. Task is created with:
   - Name: The message content
   - Due date: Can be set during conversion
   - Project: Can be assigned during conversion
   - Priority: Can be set during conversion
4. Inbox item is marked as processed or deleted

**Pro Tip:** Use natural language in messages:
- "Buy groceries tomorrow" → Sets content, you add due date during processing
- "Call dentist urgent" → Sets content, you mark as high priority
- "Project idea: Home automation" → Convert to project

### Convert to Project

For larger ideas that need multiple tasks:

1. Select inbox item
2. Click **"Convert to Project"**
3. Project is created with message as name/description
4. Add tasks to the project afterward

### Convert to Note

For reference material, ideas, or documentation:

1. Select inbox item
2. Click **"Convert to Note"**
3. Note is created with message content
4. Optionally tag or assign to project

---

## Daily Task Summaries

Enable daily notifications to receive a summary of your tasks via Telegram.

### Enabling Summaries

1. Go to **Settings → Telegram**
2. Find **"Daily Task Summaries"** or **"Task Notifications"**
3. Toggle **Enable**
4. Optionally set:
   - **Summary Time** - When to receive (e.g., 8:00 AM)
   - **Include Completed** - Show completed tasks or not
   - **Summary Type** - Today only, Today + Upcoming, etc.

### What's Included

Daily summaries typically include:
- **Tasks due today**
- **Overdue tasks**
- **Optionally:** Upcoming tasks for next few days
- **Task counts** by status or project

**Example Summary:**
```
📝 Good morning! Here's your day:

Today (3):
• Buy groceries
• Team meeting at 2pm
• Submit expense report

Overdue (1):
• Call dentist ⚠️

Upcoming (2):
• Friday: Weekly planning
• Monday: Project deadline
```

---

## Advanced Usage

### Using Telegram for Different Capture Types

**Quick Tasks:**
```
Send: "Buy milk"
Process: → Task in Inbox
```

**Ideas with Context:**
```
Send: "App feature: Dark mode toggle in settings"
Process: → Note tagged #feature-idea
```

**Project Brainstorming:**
```
Send: "Home renovation - need to:
- Get quotes
- Choose contractor
- Set budget"
Process: → Project with subtasks
```

**Meeting Notes:**
```
Send: "Team meeting notes: Discussed Q1 goals,
assigned tasks, next meeting Feb 15"
Process: → Note attached to project
```

### Inline Processing (if supported)

Some tududi setups may support inline commands in messages:

```
/task Buy groceries due:tomorrow priority:high
/project Home Renovation area:Personal
/note Remember to check discount codes
```

Check your tududi version documentation for inline command support.

---

## Telegram Settings Reference

### Settings Page Overview

**Bot Configuration:**
- **Bot Token** - Your Telegram bot API token
- **Bot Username** - Display name (read-only after setup)
- **Connection Status** - Connected/Disconnected indicator

**Polling Control:**
- **Polling Status** - Active/Paused
- **Start/Stop Polling** - Manual control
- **Last Poll Time** - When tududi last checked for messages
- **Messages Retrieved** - Count of messages processed

**Notifications:**
- **Enable Daily Summaries** - Toggle on/off
- **Summary Time** - When to send (if supported)
- **Summary Content** - What to include

**Bot Link:**
- **Chat with Bot** - Direct link to open bot in Telegram
- **Bot Info** - View bot details on Telegram

---

## Troubleshooting

### Bot Not Receiving Messages

**Symptoms:** Messages sent to bot don't appear in tududi inbox

**Solutions:**

1. **Verify bot token is correct**
   - Go to Settings → Telegram
   - Check bot token matches exactly from BotFather
   - No extra spaces or characters

2. **Ensure you started the conversation**
   - In Telegram, search for your bot
   - Click **Start** to begin conversation
   - Send a test message

3. **Check polling is active**
   - Go to Settings → Telegram
   - Verify polling status shows "Active" or "Running"
   - Try manually starting polling if stopped

4. **Verify server internet access**
   - Ensure your tududi server can reach `api.telegram.org`
   - Check firewall rules
   - Test with: `curl https://api.telegram.org/bot<YOUR_TOKEN>/getMe`

5. **Check server logs**
   - Look for Telegram polling errors
   - Verify polling job is running
   - Check for API rate limit errors

### Messages Not Appearing in Inbox

**Symptoms:** Bot receives messages but inbox stays empty

**Solutions:**

1. **Wait for polling interval**
   - Polling runs every 30 seconds
   - Wait up to 1 minute after sending
   - Refresh the tududi page

2. **Check inbox filters**
   - Ensure no filters are hiding items
   - Try "Show All" in inbox view

3. **Verify inbox permissions**
   - Ensure you're logged in as correct user
   - Bot messages belong to the user who configured the bot

4. **Check for errors in logs**
   - Look for database errors
   - Verify inbox item creation is working

### Bot Setup Failing

**Symptoms:** Error when saving bot token in settings

**Solutions:**

1. **Validate token format**
   - Should look like: `123456789:ABCdefGHIjklMNOpqrSTUvwxyz`
   - Two parts separated by colon `:`
   - First part: numbers only
   - Second part: alphanumeric string
   - No spaces or extra characters

2. **Verify bot exists**
   - Go to @BotFather in Telegram
   - Send `/mybots`
   - Check your bot is listed and active

3. **Check bot wasn't deleted**
   - If you deleted the bot, create a new one
   - Get a new token from BotFather

4. **Test token manually**
   ```bash
   curl https://api.telegram.org/bot<YOUR_TOKEN>/getMe
   ```
   Should return bot information in JSON format

### Daily Summaries Not Arriving

**Symptoms:** Enabled summaries but not receiving messages

**Solutions:**

1. **Verify summaries are enabled**
   - Check Settings → Telegram
   - Ensure toggle is ON

2. **Check summary time**
   - Verify time is set correctly
   - Consider timezone differences

3. **Ensure bot conversation is active**
   - Bot can only send messages if you've started conversation
   - Send a message to your bot first

4. **Check server scheduler**
   - Verify cron job or scheduler is running
   - Check logs for summary generation

### Connection Status Shows "Disconnected"

**Symptoms:** Bot configured but shows as disconnected

**Solutions:**

1. **Re-enter bot token**
   - Go to Settings → Telegram
   - Re-paste token and save

2. **Check server internet connectivity**
   - Verify server can reach Telegram API
   - Check firewall/proxy settings

3. **Verify bot token is still valid**
   - Token may have been revoked
   - Generate new token via @BotFather → /mybots → API Token

---

## Security & Privacy

### Bot Token Security

**Best Practices:**
- ✅ Never share your bot token publicly
- ✅ Don't commit tokens to Git repositories
- ✅ Store securely in environment variables or secure database
- ✅ Rotate tokens periodically for security
- ✅ Revoke and regenerate if compromised

**If Token is Compromised:**
1. Go to @BotFather in Telegram
2. Send `/mybots`
3. Select your bot
4. Click **Revoke Token** or **Regenerate Token**
5. Update tududi with new token

### Message Privacy

**How Your Data is Protected:**
- 🔒 **Self-Hosted** - All messages stay on your tududi server
- 🔒 **No Third Parties** - Direct connection between you and Telegram
- 🔒 **Encrypted in Transit** - HTTPS/TLS to Telegram API
- 🔒 **Private Bot** - Only you can send messages to your bot
- 🔒 **No Data Sharing** - tududi doesn't send data to external services

**Telegram's Bot Privacy:**
- By default, bots only see messages sent directly to them
- Your bot cannot see messages in group chats (unless @mentioned)
- Your bot cannot access your other Telegram conversations
- Only you can message your bot (it's private by default)

### Firewall & Network Security

For production deployments:
- Whitelist Telegram API IP ranges if needed
- Use HTTPS for all communications
- Implement rate limiting on your server
- Monitor for unusual polling activity
- Keep tududi and dependencies updated

---

## Disabling Telegram Integration

### Temporary Disable

**Pause Polling:**
1. Go to Settings → Telegram
2. Click **"Stop Polling"** or **"Pause"**
3. Bot remains configured but won't check for messages

**Resume Later:**
1. Go to Settings → Telegram
2. Click **"Start Polling"** or **"Resume"**

### Permanent Disable

**Remove Bot Token:**
1. Go to Settings → Telegram
2. Clear the bot token field
3. Save settings
4. All Telegram integration stops

**Delete Bot (Optional):**
1. Go to @BotFather in Telegram
2. Send `/mybots`
3. Select your bot
4. Click **Delete Bot**
5. Confirm deletion

**Note:** Deleting the bot from Telegram makes it permanently unavailable. Create a new bot if you want to re-enable later.

---

## Tips for Effective Capture

### Quick Capture Workflow

**Best Practice:**
1. **Capture fast** - Send messages without thinking too much
2. **Process regularly** - Review inbox daily or twice daily
3. **Keep messages short** - One thought per message
4. **Process to zero** - Don't let inbox pile up

### Message Templates

Create mental templates for common captures:

**Tasks:**
- "ACTION: what to do"
- Example: "Call dentist about appointment"

**Ideas:**
- "IDEA: description"
- Example: "IDEA: Blog post about productivity"

**Notes:**
- "NOTE: information"
- Example: "NOTE: Discount code ABC123 expires March 1"

**Reminders:**
- "REMINDER: what to remember when"
- Example: "REMINDER: Pick up package tomorrow"

### Integration with Daily Routine

**Morning:**
- Receive daily summary
- Review today's tasks
- Add anything urgent via Telegram

**Throughout Day:**
- Capture ideas as they come
- Send quick tasks that pop up
- Note important information

**Evening:**
- Review inbox
- Process captured items
- Clean up completed tasks

### Voice Messages

Some Telegram setups support voice messages:
1. Send voice message to bot
2. Telegram converts to text (if speech-to-text enabled)
3. Text appears in tududi inbox

Check your Telegram and tududi version for voice support.

---

## Next Steps

Now that you have Telegram integration set up:

- **[First Steps](/getting-started/first-steps)** - Learn to process inbox items effectively
- **[Project Sharing](/features/project-sharing)** - Collaborate with your team
- **[Configuration](/getting-started/configuration)** - Advanced tududi configuration

---

## Get Help

**Having issues with Telegram integration?**

- **Discord Community**: [Join Discord](https://discord.gg/fkbeJ9CmcH)
- **Reddit**: [r/tududi](https://www.reddit.com/r/tududi/)
- **GitHub Issues**: [Report bugs](https://github.com/chrisvel/tududi/issues)

**Telegram Bot Issues:**
- Check @BotFather for bot status
- Verify your bot is active and not deleted
- Test token with Telegram API directly
