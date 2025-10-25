---
sidebar_position: 1
---

# API Overview

Tududi provides a RESTful API for integrating with external applications.

## Base URL

```
http://localhost:3000/api
```

For production, use your deployed domain.

## Authentication

Tududi uses session-based authentication with cookies.

### Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "user@example.com",
  "password": "your-password"
}
```

**Response**:
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

### Logout

```http
POST /api/auth/logout
```

### Check Authentication Status

```http
GET /api/auth/status
```

## API Endpoints

### Tasks

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | List all tasks |
| GET | `/api/tasks/:id` | Get a specific task |
| POST | `/api/tasks` | Create a new task |
| PUT | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |

### Projects

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/projects` | List all projects |
| GET | `/api/projects/:id` | Get a specific project |
| POST | `/api/projects` | Create a new project |
| PUT | `/api/projects/:id` | Update a project |
| DELETE | `/api/projects/:id` | Delete a project |

### Users

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users/me` | Get current user |
| PUT | `/api/users/me` | Update current user |
| GET | `/api/users/:id` | Get a specific user |

## Request Format

### Headers

```http
Content-Type: application/json
Cookie: connect.sid=your-session-cookie
```

### Query Parameters

Filter and pagination:

```http
GET /api/tasks?status=incomplete&limit=20&offset=0
```

### Request Body

```json
{
  "title": "New Task",
  "description": "Task description",
  "dueDate": "2025-12-31T23:59:59Z",
  "priority": "high",
  "tags": ["work", "urgent"]
}
```

## Response Format

### Success Response

```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Task Title",
    "description": "Description"
  }
}
```

### Error Response

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid task data",
    "details": {
      "title": "Title is required"
    }
  }
}
```

## HTTP Status Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 500 | Internal Server Error |

## Rate Limiting

Currently, there are no rate limits on the API. This may change in future versions.

## Pagination

List endpoints support pagination:

```http
GET /api/tasks?limit=20&offset=40
```

**Response**:
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "total": 100,
    "limit": 20,
    "offset": 40,
    "hasMore": true
  }
}
```

## Filtering

Use query parameters to filter results:

```http
GET /api/tasks?status=incomplete&priority=high&tag=work
```

## Sorting

Sort results using the `sort` parameter:

```http
GET /api/tasks?sort=dueDate:asc
GET /api/tasks?sort=priority:desc,createdAt:desc
```

## Webhooks

Configure webhooks to receive real-time updates:

```http
POST /api/webhooks
Content-Type: application/json

{
  "url": "https://your-app.com/webhook",
  "events": ["task.created", "task.updated", "task.completed"]
}
```

Supported events:
- `task.created`
- `task.updated`
- `task.deleted`
- `task.completed`
- `project.created`
- `project.updated`

## Examples

### Create a Task

```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -H "Cookie: connect.sid=your-session" \
  -d '{
    "title": "Review API documentation",
    "description": "Review and update API docs",
    "priority": "medium",
    "dueDate": "2025-11-01T17:00:00Z",
    "tags": ["documentation", "api"]
  }'
```

### Get All Tasks

```bash
curl http://localhost:3000/api/tasks \
  -H "Cookie: connect.sid=your-session"
```

### Update a Task

```bash
curl -X PUT http://localhost:3000/api/tasks/123 \
  -H "Content-Type: application/json" \
  -H "Cookie: connect.sid=your-session" \
  -d '{
    "status": "completed"
  }'
```

### Delete a Task

```bash
curl -X DELETE http://localhost:3000/api/tasks/123 \
  -H "Cookie: connect.sid=your-session"
```

## Client Libraries

Official client libraries:

- **JavaScript/TypeScript**: `npm install tududi-client`
- **Python**: `pip install tududi`
- **Go**: `go get github.com/tududi/tududi-go`

Example with JavaScript client:

```typescript
import { TududiClient } from 'tududi-client';

const client = new TududiClient({
  baseURL: 'http://localhost:3000',
  credentials: {
    username: 'user@example.com',
    password: 'password'
  }
});

// Create a task
const task = await client.tasks.create({
  title: 'New Task',
  priority: 'high'
});

// List tasks
const tasks = await client.tasks.list({
  status: 'incomplete',
  limit: 20
});
```

## Next Steps

- [Authentication API](/api/authentication) - Detailed auth documentation
- [Tasks API](/api/tasks) - Complete tasks endpoint reference
- [Users API](/api/users) - User management endpoints
