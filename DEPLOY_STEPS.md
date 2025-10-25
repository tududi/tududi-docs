# Deploy Steps - Stay on Master Branch

You don't need to manually create gh-pages! GitHub Actions will do it automatically.

## ✅ Steps to Deploy (Stay on Master)

### Step 1: Verify GitHub Actions Workflow Exists

```bash
# Check the workflow file exists
cat .github/workflows/deploy.yml
```

✅ You already have the workflow configured!

### Step 2: Push to GitHub (if needed)

```bash
# Make sure everything is pushed
git push origin master
```

### Step 3: Enable GitHub Pages with GitHub Actions

Go to your repository on GitHub:

**https://github.com/tududi/tududi-docs/settings/pages**

Configure:
1. **Source**: Select **"GitHub Actions"** (NOT "Deploy from a branch")
2. **Custom domain**: Enter `docs.tududi.com`
3. Click **Save**

### Step 4: Trigger Deployment

**Option A**: Push any change to master
```bash
# Make a small change
echo "# Deployed" >> DEPLOY_STEPS.md
git add DEPLOY_STEPS.md
git commit -m "Trigger deployment"
git push origin master
```

**Option B**: Manually trigger workflow
1. Go to: https://github.com/tududi/tududi-docs/actions
2. Click "Deploy to GitHub Pages" workflow
3. Click "Run workflow" → "Run workflow"

### Step 5: Monitor Deployment

1. Go to: https://github.com/tududi/tududi-docs/actions
2. Watch the workflow run (takes 1-2 minutes)
3. Green checkmark ✅ = success!

### Step 6: Test Your Site

Wait 2-3 minutes after deployment completes, then visit:

**https://docs.tududi.com**

(Use HTTPS, not HTTP!)

## What GitHub Actions Does

The workflow automatically:
1. ✅ Checks out your code from master
2. ✅ Installs dependencies
3. ✅ Builds the site
4. ✅ Creates/updates gh-pages branch
5. ✅ Deploys to GitHub Pages

**You never need to touch the gh-pages branch!** Stay on master for all your work.

## Troubleshooting

### GitHub Pages Settings Not Available?

Make sure your repository is:
- Public (or you have GitHub Pro/Enterprise for private repos)
- Settings → Pages is accessible

### Workflow Not Running?

Check:
1. `.github/workflows/deploy.yml` exists in master branch
2. GitHub Actions is enabled: Settings → Actions → General
3. Workflow permissions: Settings → Actions → General → Workflow permissions → "Read and write permissions"

### Deployment Fails?

Check workflow logs:
1. Go to Actions tab
2. Click on failed workflow
3. Expand job steps to see error
4. Common fix: Enable workflow write permissions (see above)

## Summary

**All you need to do:**
1. Work on **master** branch only
2. Push changes to GitHub
3. GitHub Actions automatically deploys
4. Visit https://docs.tududi.com

**Never manually work with gh-pages branch!**
