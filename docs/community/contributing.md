---
sidebar_position: 1
---

# Contributing to tududi

Thank you for your interest in contributing to tududi! This guide will help you get started with contributing to the project.

## Ways to Contribute

There are many ways you can contribute to tududi:

- 🐛 **Report bugs** - Help us identify and fix issues
- ✨ **Request features** - Suggest new features or improvements
- 💻 **Submit code** - Fix bugs or implement new features
- 📝 **Improve documentation** - Help make our docs better
- 🌍 **Add translations** - Help make tududi available in more languages
- 💬 **Help others** - Answer questions in discussions or Discord

## Getting Started

### 1. Fork the Repository

Visit the [tududi repository](https://github.com/chrisvel/tududi) and click the "Fork" button to create your own copy.

### 2. Clone Your Fork

```bash
git clone https://github.com/YOUR_USERNAME/tududi.git
cd tududi
```

### 3. Set Up Development Environment

Follow the [installation guide](/getting-started/installation) for setting up a local development environment.

```bash
# Install dependencies
npm install

# Set up environment variables
export TUDUDI_SESSION_SECRET=$(openssl rand -hex 64)
export TUDUDI_USER_EMAIL=dev@example.com
export TUDUDI_USER_PASSWORD=password123

# Initialize database
npm run db:init

# Start development servers (two terminals)
npm run backend:dev    # Terminal 1
npm run frontend:dev   # Terminal 2
```

### 4. Create a Branch

Create a new branch for your changes:

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
```

## Development Workflow

### Making Changes

1. **Write clean code** - Follow the existing code style
2. **Test your changes** - Ensure everything works as expected
3. **Update documentation** - Document new features or changes
4. **Commit your changes** - Write clear, descriptive commit messages

### Commit Message Guidelines

Use clear, descriptive commit messages:

```bash
# Good examples
git commit -m "Add recurring task support for monthly patterns"
git commit -m "Fix timezone issue in due date calculations"
git commit -m "Update Telegram integration documentation"

# Bad examples
git commit -m "fix stuff"
git commit -m "updates"
```

### Running Tests

Before submitting your contribution:

```bash
# Run backend tests
npm run backend:test

# Run frontend tests
npm run frontend:test

# Check for linting errors
npm run backend:lint
npm run frontend:lint
```

### Testing Migrations

If you've added database migrations:

```bash
# Test migration up
npm run migration:run

# Test migration down
npm run migration:undo

# Run migration up again
npm run migration:run
```

## Submitting Your Contribution

### 1. Push to Your Fork

```bash
git push origin feature/your-feature-name
```

### 2. Create a Pull Request

1. Go to the [tududi repository](https://github.com/chrisvel/tududi)
2. Click "Pull Requests" → "New Pull Request"
3. Click "compare across forks"
4. Select your fork and branch
5. Fill out the pull request template with:
   - **Description** - What does this PR do?
   - **Motivation** - Why is this change needed?
   - **Testing** - How did you test this?
   - **Screenshots** - For UI changes

### 3. Code Review

- Maintainers will review your PR
- Address any feedback or requested changes
- Once approved, your PR will be merged!

## Code Style Guidelines

### Backend (Node.js/Express)

- Use ES6+ features
- Follow existing patterns for routes and controllers
- Use async/await for asynchronous operations
- Add JSDoc comments for complex functions

### Frontend (React/TypeScript)

- Use functional components with hooks
- Follow TypeScript best practices
- Use existing UI components when possible
- Keep components focused and reusable

### Database

- Use Sequelize migrations for schema changes
- Always provide both `up` and `down` migrations
- Test migrations before submitting

## Contributing Translations

tududi supports 24 languages. To add or improve translations:

1. Navigate to `frontend/locales/`
2. Create or edit the language folder (e.g., `es/`, `fr/`)
3. Update translation files following the structure in `en/`
4. Test the translations in the UI
5. Submit a pull request

**Current languages:**
- Arabic, Bulgarian, Chinese, Danish, Dutch, English, Finnish, French, German, Greek, Indonesian, Italian, Japanese, Korean, Norwegian, Polish, Portuguese, Romanian, Russian, Spanish, Slovenian, Swedish, Turkish, Ukrainian, Vietnamese

## Reporting Security Issues

If you discover a security vulnerability, please **do not** open a public issue. Instead:

1. Email security concerns to: **info@tududi.com**
2. Include detailed information about the vulnerability
3. Allow time for the issue to be fixed before public disclosure

We take security seriously and will respond promptly to security reports.

## Community Guidelines

### Code of Conduct

- Be respectful and inclusive
- Welcome newcomers and help them get started
- Focus on constructive feedback
- Respect different viewpoints and experiences

### Getting Help

Need help with contributing?

- **Discord**: [Join our server](https://discord.gg/fkbeJ9CmcH)
- **Reddit**: [r/tududi](https://www.reddit.com/r/tududi/)
- **GitHub Discussions**: [Ask questions](https://github.com/chrisvel/tududi/discussions)

## Project Structure

Understanding the codebase structure:

```
tududi/
├── backend/           # Node.js/Express backend
│   ├── routes/       # API routes
│   ├── controllers/  # Route handlers
│   ├── models/       # Sequelize models
│   ├── migrations/   # Database migrations
│   └── services/     # Business logic
├── frontend/         # React/TypeScript frontend
│   ├── components/   # React components
│   ├── pages/        # Page components
│   ├── hooks/        # Custom React hooks
│   ├── stores/       # Zustand state stores
│   └── locales/      # Translation files
└── docs/            # Documentation (this site!)
```

## Recognition

Contributors are recognized in:
- GitHub contributors list
- Release notes for significant contributions
- Community shoutouts on Discord and Reddit

Thank you for contributing to tududi and helping make it better for everyone! 🎉

## Additional Resources

- **[Bug Reports](/community/bug-reports)** - How to report bugs effectively
- **[Feature Requests](/community/feature-requests)** - How to suggest new features
- **[Development Installation](/getting-started/installation)** - Detailed setup guide
- **[GitHub Repository](https://github.com/chrisvel/tududi)** - Main codebase
- **[Project Roadmap](https://github.com/users/chrisvel/projects/2)** - See what's planned
