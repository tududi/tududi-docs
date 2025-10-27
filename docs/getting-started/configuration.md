---
sidebar_position: 3
---

# Configuration

This guide covers all configuration options for tududi, from basic environment setup to advanced deployment scenarios.

## Environment Variables

tududi is configured entirely through environment variables, making it easy to deploy across different environments without code changes.

### Required Variables

These variables **must** be set for tududi to function:

#### `TUDUDI_USER_EMAIL`
- **Description**: Email address for the initial admin user
- **Required**: Yes
- **Example**: `admin@example.com`
- **When Used**: On first startup to create the admin account
- **Notes**: This creates the first user with admin privileges

#### `TUDUDI_USER_PASSWORD`
- **Description**: Password for the initial admin user
- **Required**: Yes
- **Example**: `mysecurepassword123`
- **Security**: Use a strong, unique password
- **Notes**: Only used during initial user creation; can be changed later via the UI

#### `TUDUDI_SESSION_SECRET`
- **Description**: Secret key used to encrypt session cookies
- **Required**: Yes
- **How to Generate**: `openssl rand -hex 64`
- **Example**: `a7f3b2c9e8d1f4a6...` (64-character hex string)
- **Security**:
  - Keep this secret and never share it
  - Use a cryptographically random value
  - If compromised, all users will be logged out when changed

---

### Optional Variables

These variables customize tududi's behavior:

#### `TUDUDI_ALLOWED_ORIGINS`
- **Description**: Controls Cross-Origin Resource Sharing (CORS) for API access
- **Required**: No
- **Default**: Localhost origins only (`http://localhost:*`)
- **Format**: Comma-separated list of allowed origins
- **Examples**:
  ```bash
  # Single domain
  TUDUDI_ALLOWED_ORIGINS=https://tududi.yourdomain.com

  # Multiple domains
  TUDUDI_ALLOWED_ORIGINS=https://tududi.com,http://localhost:3002

  # Allow all origins (development only - NOT SECURE for production!)
  TUDUDI_ALLOWED_ORIGINS=""
  ```
- **Use Cases**:
  - **Not set**: Local development only
  - **Specific domains**: Production with reverse proxy
  - **Empty string**: Development with external access (insecure)

#### `PUID` / `GUID`
- **Description**: User ID and Group ID to run the container process as
- **Required**: No
- **Default**: 1001/1001
- **Example**: `PUID=1000 GUID=1000`
- **When to Use**:
  - Match file permissions with your host system user
  - Running Docker as non-root user
  - Shared storage scenarios
- **How to Find Your IDs**:
  ```bash
  id -u  # Shows your user ID
  id -g  # Shows your group ID
  ```

#### `DB_FILE`
- **Description**: Path to the SQLite database file
- **Required**: No
- **Default**: `backend/db/development.sqlite3` (dev) or `backend/db/production.sqlite3` (prod)
- **Example**: `/data/tududi/database.sqlite3`
- **When to Use**: Custom database location outside default directories

#### `TUDUDI_UPLOAD_PATH`
- **Description**: Directory where uploaded files are stored
- **Required**: No
- **Default**: `backend/uploads/`
- **Example**: `/data/tududi/uploads`
- **When to Use**: Custom storage location for file attachments

---

## Configuration by Environment

### Local Development

Perfect for testing and development on your local machine:

```bash
# Minimal setup - defaults work great for local dev
export TUDUDI_USER_EMAIL=dev@example.com
export TUDUDI_USER_PASSWORD=password123
export TUDUDI_SESSION_SECRET=$(openssl rand -hex 64)

# TUDUDI_ALLOWED_ORIGINS not needed - defaults to localhost
```

**What This Does:**
- Creates admin user `dev@example.com`
- Allows access from `localhost:8080` and `localhost:3001`
- Stores data in project directory

**Access At:**
- Frontend: `http://localhost:8080`
- Backend API: `http://localhost:3001`

---

### Docker Local (Testing Production Build)

Test the production Docker build on your local machine:

```bash
docker run \
  -e TUDUDI_USER_EMAIL=admin@example.com \
  -e TUDUDI_USER_PASSWORD=securepassword \
  -e TUDUDI_SESSION_SECRET=$(openssl rand -hex 64) \
  -v ~/tududi_db:/app/backend/db \
  -v ~/tududi_uploads:/app/backend/uploads \
  -p 3002:3002 \
  -d chrisvel/tududi:latest
```

**What This Does:**
- Runs production build locally
- Persists data to `~/tududi_db` and `~/tududi_uploads`
- Accessible only from localhost

**Access At:** `http://localhost:3002`

---

### Production with Reverse Proxy (Recommended)

Production deployment behind nginx, Traefik, or Caddy:

```bash
docker run \
  -e TUDUDI_USER_EMAIL=admin@yourdomain.com \
  -e TUDUDI_USER_PASSWORD=your-secure-password \
  -e TUDUDI_SESSION_SECRET=$(openssl rand -hex 64) \
  -e TUDUDI_ALLOWED_ORIGINS=https://tududi.yourdomain.com \
  -v /data/tududi/db:/app/backend/db \
  -v /data/tududi/uploads:/app/backend/uploads \
  -p 127.0.0.1:3002:3002 \
  -d chrisvel/tududi:latest
```

**Key Differences:**
- `TUDUDI_ALLOWED_ORIGINS` set to your public domain
- Volumes mounted to persistent storage location
- Port bound to `127.0.0.1` (not externally accessible)
- Reverse proxy handles SSL/TLS and public access

**Example nginx config:**
```nginx
server {
    listen 443 ssl http2;
    server_name tududi.yourdomain.com;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    location / {
        proxy_pass http://127.0.0.1:3002;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

### Production with Custom Permissions

Match container user/group to your host system:

```bash
# Find your user/group IDs
id -u  # e.g., 1000
id -g  # e.g., 1000

docker run \
  -e TUDUDI_USER_EMAIL=admin@yourdomain.com \
  -e TUDUDI_USER_PASSWORD=your-secure-password \
  -e TUDUDI_SESSION_SECRET=$(openssl rand -hex 64) \
  -e TUDUDI_ALLOWED_ORIGINS=https://tududi.yourdomain.com \
  -e PUID=1000 \
  -e GUID=1000 \
  -v /data/tududi/db:/app/backend/db \
  -v /data/tududi/uploads:/app/backend/uploads \
  -p 127.0.0.1:3002:3002 \
  -d chrisvel/tududi:latest
```

**When to Use:**
- Shared storage systems (NFS, etc.)
- Specific security requirements
- File permission issues on host

---

## Advanced Configuration

### Custom Database Location

Store the database outside the default location:

```bash
docker run \
  -e DB_FILE=/custom/path/tududi.sqlite3 \
  -e TUDUDI_USER_EMAIL=admin@example.com \
  -e TUDUDI_USER_PASSWORD=password \
  -e TUDUDI_SESSION_SECRET=$(openssl rand -hex 64) \
  -v /mnt/database:/custom/path \
  -v ~/tududi_uploads:/app/backend/uploads \
  -p 3002:3002 \
  -d chrisvel/tududi:latest
```

### Custom Upload Path

Store uploads in a different location:

```bash
docker run \
  -e TUDUDI_UPLOAD_PATH=/custom/uploads \
  -e TUDUDI_USER_EMAIL=admin@example.com \
  -e TUDUDI_USER_PASSWORD=password \
  -e TUDUDI_SESSION_SECRET=$(openssl rand -hex 64) \
  -v ~/tududi_db:/app/backend/db \
  -v /mnt/storage:/custom/uploads \
  -p 3002:3002 \
  -d chrisvel/tududi:latest
```

---

## Docker Compose Setup

For easier management, use Docker Compose:

**docker-compose.yml:**
```yaml
version: '3.8'

services:
  tududi:
    image: chrisvel/tududi:latest
    container_name: tududi
    restart: unless-stopped
    environment:
      - TUDUDI_USER_EMAIL=admin@example.com
      - TUDUDI_USER_PASSWORD=your-secure-password
      - TUDUDI_SESSION_SECRET=your-generated-secret-here
      - TUDUDI_ALLOWED_ORIGINS=https://tududi.yourdomain.com
      - PUID=1000
      - GUID=1000
    volumes:
      - ./tududi_db:/app/backend/db
      - ./tududi_uploads:/app/backend/uploads
    ports:
      - "127.0.0.1:3002:3002"
```

**Usage:**
```bash
# Start
docker-compose up -d

# Stop
docker-compose down

# View logs
docker-compose logs -f

# Update
docker-compose pull
docker-compose up -d
```

---

## Security Best Practices

### Session Secret
- **Generate with**: `openssl rand -hex 64`
- **Never** use a weak or predictable value
- **Never** commit to version control
- **Rotate periodically** for maximum security (all users will be logged out)

### Passwords
- Use a password manager to generate strong passwords
- Minimum 12 characters recommended
- Mix uppercase, lowercase, numbers, and symbols
- Change default passwords immediately after first login

### CORS Configuration
- **Production**: Always specify exact allowed origins
- **Never** use empty string (`""`) in production
- Limit to specific domains you control
- Include protocol and port (e.g., `https://tududi.com`, not just `tududi.com`)

### File Permissions
- Ensure database and upload volumes are not world-readable
- Use appropriate PUID/GUID for your environment
- Restrict access to `.env` files (`chmod 600 .env`)

### Reverse Proxy
- Always use HTTPS in production (SSL/TLS)
- Set proper headers (`X-Forwarded-For`, `X-Real-IP`, etc.)
- Implement rate limiting at proxy level
- Use strong SSL/TLS configuration (modern ciphers only)

---

## Telegram Configuration

Telegram integration is configured through the web interface after installation. See the dedicated Telegram Integration guide for details.

**Quick Overview:**
1. Create a Telegram bot via @BotFather
2. Log into tududi and go to Settings → Telegram
3. Enter your bot token
4. Click "Setup Telegram"
5. Start chatting with your bot

For full instructions, visit [Telegram Integration](/features/telegram-integration)

---

## Environment Variable Reference

### Quick Reference Table

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `TUDUDI_USER_EMAIL` | Yes | - | Initial admin email |
| `TUDUDI_USER_PASSWORD` | Yes | - | Initial admin password |
| `TUDUDI_SESSION_SECRET` | Yes | - | Session encryption key |
| `TUDUDI_ALLOWED_ORIGINS` | No | `localhost:*` | CORS allowed origins |
| `PUID` | No | 1001 | Container user ID |
| `GUID` | No | 1001 | Container group ID |
| `DB_FILE` | No | `backend/db/production.sqlite3` | Database file path |
| `TUDUDI_UPLOAD_PATH` | No | `backend/uploads/` | Upload directory |

---

## Troubleshooting Configuration

### "Access Denied" or CORS Errors

**Problem**: Frontend can't access backend API

**Solution**: Check `TUDUDI_ALLOWED_ORIGINS` matches your access URL exactly:
```bash
# If accessing via https://tududi.yourdomain.com
TUDUDI_ALLOWED_ORIGINS=https://tududi.yourdomain.com

# Include port if non-standard
TUDUDI_ALLOWED_ORIGINS=https://tududi.com:8443
```

### "Session Invalid" After Container Restart

**Problem**: All users logged out after restarting container

**Cause**: `TUDUDI_SESSION_SECRET` changed or not persisted

**Solution**: Ensure session secret is:
- Set explicitly (not regenerated each run)
- Stored in docker-compose.yml or startup script
- Not using `$(openssl rand -hex 64)` directly in production

### File Permission Errors

**Problem**: Database or uploads not accessible

**Solution**: Set correct PUID/GUID:
```bash
# On host, check ownership of volume directories
ls -ln ~/tududi_db

# Set matching PUID/GUID in Docker run command
-e PUID=1000 -e GUID=1000
```

### Can't Access on Network

**Problem**: Container works on localhost but not from other machines

**Solution**: Change port binding from `127.0.0.1:3002:3002` to `0.0.0.0:3002:3002`:
```bash
# Before (localhost only)
-p 127.0.0.1:3002:3002

# After (all interfaces)
-p 3002:3002
```

**Warning**: Only do this if you understand the security implications. Use a reverse proxy with HTTPS for production.

---

## Next Steps

- **[First Steps](/getting-started/first-steps)** - Start using tududi
- **[Telegram Integration](/features/telegram-integration)** - Set up quick capture
- **[Docker Deployment](/guides/docker-deployment)** - Advanced deployment options
