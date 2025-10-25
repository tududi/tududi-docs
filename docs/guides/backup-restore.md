---
sidebar_position: 3
---

# Backup & Restore

Protect your data with regular backups.

## Why Backup?

Regular backups protect against:
- Hardware failures
- Data corruption
- Accidental deletion
- Software bugs
- Security incidents

## Backup Strategies

### Manual Backups

#### SQLite Database

```bash
# Stop the application
npm run backend:stop

# Copy database file
cp tududi.db tududi-backup-$(date +%Y%m%d).db

# Restart application
npm run backend:start
```

#### File Uploads

```bash
# Backup uploaded files
tar -czf uploads-backup-$(date +%Y%m%d).tar.gz uploads/
```

### Automated Backups

Create a backup script:

```bash
#!/bin/bash
# backup.sh

BACKUP_DIR="$HOME/tududi-backups"
DATE=$(date +%Y%m%d-%H%M%S)

mkdir -p "$BACKUP_DIR"

# Backup database
cp tududi.db "$BACKUP_DIR/tududi-$DATE.db"

# Backup uploads
tar -czf "$BACKUP_DIR/uploads-$DATE.tar.gz" uploads/

# Keep only last 30 days
find "$BACKUP_DIR" -name "*.db" -mtime +30 -delete
find "$BACKUP_DIR" -name "*.tar.gz" -mtime +30 -delete

echo "Backup completed: $DATE"
```

Schedule with cron:

```bash
# Edit crontab
crontab -e

# Run backup daily at 2 AM
0 2 * * * /path/to/backup.sh
```

## Cloud Backups

### Amazon S3

```bash
# Install AWS CLI
pip install awscli

# Configure
aws configure

# Upload backup
aws s3 cp tududi.db s3://my-bucket/backups/tududi-$(date +%Y%m%d).db
```

### Google Drive (rclone)

```bash
# Install rclone
curl https://rclone.org/install.sh | sudo bash

# Configure Google Drive
rclone config

# Sync backups
rclone sync ./backups/ gdrive:tududi-backups/
```

## Restore from Backup

### SQLite Database

```bash
# Stop application
npm run backend:stop

# Restore database
cp tududi-backup-20251025.db tududi.db

# Restart application
npm run backend:start
```

### PostgreSQL

```bash
# Restore from SQL dump
psql -U tududi_user tududi < tududi_backup.sql
```

### File Uploads

```bash
# Extract backup
tar -xzf uploads-backup-20251025.tar.gz
```

## Docker Backups

```bash
# Backup volume
docker run --rm \
  -v tududi-data:/data \
  -v $(pwd):/backup \
  alpine tar czf /backup/tududi-data-$(date +%Y%m%d).tar.gz /data

# Restore volume
docker run --rm \
  -v tududi-data:/data \
  -v $(pwd):/backup \
  alpine sh -c "cd /data && tar xzf /backup/tududi-data.tar.gz --strip 1"
```

## Testing Backups

Regularly test your backups:

1. Restore to a test environment
2. Verify data integrity
3. Check application functionality
4. Document the restore process

## Disaster Recovery Plan

1. **Identify critical data**:
   - Database
   - Uploaded files
   - Configuration files

2. **Set backup frequency**:
   - Database: Daily
   - Files: Weekly
   - Configuration: On change

3. **Store backups securely**:
   - Multiple locations
   - Encrypted storage
   - Off-site copies

4. **Document procedures**:
   - Backup process
   - Restore process
   - Contact information

## Next Steps

- [Database Setup](/docs/guides/database-setup) - Database configuration
- [Docker Deployment](/docs/guides/docker-deployment) - Deploy with Docker
