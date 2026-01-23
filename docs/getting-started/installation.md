---
sidebar_position: 4
---

# Installation

**Local development setup for contributors and customizers.**

Want to just use tududi? Check out the **[Quick Start](/getting-started/quick-start)** instead - you can have tududi running with Docker in 2 minutes.

This guide is for developers who want to:
- Contribute to tududi
- Customize the codebase
- Run from source for development
- Work on features and bug fixes

---

## Prerequisites

Ensure you have these installed:

- **Node.js** (version 20 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** - [Download](https://git-scm.com/)
- **SQLite3** (usually pre-installed on macOS/Linux)

---

## Setup Steps

### 1. Clone the Repository

```bash
git clone https://github.com/chrisvel/tududi.git
cd tududi
```

### 2. Install Dependencies

```bash
npm install
```

This installs all packages for both frontend and backend.

### 3. Configure Environment Variables

Copy the example env file, then adjust values for local development:

```bash
# From repo root
cp backend/.env.example backend/.env

# backend/.env
NODE_ENV=development
TUDUDI_USER_EMAIL=test@tududi.com
TUDUDI_USER_PASSWORD=password123
TUDUDI_SESSION_SECRET=$(openssl rand -hex 64)
```

Keep `NODE_ENV=development` for local development to avoid production defaults.

Or export them directly:

```bash
export NODE_ENV=development
export TUDUDI_SESSION_SECRET=$(openssl rand -hex 64)
export TUDUDI_USER_EMAIL=test@tududi.com
export TUDUDI_USER_PASSWORD=password123
```

### 4. Initialize Database

```bash
npm run db:init
```

This creates the SQLite database and all necessary tables.

### 5. Start Development Servers

You need **two terminal windows**:

**Terminal 1 - Backend:**
```bash
npm run backend:dev
```
Runs on `http://localhost:3002`

**Terminal 2 - Frontend:**
```bash
npm run frontend:dev
```
Runs on `http://localhost:8080`

### 6. Open tududi

Navigate to:
```
http://localhost:8080
```

Log in with:
- Email: `test@tududi.com`
- Password: `password123`

---

## Development Workflow

### Common Commands

```bash
# Backend
npm run backend:dev          # Start backend dev server
npm run backend:test         # Run backend tests
npm run backend:lint         # Lint backend code

# Frontend
npm run frontend:dev         # Start frontend dev server
npm run frontend:test        # Run frontend tests
npm run frontend:build       # Build for production

# Database
npm run db:init              # Create database and tables
npm run db:reset             # Reset database (deletes all data!)
npm run db:migrate           # Run pending migrations
npm run migration:create     # Create new migration
```

### Port Reference

| Component | Port | URL |
|-----------|------|-----|
| Frontend (dev) | 8080 | http://localhost:8080 |
| Backend API | 3002 | http://localhost:3002 |
| Docker (production) | 3002 | http://localhost:3002 |

The webpack dev server proxies API calls to the backend automatically.

---

## Database Development

tududi uses **SQLite** with **Sequelize ORM**.

### Database Commands

```bash
# Create/recreate database
npm run db:init

# Sync models to database
npm run db:sync

# Run migrations
npm run db:migrate

# Check migration status
npm run migration:status
```

### Creating Migrations

When you need to modify the database schema:

```bash
# 1. Create migration file
npm run migration:create add-completed-at-to-tasks

# 2. Edit the generated file in backend/migrations/
# Define 'up' (apply change) and 'down' (revert change)

# 3. Run migration
npm run migration:run

# 4. If needed, rollback
npm run migration:undo
```

---

## Contributing

### Before Submitting a PR

1. **Run tests**: Ensure all tests pass
   ```bash
   npm run backend:test
   npm run frontend:test
   ```

2. **Check linting**: Fix any linting errors
   ```bash
   npm run backend:lint
   npm run frontend:lint
   ```

3. **Test migrations**: If you added migrations, test both up and down
   ```bash
   npm run migration:run
   npm run migration:undo
   npm run migration:run
   ```

4. **Manual testing**: Verify your changes work in the UI

### Code Style

- **Backend**: Follow existing Node.js/Express patterns
- **Frontend**: React with TypeScript, functional components
- **Formatting**: Project uses Prettier (configured in package.json)

---

## Troubleshooting Development

### Port Already in Use

```bash
# Find and kill process using port 3002 or 8080
lsof -i :3002
kill -9 <PID>
```

### Database Issues

```bash
# Reset database completely
npm run db:reset

# Verify database file exists
ls -la backend/db/
```

### Module Not Found

```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

### Hot Reload Not Working

- Check both servers are running
- Clear browser cache
- Check browser console for errors

---

## Next Steps for Contributors

- **Read the codebase**: Start with `backend/server.js` and `frontend/App.tsx`
- **Check open issues**: Visit [GitHub Issues](https://github.com/chrisvel/tududi/issues)
- **Join Discord**: Get help from the community
- **Submit PRs**: Follow the contribution guidelines

For production deployment, use the **Docker quick start** at the top of this page.
