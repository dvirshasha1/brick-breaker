# Branch Protection Rules Setup

## Important: Manual Configuration Required

The following branch protection rules need to be configured manually via GitHub's web interface. This document provides step-by-step instructions.

## For `develop` Branch

### Step-by-Step Configuration

1. **Navigate to Settings**
   - Go to your repository: https://github.com/dvirshasha1/brick-breaker
   - Click **Settings** tab
   - Select **Branches** from the left sidebar

2. **Create Protection Rule**
   - Click **Add rule**
   - Enter pattern: `develop`

3. **Configure Protection Settings**

   **☑ Require a pull request before merging**
   - Require approvals: `1`
   - ☑ Dismiss stale pull request approvals when new commits are pushed
   - ☐ Require review from code owners (optional)
   - ☐ Require approval of the most recent reviewable push

   **☑ Require status checks to pass before merging**
   - ☑ Require branches to be up to date before merging
   - Select status checks:
     - `quality-check (18.x)`
     - `quality-check (20.x)`
     - `tests`
     - `build`
     - `all-checks-passed`

   **Other Settings (Optional)**
   - ☐ Require code security and analysis
   - ☐ Require deployments to succeed before merging
   - ☐ Include administrators
   - ☐ Restrict who can push to matching branches
   - ☑ Allow force pushes (uncheck for stability)
   - ☑ Allow deletions (uncheck for stability)

4. **Save Rule**
   - Click **Create** button

## For `main` Branch

### Stricter Requirements for Production

1. **Navigate to Settings**
   - Go to your repository: https://github.com/dvirshasha1/brick-breaker
   - Click **Settings** tab
   - Select **Branches** from the left sidebar

2. **Create Protection Rule**
   - Click **Add rule**
   - Enter pattern: `main`

3. **Configure Protection Settings**

   **☑ Require a pull request before merging**
   - Require approvals: `2` (stricter for production)
   - ☑ Dismiss stale pull request approvals when new commits are pushed
   - ☑ Require review from code owners (if configured)

   **☑ Require status checks to pass before merging**
   - ☑ Require branches to be up to date before merging
   - Select status checks:
     - `quality-check (18.x)`
     - `quality-check (20.x)`
     - `tests`
     - `build`
     - `all-checks-passed`

   **☑ Require deployments to succeed before merging** (if you have deployment environments)

   **Security Settings**
   - ☑ Include administrators (recommended for safety)
   - ☐ Restrict who can push to matching branches
   - ☐ Allow force pushes (recommended: uncheck)
   - ☐ Allow deletions (recommended: uncheck)

4. **Save Rule**
   - Click **Create** button

## Verification

After creating the rules, verify they're active:

1. Try creating a test branch from `develop` without PR - it should be allowed
2. Try creating a test branch from `main` without PR - it should be allowed
3. Try pushing directly to `develop` - should fail (unless you're admin)
4. Create a PR to `develop` with failing tests - it should block merge
5. Once PR tests pass, merge should be allowed (with 1 approval for develop)

## CI Status Checks

Your CI pipeline provides these status checks:

| Check | Purpose | Required |
|-------|---------|----------|
| `quality-check (18.x)` | Type check & lint on Node 18 | ✅ Yes |
| `quality-check (20.x)` | Type check & lint on Node 20 | ✅ Yes |
| `tests` | Unit tests & coverage | ✅ Yes |
| `build` | Build artifacts | ✅ Yes |
| `all-checks-passed` | Final confirmation | ✅ Yes |

## Troubleshooting

### Status checks don't appear
- The workflow needs to run at least once
- Push a commit to trigger the workflow
- Wait for workflow to complete
- Refresh the branch protection settings page

### Can't select a status check
- The status check hasn't run yet
- Ensure the workflow file is in `.github/workflows/ci.yml`
- Check that the workflow has run successfully at least once

### Users can still push despite protection
- User might be repository admin
- Admin status bypasses branch protection by default
- Uncheck "Include administrators" for stricter enforcement

## Current PR Status

Your initial PR is available at:
- **PR #2**: https://github.com/dvirshasha1/brick-breaker/pull/2
- **Status**: Awaiting branch protection setup

Once branch protection is configured, the PR will require passing CI checks before merge.
