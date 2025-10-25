---
sidebar_position: 2
---

# Database Setup

Configure and manage your Tududi database.

## Database Options

### SQLite (Default)

SQLite is the default database for Tududi - perfect for single-user installations or small teams.

**Pros**:
- Zero configuration
- No separate database server needed
- File-based storage
- Easy backups

**Cons**:
- Limited concurrent writes
- Not ideal for high-traffic deployments

### PostgreSQL (Optional)

For larger deployments, PostgreSQL is recommended.

**Pros**:
- Better concurrent access
- Advanced features
- Scalable for large teams

**Cons**:
- Requires separate database server
- More complex setup

## SQLite Setup

SQLite is configured automatically. The database file is created at:

```
./tududi.db
```

### Custom Location

Specify a custom location in `.env`:

```env
DATABASE_PATH=/path/to/your/tududi.db
```

## PostgreSQL Setup

### 1. Install PostgreSQL

```bash
# Ubuntu/Debian
sudo apt-get install postgresql postgresql-contrib

# macOS
brew install postgresql
```

### 2. Create Database

```bash
sudo -u postgres psql
CREATE DATABASE tududi;
CREATE USER tududi_user WITH ENCRYPTED PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE tududi TO tududi_user;
\q
```

### 3. Configure Tududi

Update `.env`:

```env
DATABASE_URL=postgresql://tududi_user:your_password@localhost:5432/tududi
```

### 4. Run Migrations

```bash
npm run db:migrate
```

## Database Migrations

### Check Migration Status

```bash
npm run migration:status
```

### Run Pending Migrations

```bash
npm run migration:run
```

### Create New Migration

```bash
npm run migration:create -- --name add_user_avatar
```

### Rollback Migration

```bash
npm run migration:undo
```

## Database Initialization

First-time setup:

```bash
# Initialize database
npm run db:init

# Run migrations
npm run db:migrate

# (Optional) Seed with sample data
npm run db:seed
```

## Database Maintenance

### Backup

```bash
# SQLite
cp tududi.db tududi.db.backup

# PostgreSQL
pg_dump -U tududi_user tududi > tududi_backup.sql
```

### Restore

```bash
# SQLite
cp tududi.db.backup tududi.db

# PostgreSQL
psql -U tududi_user tududi < tududi_backup.sql
```

### Optimize

```bash
# SQLite
sqlite3 tududi.db "VACUUM;"

# PostgreSQL
psql -U tududi_user -d tududi -c "VACUUM ANALYZE;"
```

## Next Steps

- [Backup & Restore](/docs/guides/backup-restore) - Backup strategies
- [Docker Deployment](/docs/guides/docker-deployment) - Deploy with Docker
