---
sidebar_position: 3
---

# Tasks API

Complete reference for the Tasks API endpoints.

## List Tasks

Get a list of tasks with optional filtering.

```http
GET /api/tasks
```

### Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `status` | string | Filter by status (`incomplete`, `complete`) |
| `priority` | string | Filter by priority (`low`, `medium`, `high`) |
| `tag` | string | Filter by tag |
| `project` | number | Filter by project ID |
| `search` | string | Search in title and description |
| `limit` | number | Number of results (default: 50, max: 100) |
| `offset` | number | Pagination offset (default: 0) |
| `sort` | string | Sort field and order (e.g., `dueDate:asc`) |

### Example Request

```http
GET /api/tasks?status=incomplete&priority=high&limit=20&sort=dueDate:asc
```

### Response

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Complete project proposal",
      "description": "Write and submit the Q4 project proposal",
      "status": "incomplete",
      "priority": "high",
      "dueDate": "2025-10-30T17:00:00Z",
      "tags": ["work", "urgent"],
      "projectId": 5,
      "createdAt": "2025-10-20T10:00:00Z",
      "updatedAt": "2025-10-25T14:30:00Z"
    }
  ],
  "pagination": {
    "total": 45,
    "limit": 20,
    "offset": 0,
    "hasMore": true
  }
}
```

## Get Task

Get a specific task by ID.

```http
GET /api/tasks/:id
```

### Response

```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Complete project proposal",
    "description": "Write and submit the Q4 project proposal",
    "status": "incomplete",
    "priority": "high",
    "dueDate": "2025-10-30T17:00:00Z",
    "tags": ["work", "urgent"],
    "projectId": 5,
    "subtasks": [
      {
        "id": 2,
        "title": "Research competitors",
        "status": "complete"
      }
    ],
    "createdAt": "2025-10-20T10:00:00Z",
    "updatedAt": "2025-10-25T14:30:00Z"
  }
}
```

## Create Task

Create a new task.

```http
POST /api/tasks
Content-Type: application/json

{
  "title": "New task",
  "description": "Task description",
  "priority": "medium",
  "dueDate": "2025-11-15T17:00:00Z",
  "tags": ["work"],
  "projectId": 5
}
```

### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | Yes | Task title (max 255 chars) |
| `description` | string | No | Task description (Markdown supported) |
| `status` | string | No | `incomplete` or `complete` (default: `incomplete`) |
| `priority` | string | No | `low`, `medium`, or `high` (default: `medium`) |
| `dueDate` | string | No | ISO 8601 date-time |
| `tags` | array | No | Array of tag strings |
| `projectId` | number | No | Parent project ID |
| `parentId` | number | No | Parent task ID (for subtasks) |

### Response (201 Created)

```json
{
  "success": true,
  "data": {
    "id": 42,
    "title": "New task",
    "description": "Task description",
    "status": "incomplete",
    "priority": "medium",
    "dueDate": "2025-11-15T17:00:00Z",
    "tags": ["work"],
    "projectId": 5,
    "createdAt": "2025-10-25T15:00:00Z",
    "updatedAt": "2025-10-25T15:00:00Z"
  }
}
```

## Update Task

Update an existing task.

```http
PUT /api/tasks/:id
Content-Type: application/json

{
  "title": "Updated title",
  "status": "complete",
  "priority": "low"
}
```

### Response (200 OK)

```json
{
  "success": true,
  "data": {
    "id": 42,
    "title": "Updated title",
    "status": "complete",
    "priority": "low",
    "updatedAt": "2025-10-25T15:30:00Z"
  }
}
```

## Delete Task

Delete a task.

```http
DELETE /api/tasks/:id
```

### Response (200 OK)

```json
{
  "success": true,
  "message": "Task deleted successfully"
}
```

## Batch Operations

### Batch Update

Update multiple tasks at once.

```http
PUT /api/tasks/batch
Content-Type: application/json

{
  "ids": [1, 2, 3],
  "updates": {
    "status": "complete",
    "tags": ["archived"]
  }
}
```

### Batch Delete

Delete multiple tasks.

```http
DELETE /api/tasks/batch
Content-Type: application/json

{
  "ids": [1, 2, 3]
}
```

## Subtasks

### List Subtasks

```http
GET /api/tasks/:id/subtasks
```

### Create Subtask

```http
POST /api/tasks/:id/subtasks
Content-Type: application/json

{
  "title": "Subtask title",
  "description": "Subtask description"
}
```

## Task Comments

### List Comments

```http
GET /api/tasks/:id/comments
```

### Add Comment

```http
POST /api/tasks/:id/comments
Content-Type: application/json

{
  "content": "This is a comment",
  "mentions": ["@john", "@sarah"]
}
```

## Task Attachments

### List Attachments

```http
GET /api/tasks/:id/attachments
```

### Upload Attachment

```http
POST /api/tasks/:id/attachments
Content-Type: multipart/form-data

file: [binary data]
```

### Delete Attachment

```http
DELETE /api/tasks/:id/attachments/:attachmentId
```

## Error Responses

### Validation Error (400)

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid task data",
    "details": {
      "title": "Title is required",
      "priority": "Must be one of: low, medium, high"
    }
  }
}
```

### Not Found (404)

```json
{
  "success": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "Task not found"
  }
}
```

### Unauthorized (401)

```json
{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Authentication required"
  }
}
```

## Examples

### Create a Task with Subtasks

```javascript
// Create parent task
const parent = await fetch('http://localhost:3000/api/tasks', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  credentials: 'include',
  body: JSON.stringify({
    title: 'Website Redesign',
    priority: 'high'
  })
});

const parentData = await parent.json();

// Create subtasks
const subtasks = [
  'Design mockups',
  'Develop frontend',
  'Test and deploy'
];

for (const title of subtasks) {
  await fetch('http://localhost:3000/api/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({
      title,
      parentId: parentData.data.id
    })
  });
}
```

## Next Steps

- [Users API](/docs/api/users) - User management
- [Authentication](/docs/api/authentication) - API authentication
