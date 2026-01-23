---
sidebar_position: 3
---

# API Access

Tududi supports secure programmatic access using API tokens and provides optional interactive documentation via Swagger.

## Overview

- API token authentication for secure, cookie-less access
- Swagger documentation control (recommended disabled in production)
- Environment-based configuration for dev/production

---

## API Tokens

API tokens are bearer credentials for accessing the API.

### Create a token

Via the web interface:
1. Profile → Settings → API Keys
2. Create API Key, give it a name (optional expiry)
3. Copy the token once and store it securely

Via API:
```bash
curl -X POST https://your-domain.com/api/profile/api-keys \
  -H "Cookie: connect.sid=your-session-cookie" \
  -H "Content-Type: application/json" \
  -d '{"name": "My Integration"}'
```
The response includes the full token once. Store it securely.

### Use a token

Include it in the Authorization header:
```bash
curl https://your-domain.com/api/tasks \
  -H "Authorization: Bearer tt_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

### Manage tokens (quick reference)
- List: `GET /api/profile/api-keys` (returns metadata, not full tokens)
- Revoke: `POST /api/profile/api-keys/{id}/revoke`
- Delete: `DELETE /api/profile/api-keys/{id}`

### Best practices
- One token per integration; use descriptive names
- Rotate and revoke when no longer needed or if compromised
- Set expirations where possible
- Store in a secrets manager or environment variables
- Prefer least-privilege scopes when available (future)

---

## Swagger API Documentation

Interactive API docs are available in development.

- Development: `http://localhost:3002/api`
- Production: disabled by default (recommended)

### Configuration
```bash
# Enabled in development, disabled in production by default
SWAGGER_ENABLED=false  # Force disable
SWAGGER_ENABLED=true   # Force enable (only if necessary and protected)
```

### Development usage
1. Run Tududi in development
2. Open `http://localhost:3002/api`
3. Explore endpoints and schemas

---

## Troubleshooting
- Can't access Swagger docs: likely disabled in production → set `SWAGGER_ENABLED=true` only behind authentication
- API token not working: ensure the full token (starts with `tt_`) is used in the `Authorization: Bearer` header

---

## Security checklist
- `NODE_ENV=production`
- `SWAGGER_ENABLED=false` for public production
- Strong `TUDUDI_SESSION_SECRET`
- HTTPS enabled
- Proper `TUDUDI_ALLOWED_ORIGINS`
- API tokens stored securely

---

## Related documentation
- [Configuration Guide](../getting-started/configuration.md)
- [API Reference](https://your-domain.com/api) (when Swagger is enabled)
- [Environment Variables](../getting-started/configuration.md#environment-variables)
