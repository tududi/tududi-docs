---
sidebar_position: 1
---

# Contributing

Thank you for your interest in contributing to tududi!

## Quick Start

1. **Fork & Clone**
   ```bash
   git clone https://github.com/YOUR_USERNAME/tududi.git
   cd tududi
   ```

2. **Set Up Environment**
   ```bash
   npm install
   export TUDUDI_SESSION_SECRET=$(openssl rand -hex 64)
   export TUDUDI_USER_EMAIL=dev@example.com
   export TUDUDI_USER_PASSWORD=password123
   npm run db:init
   ```

3. **Start Development**
   ```bash
   npm run backend:dev    # Terminal 1
   npm run frontend:dev   # Terminal 2
   ```

4. **Create Branch & Make Changes**
   ```bash
   git checkout -b feature/your-feature-name
   # Make your changes
   git commit -m "Clear description of changes"
   git push origin feature/your-feature-name
   ```

5. **Open Pull Request**
   - Go to [github.com/chrisvel/tududi](https://github.com/chrisvel/tududi)
   - Click "Pull Requests" → "New Pull Request"
   - Describe your changes and submit

## Ways to Contribute

- 🐛 [Report bugs](/community/bug-reports)
- ✨ [Request features](/community/feature-requests)
- 💻 Submit code fixes or new features
- 📝 Improve documentation
- 🌍 Add translations (24 languages supported)

## Code Guidelines

### Commit Messages
```bash
# Good
git commit -m "Add recurring task support for monthly patterns"
git commit -m "Fix timezone issue in due date calculations"

# Bad
git commit -m "fix stuff"
git commit -m "updates"
```

### Testing
```bash
npm run backend:test
npm run frontend:test
npm run backend:lint
npm run frontend:lint
```

### Translations
Add or improve translations in `public/locales/[language]/` [here](https://github.com/chrisvel/tududi/tree/main/public/locales)

## Security Issues

**Do not open public issues for security vulnerabilities.**

Email: **info@tududi.com**

## Get Help

- **Discord**: [discord.gg/fkbeJ9CmcH](https://discord.gg/fkbeJ9CmcH)
- **Reddit**: [r/tududi](https://www.reddit.com/r/tududi/)
- **GitHub**: [Discussions](https://github.com/chrisvel/tududi/discussions)

## Resources

- [GitHub Repository](https://github.com/chrisvel/tududi)
- [Project Roadmap](https://github.com/users/chrisvel/projects/2)
- [Issues](https://github.com/chrisvel/tududi/issues)
