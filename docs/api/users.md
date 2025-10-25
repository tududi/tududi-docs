---
sidebar_position: 4
---

# Users API

User management and profile endpoints.

## Get Current User

Get the authenticated user's profile.

```http
GET /api/users/me
```

### Response

```json
{
  "success": true,
  "data": {
    "id": 1,
    "username": "user@example.com",
    "name": "John Doe",
    "email": "user@example.com",
    "preferences": {
      "language": "en",
      "timezone": "America/New_York",
      "theme": "light"
    },
    "createdAt": "2025-01-01T00:00:00Z",
    "updatedAt": "2025-10-25T10:00:00Z"
  }
}
```

## Update Current User

Update the authenticated user's profile.

```http
PUT /api/users/me
Content-Type: application/json

{
  "name": "John Smith",
  "preferences": {
    "language": "es",
    "theme": "dark"
  }
}
```

### Response

```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "John Smith",
    "preferences": {
      "language": "es",
      "timezone": "America/New_York",
      "theme": "dark"
    },
    "updatedAt": "2025-10-25T15:00:00Z"
  }
}
```

## Change Password

Change the current user's password.

```http
POST /api/users/me/password
Content-Type: application/json

{
  "currentPassword": "OldPassword123!",
  "newPassword": "NewPassword456!"
}
```

### Response

```json
{
  "success": true,
  "message": "Password updated successfully"
}
```

## Get User Statistics

Get task statistics for the current user.

```http
GET /api/users/me/stats
```

### Response

```json
{
  "success": true,
  "data": {
    "totalTasks": 245,
    "completedTasks": 189,
    "incompleteTasks": 56,
    "overdueTasks": 8,
    "tasksThisWeek": 23,
    "completionRate": 0.77,
    "averageTimeToComplete": 172800000,
    "productivityTrend": "increasing"
  }
}
```

## User Preferences

### Get Preferences

```http
GET /api/users/me/preferences
```

### Update Preferences

```http
PUT /api/users/me/preferences
Content-Type: application/json

{
  "language": "fr",
  "timezone": "Europe/Paris",
  "theme": "dark",
  "dateFormat": "DD/MM/YYYY",
  "timeFormat": "24h",
  "notifications": {
    "email": true,
    "telegram": false,
    "desktop": true
  }
}
```

## Avatar

### Upload Avatar

```http
POST /api/users/me/avatar
Content-Type: multipart/form-data

avatar: [image file]
```

### Delete Avatar

```http
DELETE /api/users/me/avatar
```

## User Activity

### Get Activity Log

```http
GET /api/users/me/activity?limit=50&offset=0
```

### Response

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "action": "task.created",
      "description": "Created task: Complete project proposal",
      "metadata": {
        "taskId": 42,
        "taskTitle": "Complete project proposal"
      },
      "timestamp": "2025-10-25T15:00:00Z"
    },
    {
      "id": 2,
      "action": "task.completed",
      "description": "Completed task: Review documentation",
      "metadata": {
        "taskId": 38
      },
      "timestamp": "2025-10-25T14:30:00Z"
    }
  ],
  "pagination": {
    "total": 150,
    "limit": 50,
    "offset": 0,
    "hasMore": true
  }
}
```

## Connected Apps

### List Connected Apps

```http
GET /api/users/me/connected-apps
```

### Revoke App Access

```http
DELETE /api/users/me/connected-apps/:appId
```

## Export Data

Request a data export (GDPR compliance).

```http
POST /api/users/me/export
Content-Type: application/json

{
  "format": "json"
}
```

### Response

```json
{
  "success": true,
  "message": "Export requested. You will receive an email when it's ready.",
  "exportId": "exp_123456"
}
```

## Delete Account

Permanently delete the user account.

```http
DELETE /api/users/me
Content-Type: application/json

{
  "password": "MyPassword123!",
  "confirmation": "DELETE"
}
```

## Admin Endpoints

*Note: Requires admin privileges*

### List All Users

```http
GET /api/admin/users
```

### Get User by ID

```http
GET /api/admin/users/:id
```

### Update User

```http
PUT /api/admin/users/:id
```

### Delete User

```http
DELETE /api/admin/users/:id
```

### Ban User

```http
POST /api/admin/users/:id/ban
```

### Unban User

```http
POST /api/admin/users/:id/unban
```

## Error Responses

### Invalid Password (400)

```json
{
  "success": false,
  "error": {
    "code": "INVALID_PASSWORD",
    "message": "Current password is incorrect"
  }
}
```

### Weak Password (400)

```json
{
  "success": false,
  "error": {
    "code": "WEAK_PASSWORD",
    "message": "Password does not meet requirements"
  }
}
```

## Examples

### Update User Profile

```javascript
const response = await fetch('http://localhost:3000/api/users/me', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  credentials: 'include',
  body: JSON.stringify({
    name: 'Jane Doe',
    preferences: {
      language: 'es',
      theme: 'dark',
      timezone: 'Europe/Madrid'
    }
  })
});

const data = await response.json();
console.log('Profile updated:', data);
```

### Change Password

```javascript
const response = await fetch('http://localhost:3000/api/users/me/password', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  credentials: 'include',
  body: JSON.stringify({
    currentPassword: 'OldPassword123!',
    newPassword: 'NewPassword456!'
  })
});

if (response.ok) {
  console.log('Password changed successfully');
}
```

## Next Steps

- [Authentication API](/docs/api/authentication) - User authentication
- [Tasks API](/docs/api/tasks) - Task management
