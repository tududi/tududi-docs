# GitHub Pages Deployment Guide

Complete guide for deploying Tududi documentation to GitHub Pages.

## Quick Start

Your site will be available at: **https://tududi.github.io/tududi-docs/**

## Initial Setup

### 1. Create GitHub Repository

```bash
# Create a new repository on GitHub named 'tududi-docs'
# Then initialize and push your local repository
git init
git add .
git commit -m "Initial documentation setup"
git branch -M main
git remote add origin https://github.com/tududi/tududi-docs.git
git push -u origin main
```

### 2. Configure GitHub Pages

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under **Build and deployment**:
   - Source: Select **GitHub Actions**
4. Save changes

The first deployment will happen automatically when you push to `main`.

## Deployment Methods

### Method 1: Automatic with GitHub Actions (Recommended)

The repository includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that:
- Triggers on every push to `main` branch
- Can be manually triggered from the Actions tab
- Builds and deploys automatically

**How to deploy:**
```bash
git add .
git commit -m "Update documentation"
git push origin main
```

The workflow will:
1. Checkout code
2. Install dependencies
3. Build the site
4. Deploy to GitHub Pages

**Monitor deployment:**
- Go to the **Actions** tab in your repository
- Watch the deployment progress
- Site updates in 1-2 minutes

### Method 2: Manual Deployment

For manual control over deployments:

```bash
# Build the site locally first
npm run build

# Deploy using HTTPS
GIT_USER=your-github-username npm run deploy

# Or deploy using SSH (if configured)
USE_SSH=true npm run deploy
```

This pushes the built site directly to the `gh-pages` branch.

## Configuration Details

### Current Configuration

Located in `docusaurus.config.ts`:

```typescript
url: 'https://tududi.github.io',
baseUrl: '/tududi-docs/',
organizationName: 'tududi',
projectName: 'tududi-docs',
deploymentBranch: 'gh-pages',
```

### For Custom Domain

If you want to use a custom domain (e.g., `docs.tududi.com`):

#### 1. Update Configuration

```typescript
// docusaurus.config.ts
url: 'https://docs.tududi.com',
baseUrl: '/',
```

#### 2. Add CNAME File

```bash
echo "docs.tududi.com" > static/CNAME
git add static/CNAME
git commit -m "Add custom domain"
git push
```

#### 3. Configure DNS

Add a CNAME record in your DNS provider:
```
Type:  CNAME
Name:  docs (or docs.tududi.com)
Value: tududi.github.io
```

#### 4. Enable HTTPS in GitHub

1. Go to **Settings** → **Pages**
2. Enter custom domain: `docs.tududi.com`
3. Wait for DNS check (may take a few minutes)
4. Enable "Enforce HTTPS"

## Testing Before Deployment

Always test the production build locally:

```bash
# Build for production
npm run build

# Serve locally
npm run serve
```

Visit http://localhost:3000 to verify everything works.

## Deployment Checklist

Before deploying:

- [ ] Run `npm run build` successfully
- [ ] Test locally with `npm run serve`
- [ ] Check all links work
- [ ] Verify images load correctly
- [ ] Test on mobile viewport
- [ ] Review changes in git diff
- [ ] Update version/changelog if applicable

## Troubleshooting

### Issue: 404 Page Not Found

**Solution:**
1. Check GitHub Pages settings:
   - Settings → Pages → Source should be "GitHub Actions"
2. Verify deployment succeeded in Actions tab
3. Wait 2-3 minutes for DNS propagation

### Issue: Styles/Assets Missing

**Cause:** Incorrect `baseUrl` configuration

**Solution:**
- For project repos: `baseUrl: '/tududi-docs/'`
- For custom domains: `baseUrl: '/'`
- For root deployment: `baseUrl: '/'`

### Issue: GitHub Actions Fails

**Common Causes:**
1. Node version mismatch
2. Missing dependencies
3. Build errors

**Solution:**
```bash
# Test locally first
npm run build

# Check Actions logs on GitHub
# Fix any errors shown
# Commit and push again
```

### Issue: Changes Not Showing

**Solutions:**
1. Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
2. Wait 2-3 minutes for deployment to complete
3. Check Actions tab to verify deployment succeeded
4. Try incognito/private browsing mode

### Issue: "permission denied" During Deploy

**Solution:**
```bash
# Generate SSH key if using SSH
ssh-keygen -t ed25519 -C "your_email@example.com"

# Add to GitHub: Settings → SSH and GPG keys

# Or use HTTPS with personal access token
GIT_USER=your-username npm run deploy
```

## Workflow Customization

### Deploy Only on Tagged Releases

Edit `.github/workflows/deploy.yml`:

```yaml
on:
  push:
    tags:
      - 'v*'
```

### Deploy on Specific Branch

```yaml
on:
  push:
    branches:
      - production
```

### Manual Approval

Add environment protection rules:
1. Settings → Environments → github-pages
2. Add required reviewers
3. Deployments will need approval

## Monitoring

### Check Deployment Status

```bash
# View recent deployments
gh run list --workflow=deploy.yml

# View specific run
gh run view <run-id>
```

### View Logs

1. Go to repository **Actions** tab
2. Click on the latest workflow run
3. Expand job steps to see logs

## Best Practices

1. **Test Locally First**: Always run `npm run build` before deploying
2. **Use Preview Deployments**: Consider Netlify/Vercel for PR previews
3. **Version Documentation**: Tag releases for major documentation updates
4. **Monitor Analytics**: Add Google Analytics or similar
5. **Regular Updates**: Keep dependencies updated
6. **Backup**: Keep documentation source in version control

## Advanced: Multiple Environments

### Production and Staging

Create separate branches:
```bash
# Production
git push origin main

# Staging
git push origin staging
```

Configure multiple workflows or use branch-specific builds.

## Resources

- [Docusaurus Deployment Docs](https://docusaurus.io/docs/deployment)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

## Support

If you encounter issues:
1. Check [Docusaurus GitHub Issues](https://github.com/facebook/docusaurus/issues)
2. Review [GitHub Pages Status](https://www.githubstatus.com/)
3. Ask in [Tududi Discussions](https://github.com/tududi/tududi/discussions)
