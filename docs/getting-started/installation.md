---
sidebar_position: 1
---

# Installation

This guide will walk you through installing Tududi on your system.

## Prerequisites

Before installing Tududi, make sure you have the following installed:

- **Node.js** (version 16 or higher)
- **npm** (comes with Node.js)
- **Git** (for cloning the repository)

## Installation Methods

### Option 1: Docker (Recommended)

The easiest way to run Tududi is using Docker:

```bash
# Clone the repository
git clone https://github.com/tududi/tududi.git
cd tududi

# Build and run with Docker Compose
docker-compose up -d
```

The application will be available at `http://localhost:3000`.

### Option 2: Manual Installation

#### 1. Clone the Repository

```bash
git clone https://github.com/tududi/tududi.git
cd tududi
```

#### 2. Install Dependencies

```bash
npm install
```

#### 3. Configure Environment

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit the `.env` file with your configuration:

```env
NODE_ENV=production
PORT=3000
SESSION_SECRET=your-secret-key-here
DATABASE_PATH=./tududi.db
```

#### 4. Initialize Database

```bash
npm run db:init
npm run db:migrate
```

#### 5. Build the Application

```bash
npm run build
```

#### 6. Start the Application

For development:
```bash
npm run dev
```

For production:
```bash
npm start
```

## Verification

Once the installation is complete, open your browser and navigate to:

```
http://localhost:3000
```

You should see the Tududi login page.

## Next Steps

- [Configuration](/getting-started/configuration) - Configure your Tududi instance
- [First Steps](/getting-started/first-steps) - Create your first task
- [Docker Deployment](/guides/docker-deployment) - Deploy with Docker

## Troubleshooting

### Port Already in Use

If port 3000 is already in use, you can change it in the `.env` file:

```env
PORT=8080
```

### Database Issues

If you encounter database issues, try resetting the database:

```bash
npm run db:reset
npm run db:migrate
```

### Module Not Found Errors

Make sure all dependencies are installed:

```bash
rm -rf node_modules package-lock.json
npm install
```
