---
sidebar_position: 2
---

# Configuration

Learn how to configure Tududi for your needs.

## Environment Variables

Tududi uses environment variables for configuration. Create a `.env` file in the root directory:

### Basic Configuration

```env
# Server Configuration
NODE_ENV=production
PORT=3000

# Session Configuration
SESSION_SECRET=your-random-secret-key-here

# Database Configuration
DATABASE_PATH=./tududi.db
```

### Advanced Configuration

```env
# Telegram Bot (Optional)
TELEGRAM_BOT_TOKEN=your-bot-token
TELEGRAM_WEBHOOK_URL=https://your-domain.com/api/telegram/webhook

# CORS Settings
CORS_ORIGIN=http://localhost:3000

# Session Settings
SESSION_MAX_AGE=86400000  # 24 hours in milliseconds
```

## Database Setup

### SQLite (Default)

Tududi uses SQLite by default, which requires no additional setup:

```env
DATABASE_PATH=./tududi.db
```

### PostgreSQL (Optional)

To use PostgreSQL instead:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/tududi
```

## Telegram Bot Configuration

To enable Telegram integration:

1. Create a bot using [@BotFather](https://t.me/botfather)
2. Get your bot token
3. Add to `.env`:

```env
TELEGRAM_BOT_TOKEN=your-bot-token
TELEGRAM_WEBHOOK_URL=https://your-domain.com/api/telegram/webhook
```

4. Set the webhook:

```bash
curl -X POST "https://api.telegram.org/bot<YOUR_BOT_TOKEN>/setWebhook?url=<YOUR_WEBHOOK_URL>"
```

## Multi-language Support

Tududi supports multiple languages out of the box. Language files are located in:

```
frontend/locales/
  ├── en/
  ├── es/
  ├── fr/
  └── ...
```

To add a new language:

1. Create a new directory under `frontend/locales/`
2. Copy translation files from `en/`
3. Translate the content
4. Update `frontend/i18n.ts` to include the new language

## Security Considerations

### Session Secret

Always use a strong, random session secret:

```bash
# Generate a secure random string
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### HTTPS in Production

Always use HTTPS in production. Configure your reverse proxy (nginx, Apache) to handle SSL/TLS.

### Database Backups

Regular backups are essential:

```bash
# Backup SQLite database
npm run db:backup

# Or manually
cp tududi.db tududi.db.backup
```

## Performance Tuning

### Session Store

For better performance in production, consider using Redis for session storage.

### Database Optimization

Regular maintenance:

```bash
# Check database status
npm run db:status

# Optimize database
sqlite3 tududi.db "VACUUM;"
```

## Next Steps

- [First Steps](/docs/getting-started/first-steps) - Start using Tududi
- [Docker Deployment](/docs/guides/docker-deployment) - Deploy with Docker
- [Backup & Restore](/docs/guides/backup-restore) - Backup your data
