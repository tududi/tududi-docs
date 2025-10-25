---
sidebar_position: 4
---

# Telegram Integration

Manage your tasks directly from Telegram with the Tududi bot.

## Setup

### 1. Create a Telegram Bot

1. Open Telegram and search for [@BotFather](https://t.me/botfather)
2. Send `/newbot` command
3. Follow the prompts:
   - Choose a name for your bot (e.g., "My Tududi Bot")
   - Choose a username (e.g., "mytududibot")
4. Save the bot token provided by BotFather

### 2. Configure Tududi

Add your bot token to the `.env` file:

```env
TELEGRAM_BOT_TOKEN=123456789:ABCdefGHIjklMNOpqrsTUVwxyz
TELEGRAM_WEBHOOK_URL=https://your-domain.com/api/telegram/webhook
```

### 3. Set Webhook

Configure the webhook to receive updates:

```bash
curl -X POST "https://api.telegram.org/bot<YOUR_BOT_TOKEN>/setWebhook?url=<YOUR_WEBHOOK_URL>"
```

### 4. Link Your Account

1. Start a chat with your bot in Telegram
2. Send `/start` command
3. Click the authentication link
4. Log in to your Tududi account
5. Authorize the bot

## Bot Commands

### Task Management

#### Create Tasks

```
/newtask Buy groceries
/newtask Call dentist @phone #urgent
```

#### List Tasks

```
/tasks                  # All tasks
/today                  # Today's tasks
/week                   # This week's tasks
/overdue                # Overdue tasks
```

#### Complete Tasks

```
/done 123              # Mark task #123 as done
/complete Buy groceries # Complete by task title
```

#### Search Tasks

```
/search meeting
/search tag:@work
/search priority:high
```

### Project Management

#### List Projects

```
/projects              # List all projects
```

#### Create Projects

```
/newproject Website Redesign
```

### Settings

```
/settings              # View your settings
/language en           # Change language
/timezone UTC          # Set timezone
```

### Help

```
/help                  # Show all commands
/about                 # About the bot
```

## Quick Actions

Use inline buttons for common actions:

```
Task: Buy groceries
[✓ Complete] [Edit] [Delete] [Postpone]
```

## Notifications

Receive notifications for:

- **Due Tasks**: Get reminded about upcoming tasks
- **Overdue Tasks**: Daily summary of overdue items
- **Mentions**: When someone mentions you
- **Comments**: New comments on your tasks

### Configure Notifications

```
/notifications on       # Enable all notifications
/notifications off      # Disable all notifications
/notify due on          # Enable due date reminders
/notify mentions off    # Disable mention notifications
```

## Advanced Features

### Natural Language Input

Create tasks using natural language:

```
/newtask Dentist appointment tomorrow at 2pm #health
```

The bot will:
- Create a task titled "Dentist appointment"
- Set due date to tomorrow at 2:00 PM
- Add the "health" tag

### Quick Capture

Forward messages to your bot to create tasks:

1. Forward any message to your bot
2. The bot will create a task with the message content
3. Edit and organize later

### Voice Messages

Send voice messages to create tasks:

1. Record a voice message
2. Send to your bot
3. The bot transcribes and creates a task

*Note: Voice transcription requires additional setup*

### Location-Based Reminders

Create location-based reminders:

```
/newtask Buy milk
📍 [Send Location]
```

The bot will remind you when you're near the location.

## Inline Mode

Use the bot in any chat:

1. Type `@yourbot` in any Telegram chat
2. Enter search query
3. Select a task to share

This is useful for:
- Sharing tasks with team members
- Quick task lookup
- Cross-referencing tasks in discussions

## Bot Settings

Configure bot behavior:

### Confirmation Messages

```
/set confirmations on   # Ask for confirmation before actions
/set confirmations off  # Perform actions immediately
```

### Default View

```
/set view list         # List view (default)
/set view compact      # Compact view
/set view detailed     # Detailed view
```

### Time Format

```
/set timeformat 24     # 24-hour format
/set timeformat 12     # 12-hour format
```

## Security

### Account Linking

- Each Telegram account can only link to one Tududi account
- Use `/unlink` to disconnect your account
- Reauthorize anytime with `/start`

### Privacy

- Bot only accesses tasks you own
- Messages are not stored on Telegram servers
- All data is encrypted in transit

### Revoking Access

To revoke bot access:

1. In Tududi settings, go to "Connected Apps"
2. Click "Revoke" next to Telegram Bot
3. Or send `/unlink` to the bot

## Troubleshooting

### Bot Not Responding

1. Check if the bot is running: `/start`
2. Verify webhook is set correctly
3. Check logs: `npm run backend:dev`

### Tasks Not Syncing

1. Ensure you're logged in: `/status`
2. Try unlinking and relinking: `/unlink` then `/start`
3. Check network connectivity

### Notifications Not Working

1. Verify notifications are enabled: `/notifications`
2. Check Telegram notification settings
3. Ensure bot has permission to send messages

## Examples

### Daily Workflow

**Morning**:
```
/today
```
Review today's tasks

**Add tasks throughout the day**:
```
/newtask Review pull request #code
/newtask Team meeting at 3pm
```

**End of day**:
```
/done Review pull request
/done Team meeting
```

### Team Collaboration

**Assign tasks**:
```
/assign @john Review design mockups
```

**Mention in comments**:
```
/comment 123 @sarah What do you think?
```

## Next Steps

- [Task Management](/docs/features/task-management) - Learn advanced task features
- [API Reference](/docs/api/overview) - Integrate with the API
- [Guides](/docs/guides/docker-deployment) - Deploy Tududi
