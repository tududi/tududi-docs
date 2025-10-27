# tududi Documentation

This repository contains the official documentation for [tududi](https://tududi.com) - a self-hosted task management application with hierarchical organization, multi-language support, and Telegram integration.

## Built With

This documentation site is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## Installation

```bash
npm install
```

## Local Development

```bash
npm start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Build

```bash
npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Deployment to GitHub Pages

This site is configured to deploy to GitHub Pages at: https://tududi.github.io/tududi-docs/

### Prerequisites

1. Create a GitHub repository named `tududi-docs` under the `tududi` organization/user
2. Push this code to the repository

### Option 1: Automatic Deployment (Recommended)

The site will automatically deploy when you push to the `main` branch using GitHub Actions.

**Setup Steps:**

1. Push your code to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/tududi/tududi-docs.git
   git push -u origin main
   ```

2. Enable GitHub Pages in your repository:
   - Go to repository **Settings** → **Pages**
   - Under **Source**, select **GitHub Actions**
   - The workflow will automatically run on every push to `main`

3. Access your site at: https://tududi.github.io/tududi-docs/

### Option 2: Manual Deployment

Deploy manually using the Docusaurus deployment command:

```bash
# Using SSH (if you have SSH keys set up)
USE_SSH=true npm run deploy

# Using HTTPS (enter credentials when prompted)
GIT_USER=<Your GitHub username> npm run deploy
```

This command builds the website and pushes to the `gh-pages` branch.

### Custom Domain (Optional)

To use a custom domain like `docs.tududi.com`:

1. Add a `CNAME` file to the `static` folder:
   ```bash
   echo "docs.tududi.com" > static/CNAME
   ```

2. Update `docusaurus.config.ts`:
   ```typescript
   url: 'https://docs.tududi.com',
   baseUrl: '/',
   ```

3. Configure DNS:
   - Add a CNAME record pointing `docs.tududi.com` to `tududi.github.io`

4. In GitHub repository settings:
   - Go to **Settings** → **Pages**
   - Enter your custom domain
   - Enable "Enforce HTTPS"

## Contributing

Contributions to improve the documentation are welcome! Please feel free to submit issues or pull requests.

## Documentation Structure

```
docs/
├── intro.md
├── getting-started/
│   ├── installation.md
│   ├── configuration.md
│   └── first-steps.md
├── features/
│   ├── task-management.md
│   ├── hierarchical-organization.md
│   ├── multi-language.md
│   └── telegram-integration.md
├── guides/
│   ├── docker-deployment.md
│   ├── database-setup.md
│   └── backup-restore.md
└── api/
    ├── overview.md
    ├── authentication.md
    ├── tasks.md
    └── users.md
```

## License

ISC

## Testing the Build

Before deploying, test the production build locally:

```bash
npm run build
npm run serve
```

This will serve the built site at http://localhost:3000

## Troubleshooting

### Broken Links After Deployment

If links are broken after deployment, verify:
- `baseUrl` in `docusaurus.config.ts` matches your deployment path
- For project repos: `baseUrl: '/tududi-docs/'`
- For custom domains: `baseUrl: '/'`

### 404 Page Not Found

Ensure GitHub Pages is:
- Enabled in repository settings
- Set to deploy from the `gh-pages` branch (manual) or GitHub Actions (automatic)

### Build Fails

Clear cache and rebuild:
```bash
npm run clear
rm -rf node_modules package-lock.json
npm install
npm run build
```

## Links

- [tududi Main Repository](https://github.com/tududi/tududi)
- [Documentation Site](https://tududi.github.io/tududi-docs/)
- [Issue Tracker](https://github.com/tududi/tududi/issues)
