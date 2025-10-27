---
sidebar_position: 1
slug: /
---

# Introduction 

## What is tududi?

tududi is a self-hosted, open-source task management and life organization system designed to give you complete control over your productivity data. Built with privacy as a core principle, tududi provides a powerful alternative to cloud-based task management tools while offering the flexibility to organize your work and life exactly the way you want.

Unlike rigid productivity systems that force you into their workflows, tududi adapts to how you think and work. Whether you're managing personal projects, coordinating with a team, or organizing every aspect of your life, tududi provides the structure and tools you need without getting in your way.

## Why tududi?

### Privacy First
Your tasks, projects, and notes stay on your server. No third-party access, no data mining, no surprise policy changes. You own your data, period.

### Flexible Organization
Organize tasks into projects, group projects into areas, and tag everything for easy filtering. Create custom views that match exactly how you want to see your work.

### Built for Collaboration
Share projects with teammates using granular permission controls. Give read-only access for stakeholders or full edit access for collaborators.

### Capture Ideas Anywhere
Integrate with Telegram to capture tasks on the go. Ideas come to you anywhere - your task manager should too.

### Truly Self-Hosted
Run tududi on your own infrastructure with a single Docker command. No monthly fees, no user limits, no feature paywalls.

## Core Features

### Task Management
- **Hierarchical Organization** - Tasks → Projects → Areas
- **Smart Status Tracking** - Five status levels plus archive
- **Subtasks** - Break complex work into manageable pieces
- **Due Dates & Priorities** - Focus on what matters when it matters
- **Recurring Tasks** - Sophisticated scheduling with multiple recurrence patterns

### Collaboration
- **Project Sharing** - Invite team members to specific projects
- **Permission Levels** - Read-only or read-write access control
- **Multi-User Support** - Role-based access with admin capabilities
- **Audit Trail** - Track who did what and when

### Organization Tools
- **Custom Views** - Create filtered views and pin your favorites
- **Universal Search** - Find tasks, projects, notes, and tags instantly
- **Multiple View Modes** - Today, Upcoming, Someday, or build your own
- **Flexible Sorting** - Order by priority, due date, name, or creation date
- **Tags** - Apply flexible labels across tasks and notes

### Quick Capture & Notes
- **Inbox** - Process ideas captured from Telegram into actionable items
- **Notes** - Create project documentation or standalone notes
- **Markdown Support** - Rich text formatting for detailed documentation

### Telegram Integration
- **Create Tasks via Messages** - Send a message, create a task
- **Daily Summaries** - Automatic task digest notifications
- **Always Available** - Your task manager in your pocket

### Modern Experience
- **Responsive Design** - Works beautifully on desktop, tablet, and mobile
- **Dark Mode** - Easy on the eyes with automatic theme detection
- **24 Languages** - Full internationalization support
- **Calendar View** - Visual task scheduling
- **Productivity Metrics** - Track your progress and patterns

## Technology Stack

tududi is built with modern, battle-tested technologies:

**Frontend:**
- React 18 with TypeScript for type-safe, interactive UI
- Tailwind CSS for responsive, modern design
- Zustand for lightweight state management
- SWR for efficient data fetching

**Backend:**
- Node.js with Express.js for robust API
- SQLite for reliable, file-based data storage
- Sequelize ORM for database management
- Session-based authentication with bcrypt security

**Deployment:**
- Docker containerization for simple deployment
- Single-command setup with environment configuration
- Built-in migrations for smooth database updates

## Who is tududi For?

### Individuals
- You want full control over your productivity data
- You need a flexible system that adapts to your workflow
- You value privacy and self-hosting
- You manage complex projects with many moving parts

### Teams
- You need private, self-hosted collaboration tools
- You want granular control over who sees what
- You're tired of per-user pricing from SaaS tools
- You want to own your team's data

### Power Users
- You need hierarchical organization (areas > projects > tasks)
- You want custom views and advanced filtering
- You integrate productivity tools with Telegram
- You appreciate open-source software you can customize

## Getting Started

### 🚀 Quick Start (2 Minutes)

Get tududi running with one Docker command:

```bash
docker run \
  -e TUDUDI_USER_EMAIL=admin@example.com \
  -e TUDUDI_USER_PASSWORD=securepass \
  -e TUDUDI_SESSION_SECRET=$(openssl rand -hex 64) \
  -v ~/tududi_db:/app/backend/db \
  -v ~/tududi_uploads:/app/backend/uploads \
  -p 3002:3002 \
  -d chrisvel/tududi:latest
```

Access at `http://localhost:3002` → **[Full Quick Start Guide](/getting-started/quick-start)**

### 👨‍💻 Development Setup

For contributors:

1. Clone: `git clone https://github.com/chrisvel/tududi.git`
2. Install: `npm install`
3. Setup: Configure environment variables
4. Run: `npm run backend:dev` + `npm run frontend:dev`

**[Full Installation Guide](/getting-started/installation)**

## Philosophy

tududi is built on the principle that your task management system should work for you, not against you. It should:

- **Adapt to you** - Not force you into rigid workflows
- **Respect your privacy** - Keep your data under your control
- **Stay out of your way** - Provide structure without complexity
- **Grow with you** - Scale from personal use to team collaboration
- **Remain accessible** - Open source and self-hosted forever

## Project Status

tududi is actively developed and approaching version 1.0. The current release (v0.85-beta.1) is stable for production use with comprehensive features and ongoing improvements.

**License:** MIT
**Repository:** https://github.com/chrisvel/tududi
**Community:** Discord and Reddit available for support

## What's Next?

Ready to get started?

1. **[Quick Start](/getting-started/quick-start)** - Get tududi running in 2 minutes with Docker
2. **[First Steps](/getting-started/first-steps)** - Learn the basics and create your first tasks
3. **[Project Sharing](/features/project-sharing)** - Collaborate with your team
4. **[Configuration](/getting-started/configuration)** - Advanced setup and production deployment

Or jump straight into the full documentation to explore:
- Setting up your first projects and organizing work effectively
- Using recurring tasks to automate repetitive work
- Custom views and personalized workflows
- Power user tips and advanced features

Welcome to tududi - your tasks, your way.

