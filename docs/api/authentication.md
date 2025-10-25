---
sidebar_position: 2
---

# Authentication API

Detailed documentation for Tududi's authentication endpoints.

## Overview

Tududi uses session-based authentication with secure HTTP-only cookies.

## Endpoints

### Register

Create a new user account.

```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "user@example.com",
  "password": "SecurePassword123!",
  "name": "John Doe"
}
```

**Response (201 Created)**:
```json
{
  "success": true,
  "user": {
    "id": 1,
    "username": "user@example.com",
    "name": "John Doe",
    "createdAt": "2025-10-25T12:00:00Z"
  }
}
```

### Login

Authenticate and create a session.

```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "user@example.com",
  "password": "SecurePassword123!"
}
```

**Response (200 OK)**:
```json
{
  "success": true,
  "user": {
    "id": 1,
    "username": "user@example.com",
    "name": "John Doe"
  }
}
```

**Error Response (401 Unauthorized)**:
```json
{
  "success": false,
  "error": {
    "code": "INVALID_CREDENTIALS",
    "message": "Invalid username or password"
  }
}
```

### Logout

End the current session.

```http
POST /api/auth/logout
```

**Response (200 OK)**:
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

### Check Status

Verify authentication status.

```http
GET /api/auth/status
```

**Response (Authenticated)**:
```json
{
  "success": true,
  "authenticated": true,
  "user": {
    "id": 1,
    "username": "user@example.com",
    "name": "John Doe"
  }
}
```

**Response (Not Authenticated)**:
```json
{
  "success": true,
  "authenticated": false
}
```

## Session Management

### Session Cookie

The session is stored in an HTTP-only cookie:

```
Set-Cookie: connect.sid=s%3A...; Path=/; HttpOnly; SameSite=Lax
```

**Cookie Attributes**:
- `HttpOnly`: Prevents JavaScript access
- `Secure`: HTTPS only (production)
- `SameSite=Lax`: CSRF protection
- `Max-Age`: 24 hours (configurable)

### Session Expiry

Sessions expire after:
- 24 hours of inactivity (default)
- Explicit logout
- Server restart (if not using persistent session store)

## Security

### Password Requirements

Passwords must:
- Be at least 8 characters long
- Contain at least one uppercase letter
- Contain at least one lowercase letter
- Contain at least one number
- Contain at least one special character

### Rate Limiting

Login attempts are rate limited:
- 5 attempts per 15 minutes per IP
- 10 attempts per hour per username

### CSRF Protection

CSRF protection is enabled by default:
- `SameSite` cookie attribute
- CSRF token for state-changing operations

## Examples

### cURL

```bash
# Register
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "user@example.com",
    "password": "SecurePassword123!",
    "name": "John Doe"
  }'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{
    "username": "user@example.com",
    "password": "SecurePassword123!"
  }'

# Authenticated request
curl http://localhost:3000/api/tasks \
  -b cookies.txt

# Logout
curl -X POST http://localhost:3000/api/auth/logout \
  -b cookies.txt
```

### JavaScript (fetch)

```javascript
// Login
const response = await fetch('http://localhost:3000/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include', // Important: include cookies
  body: JSON.stringify({
    username: 'user@example.com',
    password: 'SecurePassword123!'
  })
});

const data = await response.json();

// Authenticated request
const tasks = await fetch('http://localhost:3000/api/tasks', {
  credentials: 'include' // Include session cookie
});

// Logout
await fetch('http://localhost:3000/api/auth/logout', {
  method: 'POST',
  credentials: 'include'
});
```

### Python (requests)

```python
import requests

# Create session to persist cookies
session = requests.Session()

# Login
response = session.post('http://localhost:3000/api/auth/login', json={
    'username': 'user@example.com',
    'password': 'SecurePassword123!'
})

# Authenticated request (session automatically includes cookies)
tasks = session.get('http://localhost:3000/api/tasks')

# Logout
session.post('http://localhost:3000/api/auth/logout')
```

## Error Codes

| Code | Description |
|------|-------------|
| `INVALID_CREDENTIALS` | Wrong username or password |
| `USER_EXISTS` | Username already taken |
| `WEAK_PASSWORD` | Password doesn't meet requirements |
| `RATE_LIMITED` | Too many login attempts |
| `SESSION_EXPIRED` | Session has expired |
| `UNAUTHORIZED` | Not authenticated |

## Next Steps

- [Tasks API](/api/tasks) - Manage tasks via API
- [Users API](/api/users) - User management
