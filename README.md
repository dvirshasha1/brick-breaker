# Brick Breaker Web Game

A web-based implementation of the classic brick breaker game, built with TypeScript and Canvas API.

## Project Structure

```
brick-breaker/
├── src/
│   ├── core/           # Game engine logic
│   ├── entities/       # Game objects (Ball, Paddle, Brick)
│   ├── systems/        # Game systems (Physics, Collision, Scoring)
│   ├── ui/             # UI components
│   ├── utils/          # Helper functions
│   └── main.ts         # Entry point
├── tests/
│   ├── unit/           # Unit tests
│   ├── integration/    # Integration tests
│   └── fixtures/       # Test fixtures
├── docs/
│   ├── adr/            # Architecture Decision Records
│   ├── api/            # API documentation
│   └── guides/         # Development guides
├── public/             # Static assets and HTML
├── dist/               # Build output
├── .github/            # GitHub configuration
├── Makefile            # Build commands
├── package.json        # Dependencies
├── tsconfig.json       # TypeScript configuration
├── jest.config.js      # Test configuration
├── webpack.config.js   # Webpack configuration
├── .eslintrc.json      # Linter configuration
└── .prettierrc          # Formatter configuration
```

## Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

```bash
make install
```

### Development

Start the development server:

```bash
make dev
```

The application will be available at `http://localhost:8080`

### Building

Build for production:

```bash
make build
```

### Testing

Run all tests:

```bash
make test
```

Run unit tests only:

```bash
make test-unit
```

Run tests in watch mode:

```bash
make test-watch
```

Generate coverage report:

```bash
make coverage
```

### Code Quality

Check types:

```bash
make type-check
```

Run linter:

```bash
make lint
```

Fix linting issues automatically:

```bash
make lint-fix
```

Format code:

```bash
make format
```

### Documentation

Generate API documentation:

```bash
make docs
```

Serve documentation locally:

```bash
make docs-serve
```

## Features

- Classic brick breaker gameplay
- Responsive canvas-based rendering
- Score tracking
- Keyboard and mouse controls
- Multiple levels (planned)
- Sound effects (planned)
- High score persistence (planned)

## Development Workflow

1. Create a feature branch from `develop`:
   ```bash
   git checkout develop
   git checkout -b feature/your-feature
   ```

2. Implement with TDD approach:
   - Write failing tests
   - Implement feature
   - Ensure tests pass
   - Refactor and optimize
   - Document changes

3. Verify quality:
   ```bash
   make type-check
   make lint
   make test
   ```

4. Commit with conventional commits:
   ```bash
   git add .
   git commit -m "feat(scope): description"
   ```

5. Create Pull Request to `develop` for review

## Testing

Tests are organized into:
- **Unit Tests** (`tests/unit/`): Test individual functions/classes in isolation
- **Integration Tests** (`tests/integration/`): Test component interactions and game systems

Target coverage: **80%** for all metrics

## Code Style

- **Language**: TypeScript
- **Formatter**: Prettier
- **Linter**: ESLint with TypeScript support
- **Conventions**: Follows project style guide

## Git Branches

- `main` - Production-ready code (release branch)
- `develop` - Integration branch for features
- `feature/*` - Individual features
- `bugfix/*` - Bug fixes
- `hotfix/*` - Urgent production fixes

## Architecture

See [ADR template](./docs/adr/template.md) for architecture decision records.

## Changelog

All notable changes are documented in [CHANGELOG.md](./CHANGELOG.md)

## License

MIT

## Resources

- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Jest Documentation](https://jestjs.io/)
- [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [Conventional Commits](https://www.conventionalcommits.org/)
