---
sidebar_position: 3
title: Configuration
description: Every environment variable tududi reads, plus deployment recipes for Docker, reverse proxies, and production.
---

# Configuration

This guide covers all configuration options for tududi, from basic environment setup to advanced deployment scenarios.

## Environment Variables

tududi is configured entirely through environment variables, making it easy to deploy across different environments without code changes.

Jump to a group: [Core](#core-settings) · [Networking & proxy](#networking-and-proxy) · [Security](#security-settings) · [Rate limiting](#rate-limiting) · [Email](#email-smtp) · [Feature flags](#feature-flags) · [SSO/OIDC](#sso--oidc) · [CalDAV](#caldav) · [AI/LLM](#ai--llm) · [MCP](#mcp) · [Templates](#project-templates) · [Background jobs](#background-jobs) · [Docker](#docker-runtime) · [Frontend build-time](#frontend-build-time-flags)

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

#### `PUID` / `PGID`
- **Description**: User ID and Group ID to run the container process as
- **Required**: No
- **Default**: 1001/1001
- **Example**: `PUID=1000 PGID=1000`
- **When to Use**:
  - Match file permissions with your host system user
  - Running Docker as non-root user
  - Shared storage scenarios
- **How to Find Your IDs**:
  ```bash
  id -u  # Shows your user ID
  id -g  # Shows your group ID
  ```
- **Notes**: `APP_UID` / `APP_GID` are accepted as fallbacks. Some older examples show `GUID` — that name is **not** read by the container entrypoint; use `PGID`.

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
export TUDUDI_USER_EMAIL=test@tududi.com
export TUDUDI_USER_PASSWORD=password123
export TUDUDI_SESSION_SECRET=$(openssl rand -hex 64)
export NODE_ENV=development

# TUDUDI_ALLOWED_ORIGINS not needed - defaults to localhost
```

**What This Does:**
- Creates admin user `test@tududi.com`
- Allows access from `localhost:8080` and `localhost:3002`
- Stores data in project directory

**Access At:**
- Frontend: `http://localhost:8080`
- Backend API: `http://localhost:3002`

---

### Docker Local (Testing Production Build)

Test the production Docker build on your local machine:

```bash
docker run \
  -e TUDUDI_USER_EMAIL=admin@example.com \
  -e TUDUDI_USER_PASSWORD=securepassword \
  -e TUDUDI_SESSION_SECRET=$(openssl rand -hex 64) \
  -v ~/tududi_db:/app/db \
  -v ~/tududi_uploads:/app/uploads \
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
  -v /data/tududi/db:/app/db \
  -v /data/tududi/uploads:/app/uploads \
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
  -e PGID=1000 \
  -v /data/tududi/db:/app/db \
  -v /data/tududi/uploads:/app/uploads \
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
  -v ~/tududi_uploads:/app/uploads \
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
  -v ~/tududi_db:/app/db \
  -v /mnt/storage:/custom/uploads \
  -p 3002:3002 \
  -d chrisvel/tududi:latest
```

---

## Docker Compose Setup

For easier management, use Docker Compose:

**docker-compose.yml:**
```yaml
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
      - PGID=1000
    volumes:
      - ./tududi_db:/app/db
      - ./tududi_uploads:/app/uploads
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
- Use appropriate PUID/PGID for your environment
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

Every variable tududi reads, grouped by area. Anything not listed here is not read by the application.

### Core settings

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `TUDUDI_USER_EMAIL` | Yes | — | Initial admin email, created on first startup |
| `TUDUDI_USER_PASSWORD` | Yes | — | Initial admin password |
| `TUDUDI_SESSION_SECRET` | Yes | random | Session cookie encryption key. A random value is generated if unset, which logs everyone out on every restart |
| `NODE_ENV` | No | `development` | `production`, `development`, or `test`. Any other value exits at startup |
| `DB_FILE` | No | `backend/db/{NODE_ENV}.sqlite3` | SQLite database path |
| `TUDUDI_UPLOAD_PATH` | No | `backend/uploads/` | Upload directory for attachments and avatars |
| `FILE_UPLOAD_LIMIT_MB` | No | `10` | Maximum request body and upload size in MB |
| `API_VERSION` | No | `v1` | API path version. Routes are served at both `/api` and `/api/{version}` |
| `DEBUG` | No | — | Enable verbose debug logging |

### Networking and proxy

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `HOST` | No | `0.0.0.0` | Bind address |
| `PORT` | No | `3002` | Bind port |
| `BASE_URL` | For SSO | — | Public base URL. **Required** for OIDC callbacks to resolve |
| `FRONTEND_URL` | No | `http://localhost:8080` | Frontend URL used in generated links |
| `BACKEND_URL` | No | `http://localhost:3002` | Backend URL used in generated links |
| `TUDUDI_ALLOWED_ORIGINS` | No | localhost only | Comma-separated CORS allowlist |
| `TUDUDI_TRUST_PROXY` | Behind a proxy | `false` | `true`, `false`, `1`, `loopback`, or a CIDR. **Required behind any reverse proxy** |
| `FRONTEND_HOST` / `FRONTEND_PORT` / `FRONTEND_ORIGIN` | No | — | Webpack dev server settings (development only) |

:::warning Behind nginx, Caddy, or Traefik? Set TUDUDI_TRUST_PROXY
Without it, sessions break after login, rate limiting keys off the proxy's IP instead of the client's, and audit logs record the wrong address. The symptom is a `ValidationError` about `X-Forwarded-For` in the logs.
:::

### Security settings

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `COOKIE_SECURE` | No | `auto` | `auto` detects HTTPS (respecting `X-Forwarded-Proto` when trust proxy is on), `true` always requires HTTPS, `false` allows plain HTTP |
| `DISABLE_HSTS` | No | `false` | Disable HSTS headers. Only for running production builds locally over HTTP — never in real production |
| `UPGRADE_INSECURE_REQUESTS` | No | disabled | Add the CSP `upgrade-insecure-requests` directive. Enabling this on a plain HTTP deployment produces a blank page |
| `SWAGGER_ENABLED` | No | `true` | Serve the API explorer at `/api-docs`. Set `false` to disable |
| `SECRET_KEY` | No | — | Fallback encryption key when `ENCRYPTION_KEY` is unset (see [CalDAV](#caldav)) |

### Rate limiting

See [API Security](/features/api-security) for the full explanation of each tier.

| Variable | Default | Description |
|----------|---------|-------------|
| `RATE_LIMITING_ENABLED` | `true` | Master switch |
| `RATE_LIMIT_AUTH_WINDOW_MS` / `RATE_LIMIT_AUTH_MAX` | 15 min / 5 | Login and registration |
| `RATE_LIMIT_API_WINDOW_MS` / `RATE_LIMIT_API_MAX` | 15 min / 100 | Unauthenticated API |
| `RATE_LIMIT_AUTH_API_WINDOW_MS` / `RATE_LIMIT_AUTH_API_MAX` | 15 min / 1000 | Authenticated API |
| `RATE_LIMIT_CREATE_WINDOW_MS` / `RATE_LIMIT_CREATE_MAX` | 15 min / 50 | Resource creation |
| `RATE_LIMIT_API_KEY_WINDOW_MS` / `RATE_LIMIT_API_KEY_MAX` | 1 hour / 10 | API key generation |

### Email (SMTP)

Used for email verification and notification delivery. See [Notifications](/features/notifications).

| Variable | Default | Description |
|----------|---------|-------------|
| `ENABLE_EMAIL` | `false` | Master switch for outbound email |
| `EMAIL_SMTP_HOST` | — | SMTP server hostname |
| `EMAIL_SMTP_PORT` | `587` | SMTP port |
| `EMAIL_SMTP_SECURE` | `false` | Use implicit TLS (typically `true` for port 465) |
| `EMAIL_SMTP_USERNAME` | — | SMTP username |
| `EMAIL_SMTP_PASSWORD` | — | SMTP password or app password |
| `EMAIL_FROM_ADDRESS` | — | From address on outgoing mail |
| `EMAIL_FROM_NAME` | `Tududi` | From display name |
| `REGISTRATION_TOKEN_EXPIRY_HOURS` | `24` | Lifetime of email verification tokens |

### Feature flags

| Variable | Default | Description |
|----------|---------|-------------|
| `FF_ENABLE_BACKUPS` | `false` | Enable the in-app [backup and restore](/features/backup-restore) UI |
| `FF_ENABLE_CALDAV` | `false` | Enable [CalDAV](/features/caldav-sync). `CALDAV_ENABLED=true` is an accepted alias |
| `FF_ENABLE_MCP` | `false` | Enable the [MCP server](/features/mcp-integration) |
| `PROJECT_TEMPLATES_ENABLED` | `true` | Enable [project templates](/features/templates) |
:::note FF_ENABLE_CALENDAR and FF_ENABLE_HABITS do nothing
Both names appear in `backend/.env.example` and the Dockerfile, but no code reads them. Calendar and Habits are **per-user** toggles in **Profile → Features & Add-ons**, not server settings. See [Feature Toggles](/features/feature-toggles).
:::

### SSO / OIDC

Full setup guide: [SSO / OIDC](sso-oidc.md).

| Variable | Default | Description |
|----------|---------|-------------|
| `OIDC_ENABLED` | `false` | Enable OIDC authentication |
| `PASSWORD_AUTH_ENABLED` | `true` | Set `false` to enforce SSO-only login |
| `OIDC_PROVIDER_NAME` | — | Display name on the login button |
| `OIDC_PROVIDER_SLUG` | — | URL-safe identifier used in the callback URL |
| `OIDC_ISSUER_URL` | — | Provider discovery endpoint |
| `OIDC_CLIENT_ID` | — | OAuth client ID |
| `OIDC_CLIENT_SECRET` | — | OAuth client secret |
| `OIDC_SCOPE` | `openid profile email` | Space-separated scopes |
| `OIDC_AUTO_PROVISION` | `true` | Create accounts on first SSO login |
| `OIDC_ADMIN_EMAIL_DOMAINS` | — | Comma-separated domains granted admin at provisioning |

For multiple providers use numbered variants: `OIDC_PROVIDER_1_NAME`, `OIDC_PROVIDER_1_SLUG`, `OIDC_PROVIDER_1_ISSUER`, `OIDC_PROVIDER_1_CLIENT_ID`, `OIDC_PROVIDER_1_CLIENT_SECRET`, `OIDC_PROVIDER_1_SCOPE`, `OIDC_PROVIDER_1_AUTO_PROVISION`, `OIDC_PROVIDER_1_ADMIN_EMAIL_DOMAINS` — numbering from 1 with no gaps.

### CalDAV

Full setup guide: [CalDAV Sync](/features/caldav-sync).

| Variable | Default | Description |
|----------|---------|-------------|
| `CALDAV_ENABLED` | `false` | Enable CalDAV (alias of `FF_ENABLE_CALDAV`) |
| `ENCRYPTION_KEY` | falls back to `SECRET_KEY` | AES-256-GCM key for stored remote calendar passwords |
| `CALDAV_PROJECTS_AS_CALENDARS` | `false` | Serve one calendar per project instead of one combined list |
| `CALDAV_DEFAULT_SYNC_INTERVAL` | `15` | Minutes between automatic syncs |
| `CALDAV_MAX_RECURRING_INSTANCES` | `365` | Future recurring instances to expand |
| `CALDAV_CONFLICT_RESOLUTION` | `last_write_wins` | `last_write_wins`, `local_wins`, `remote_wins`, or `manual` |
| `CALDAV_RATE_LIMIT` | `60` | CalDAV requests per minute per IP |
| `CALDAV_MAX_SYNC_TASKS` | `1000` | Maximum tasks per sync operation |
| `CALDAV_REQUEST_TIMEOUT` | `30000` | Request timeout in milliseconds |
| `CALDAV_LOG_LEVEL` | `info` | `error`, `warn`, `info`, or `debug` |
| `CALDAV_LOG_REQUESTS` | `false` | Log every CalDAV HTTP request |

:::warning Set ENCRYPTION_KEY before adding remote calendars
If `ENCRYPTION_KEY` is unset, tududi falls back to `SECRET_KEY`. If neither is set, saving a remote calendar password fails outright. Changing the value later makes existing stored passwords undecryptable.
:::

### AI / LLM

Full setup guide: [AI Assistant](/features/ai-assistant). All AI features are off unless a key is set.

| Variable | Fallback | Default | Description |
|----------|----------|---------|-------------|
| `LLM_API_KEY` | `OPENAI_API_KEY` | — | API key for an OpenAI-compatible provider |
| `LLM_BASE_URL` | `OPENAI_BASE_URL` | OpenAI | Provider endpoint. Point at Ollama or LM Studio to keep data local |
| `LLM_MODEL` | `TUDUDI_AI_MODEL` | `gpt-4o-mini` | Model name the provider expects |

### MCP

Full setup guide: [MCP Integration](/features/mcp-integration).

| Variable | Default | Description |
|----------|---------|-------------|
| `FF_ENABLE_MCP` | `false` | Enable the MCP server |
| `MCP_SERVER_NAME` | `tududi` | Server name reported to MCP clients |
| `MCP_SERVER_VERSION` | — | Server version reported to MCP clients |
| `TUDUDI_API_TOKEN` | — | API token used by the stdio MCP client config |

### Project templates

| Variable | Default | Description |
|----------|---------|-------------|
| `PROJECT_TEMPLATES_ENABLED` | `true` | Enable project templates |
| `MAX_TEMPLATES_PER_USER` | `50` | Per-user template limit |
| `MARKETPLACE_URL` | — | Remote template marketplace URL |
| `MARKETPLACE_API_KEY` | — | Marketplace API token |

### Background jobs

| Variable | Default | Description |
|----------|---------|-------------|
| `DISABLE_SCHEDULER` | `false` | Disable all cron jobs: deferred tasks, due reminders, task summaries, token cleanup |
| `DISABLE_TELEGRAM` | `false` | Disable Telegram bot polling for all users |

### Docker runtime

| Variable | Default | Description |
|----------|---------|-------------|
| `PUID` | `1001` | UID to run the process as (`APP_UID` is a fallback) |
| `PGID` | `1001` | GID to run the process as (`APP_GID` is a fallback) |

Volumes: `/app/db` and `/app/uploads`. The healthcheck hits `/api/health`.

### Frontend build-time flags

:::warning These are baked into the build, not read at container startup
Unlike every other variable on this page, these three are compiled into the frontend JavaScript bundle at **build time** by webpack. Setting them on the official `chrisvel/tududi` Docker image at container startup has **no effect** — the bundle is already built. They only matter if you build the frontend yourself (`npm run frontend:build`) with the variable set in that environment.
:::

| Variable | Default | Description |
|----------|---------|-------------|
| `TUDUDI_BASE_PATH` | `''` (root) | Serve the app under a URL sub-path, e.g. `/tududi`. Auto-detected for Home Assistant Ingress at runtime even without this set |
| `ENABLE_NOTE_COLOR` | `true` | Show the per-note color picker |
| `ENABLE_INBOX_CLARIFY` | `false` | Show the inbox clarify overlay |

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

**Solution**: Set correct PUID/PGID:
```bash
# On host, check ownership of volume directories
ls -ln ~/tududi_db

# Set matching PUID/PGID in Docker run command
-e PUID=1000 -e PGID=1000
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
