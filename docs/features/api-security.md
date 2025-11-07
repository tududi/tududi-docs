---
sidebar_position: 3
---

# API Security & Rate Limiting

Tududi includes comprehensive API security features to protect your instance from abuse, brute force attacks, and unauthorized access.

## Overview

The API security system provides:

- **Rate Limiting**: Prevents abuse and brute force attacks
- **API Token Authentication**: Secure programmatic access
- **Swagger Documentation Control**: Protect API internals in production
- **Environment-based Configuration**: Different security levels for dev/production

---

## Rate Limiting

Rate limiting helps prevent:
- Brute force attacks on login endpoints
- API abuse and DoS attacks
- Resource exhaustion
- Automated scraping

### How It Works

Tududi implements tiered rate limiting based on:
- **Authentication state**: Different limits for authenticated vs unauthenticated users
- **Endpoint sensitivity**: Stricter limits for authentication and API key management
- **User identification**: IP-based for unauthenticated, user ID-based for authenticated

### Rate Limit Tiers

#### 1. Authentication Endpoints
Protects login/register from brute force attacks.

- **Default**: 5 requests per 15 minutes per IP
- **Applies to**: `/api/login`
- **Response**: HTTP 429 with retry-after header

```bash
# Customize via environment variables
RATE_LIMIT_AUTH_WINDOW_MS=900000  # 15 minutes
RATE_LIMIT_AUTH_MAX=5              # 5 attempts
```

#### 2. Unauthenticated API
General protection for public API endpoints.

- **Default**: 100 requests per 15 minutes per IP
- **Applies to**: All `/api/*` routes when not authenticated
- **Bypassed**: Automatically when user is logged in

```bash
RATE_LIMIT_API_WINDOW_MS=900000    # 15 minutes
RATE_LIMIT_API_MAX=100             # 100 requests
```

#### 3. Authenticated API
More lenient limits for legitimate users.

- **Default**: 1000 requests per 15 minutes per user
- **Tracking**: By user ID, not IP address
- **Applies to**: All authenticated requests

```bash
RATE_LIMIT_AUTH_API_WINDOW_MS=900000  # 15 minutes
RATE_LIMIT_AUTH_API_MAX=1000          # 1000 requests
```

#### 4. Resource Creation
Prevents spam on POST endpoints.

- **Default**: 50 requests per 15 minutes per user
- **Applies to**: Creating tasks, projects, notes, etc.
- **Purpose**: Prevent automated resource creation

```bash
RATE_LIMIT_CREATE_WINDOW_MS=900000    # 15 minutes
RATE_LIMIT_CREATE_MAX=50              # 50 creates
```

#### 5. API Key Management
Strictest limits for sensitive operations.

- **Default**: 10 requests per hour per user
- **Applies to**: Creating, revoking, and deleting API keys
- **Purpose**: Prevent API key abuse

```bash
RATE_LIMIT_API_KEY_WINDOW_MS=3600000  # 1 hour
RATE_LIMIT_API_KEY_MAX=10             # 10 operations
```

### Rate Limit Responses

When a rate limit is exceeded, you'll receive:

```json
{
  "error": "Rate limit exceeded",
  "message": "You have exceeded the maximum number of requests. Please try again later.",
  "retryAfter": 900
}
```

**HTTP Status**: `429 Too Many Requests`

**Response Headers**:
```
RateLimit-Limit: 100
RateLimit-Remaining: 0
RateLimit-Reset: 1699356000
```

### Configuration

#### Global Enable/Disable

```bash
# Disable all rate limiting (not recommended for production)
RATE_LIMITING_ENABLED=false
```

#### Per-Environment Configuration

**Development** (recommended):
```bash
# More lenient for testing
RATE_LIMIT_AUTH_MAX=20
RATE_LIMIT_API_MAX=500
RATE_LIMIT_AUTH_API_MAX=5000
```

**Production** (recommended):
```bash
# Keep defaults strict
# (Default values are production-ready)
```

#### Automatic Behavior

- **Test Environment**: Rate limiting is automatically disabled when `NODE_ENV=test`
- **Production**: Enabled by default with conservative limits

### Best Practices

1. **Keep authentication limits strict** (5-10 requests per 15 minutes)
2. **Monitor rate limit headers** in your API responses
3. **Adjust authenticated limits** based on actual usage patterns
4. **Log rate limit violations** to detect potential attacks
5. **Increase limits gradually** if legitimate users report issues

---

## API Token Authentication

API tokens provide secure programmatic access to Tududi without using session cookies.

### Features

- **Bearer token authentication**: Industry-standard authentication
- **Scoped access**: Token-based permissions (future feature)
- **Revocable**: Instantly revoke compromised tokens
- **Expirable**: Optional expiration dates
- **Tracked**: Monitor last usage and creation date

### Creating API Tokens

Via the web interface:
1. Navigate to Profile → Settings → API Keys
2. Click "Create API Key"
3. Provide a descriptive name
4. Optionally set an expiration date
5. Copy the token immediately (shown only once)

Via API:
```bash
curl -X POST https://your-domain.com/api/profile/api-keys \
  -H "Cookie: connect.sid=your-session-cookie" \
  -H "Content-Type: application/json" \
  -d '{"name": "My Integration", "expires_at": "2025-12-31"}'
```

Response:
```json
{
  "token": "tt_a7f3b2c9e8d1f4a6b5c2d8e9f1a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1",
  "apiKey": {
    "id": 1,
    "name": "My Integration",
    "token_prefix": "tt_a7f3",
    "created_at": "2024-11-07T12:00:00Z",
    "expires_at": "2025-12-31T23:59:59Z"
  }
}
```

:::warning
The full token is shown only once during creation. Store it securely!
:::

### Using API Tokens

Include the token in the `Authorization` header:

```bash
curl https://your-domain.com/api/tasks \
  -H "Authorization: Bearer tt_a7f3b2c9e8d1f4a6b5c2d8e9f1a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1"
```

### Managing API Tokens

#### List All Tokens

```bash
GET /api/profile/api-keys
```

Returns all your API keys (tokens not included, only prefixes).

#### Revoke a Token

```bash
POST /api/profile/api-keys/{id}/revoke
```

Marks the token as revoked. Cannot be undone.

#### Delete a Token

```bash
DELETE /api/profile/api-keys/{id}
```

Permanently deletes the token.

### Security Best Practices

1. **Use descriptive names**: Identify each token's purpose
2. **Set expiration dates**: Limit token lifetime
3. **Rotate regularly**: Create new tokens periodically
4. **Revoke immediately**: If a token is compromised
5. **One token per integration**: Don't share tokens across services
6. **Store securely**: Use environment variables or secret managers
7. **Monitor usage**: Check `last_used_at` timestamps

---

## Swagger API Documentation

Tududi includes interactive API documentation via Swagger UI.

### Accessing Documentation

**Development**: `http://localhost:3002/api`

**Production**: Disabled by default (recommended)

### Security Considerations

API documentation reveals:
- All available endpoints
- Request/response schemas
- Authentication methods
- Parameter requirements

**Recommendation**: Only enable Swagger in:
- Development environments
- Internal networks
- Behind authentication (if needed in production)

### Configuration

#### Default Behavior

```javascript
// Enabled in development, disabled in production
SWAGGER_ENABLED=false  // Force disable
SWAGGER_ENABLED=true   // Force enable
```

#### Docker Configuration

Swagger is disabled in the Dockerfile:

```dockerfile
ENV SWAGGER_ENABLED=false
```

#### Access Control

When disabled:
- `/api` returns HTTP 404
- Swagger routes are not registered
- No documentation is served

When enabled:
- Full interactive API documentation
- Try-it-out functionality
- Schema exploration

### Development Usage

1. Start tududi in development mode
2. Navigate to `http://localhost:3002/api`
3. Explore available endpoints
4. Test API calls directly from the browser

---

## Configuration Summary

### Quick Reference

```bash
# API Documentation
SWAGGER_ENABLED=false                     # Disable in production

# Rate Limiting
RATE_LIMITING_ENABLED=true                # Global switch

# Authentication limits (5 req/15min)
RATE_LIMIT_AUTH_WINDOW_MS=900000
RATE_LIMIT_AUTH_MAX=5

# General API limits (100 req/15min)
RATE_LIMIT_API_WINDOW_MS=900000
RATE_LIMIT_API_MAX=100

# Authenticated API limits (1000 req/15min)
RATE_LIMIT_AUTH_API_WINDOW_MS=900000
RATE_LIMIT_AUTH_API_MAX=1000

# Resource creation limits (50 req/15min)
RATE_LIMIT_CREATE_WINDOW_MS=900000
RATE_LIMIT_CREATE_MAX=50

# API key management limits (10 req/hour)
RATE_LIMIT_API_KEY_WINDOW_MS=3600000
RATE_LIMIT_API_KEY_MAX=10
```

### Production Recommendations

```bash
# Minimal production configuration
NODE_ENV=production
SWAGGER_ENABLED=false
RATE_LIMITING_ENABLED=true
# (All other rate limit settings use secure defaults)
```

---

## Troubleshooting

### Rate Limit Headers Missing

**Cause**: Using older client/browser  
**Solution**: Check for `RateLimit-*` headers in network tab

### Legitimate Users Being Rate Limited

**Cause**: Limits too strict for usage patterns  
**Solution**: Gradually increase `RATE_LIMIT_AUTH_API_MAX`

### Can't Access Swagger Docs

**Cause**: Disabled in production  
**Solution**: Set `SWAGGER_ENABLED=true` (only if behind auth)

### API Token Not Working

**Cause**: Token format incorrect  
**Solution**: Ensure full token starting with `tt_` is used

---

## Security Checklist

Before deploying to production:

- [ ] `NODE_ENV=production`
- [ ] `SWAGGER_ENABLED=false`
- [ ] `RATE_LIMITING_ENABLED=true`
- [ ] Strong `TUDUDI_SESSION_SECRET`
- [ ] HTTPS enabled
- [ ] Proper `TUDUDI_ALLOWED_ORIGINS`
- [ ] API tokens stored securely
- [ ] Regular security updates

---

## Related Documentation

- [Configuration Guide](../getting-started/configuration.md)
- [API Reference](https://your-domain.com/api) (when Swagger enabled)
- [Environment Variables](../getting-started/configuration.md#environment-variables)
