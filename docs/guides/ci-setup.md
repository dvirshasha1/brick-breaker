# GitHub Actions CI/CD Setup Guide

## Overview

This project uses GitHub Actions to automate quality checks, testing, and building. The CI pipeline ensures code quality and prevents breaking changes from being merged.

## CI Pipeline Overview

### Jobs

#### 1. Quality Checks (quality-check)
- Runs on Node.js 18.x and 20.x (matrix strategy)
- **TypeScript Type Checking**: Validates no type errors
- **ESLint**: Checks code style and quality
- **Prettier**: Validates code formatting

#### 2. Tests (tests)
- Runs unit tests with Jest
- Generates coverage reports
- Uploads coverage to Codecov
- Runs on Node.js 20.x

#### 3. Build (build)
- Builds the project with webpack
- Uploads build artifacts to workflow
- Depends on quality-check and tests jobs passing

#### 4. Status (all-checks-passed)
- Confirms all checks passed successfully
- Required before merge

## Trigger Events

The CI pipeline triggers on:

- **Push events** to:
  - `main` - production branch
  - `develop` - integration branch
  - `feature/**` - feature branches
  - `bugfix/**` - bug fix branches

- **Pull requests** to:
  - `main` - production branch
  - `develop` - integration branch

## Setting Up Branch Protection

### For `develop` branch:

1. Go to repository **Settings** → **Branches**
2. Click **Add rule** under "Branch protection rules"
3. Configure as follows:

**Pattern**: `develop`

✅ **Require a pull request before merging**
- Require approvals: 1
- Dismiss stale pull request approvals when new commits are pushed
- Require review from code owners (optional)

✅ **Require status checks to pass before merging**
- Require branches to be up to date before merging
- Status checks required:
  - `quality-check (18.x)`
  - `quality-check (20.x)`
  - `tests`
  - `build`
  - `all-checks-passed`

✅ **Additional settings** (optional but recommended):
- Require code security and analysis
- Require deployment to succeed before merging
- Include administrators (uncheck if you need flexibility)
- Restrict who can push to matching branches
- Allow force pushes (uncheck for stability)
- Allow deletions

### For `main` branch:

1. Repeat above steps with pattern: `main`
2. Increase approval requirement to: 2 (for production safety)
3. Same status checks as develop

## Local Development

### Running CI checks locally

Before pushing, run:

```bash
# Type checking
make type-check

# Linting
make lint

# Format check
make format -- --check

# Run tests
make test

# Build
make build
```

Or run all checks with:

```bash
make push  # This runs type-check, lint, test, then git push
```

## Workflow Files

- Location: `.github/workflows/ci.yml`
- Language: YAML
- Triggers: Push and PR events

## Debugging Failed Workflows

1. Go to repository **Actions** tab
2. Click on the failed workflow run
3. Expand the failed job to see logs
4. Look for error messages in the specific step

Common issues:
- **Type errors**: Run `make type-check` locally
- **Linting failures**: Run `make lint-fix` locally
- **Test failures**: Run `make test` locally
- **Build errors**: Check `npm run build` output

## Coverage Reports

Coverage is automatically uploaded to Codecov after tests pass. View reports:
- GitHub: Check workflow run artifacts
- Codecov: https://codecov.io (if configured)

## Next Steps

1. Set up branch protection rules as described above
2. Configure Codecov integration (optional)
3. Add required status checks to PRs
4. Document additional quality gates as needed
