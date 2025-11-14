# Agent Development Guide - Brick Break Game

## Project Overview
A web-based brick break game built with modern JavaScript/TypeScript, following test-driven development practices and comprehensive documentation standards.

## Tech Stack
- **Languages**: JavaScript (JS), TypeScript (TS)
- **Version Control**: Git with GitHub as remote
- **Build Tool**: Make for SDK commands
- **Testing**: Jest (or Vitest) for unit/integration tests
- **Documentation**: JSDoc/TSDoc inline + Markdown files

## Development Principles

### 1. Version Control Standards
- **Branch Strategy**: 
  - `main` - production-ready code
  - `develop` - integration branch
  - `feature/*` - individual features
  - `bugfix/*` - bug fixes
  - `hotfix/*` - urgent production fixes

- **Commit Messages**: Follow conventional commits
  ```
  type(scope): subject
  
  body (optional)
  
  footer (optional)
  ```
  Types: `feat`, `fix`, `docs`, `test`, `refactor`, `style`, `chore`

- **Pull Requests**: Required for all merges to `main` and `develop`

### 2. Definition of Done (DoD)

Every feature MUST include all three components:

#### Documentation ✓
- **README updates** if user-facing changes
- **Inline code documentation** (JSDoc/TSDoc)
- **API documentation** for public functions/classes
- **Architecture decisions** recorded in `/docs/adr/` if applicable

#### Code Implementation ✓
- **Follows project structure** (see below)
- **TypeScript types** properly defined
- **Linting passes** (ESLint/Prettier)
- **No console errors** or warnings
- **Code reviewed** via PR

#### Tests ✓
- **Unit tests** for business logic (>80% coverage)
- **Integration tests** for component interactions
- **All tests passing** in CI/CD pipeline
- **Edge cases covered**

### 3. Project Structure
```
brick-break/
├── src/
│   ├── core/           # Game engine logic
│   ├── entities/       # Game objects (Ball, Paddle, Brick)
│   ├── systems/        # Game systems (Physics, Collision, Scoring)
│   ├── ui/            # UI components
│   ├── utils/         # Helper functions
│   └── main.ts        # Entry point
├── tests/
│   ├── unit/
│   ├── integration/
│   └── fixtures/
├── docs/
│   ├── adr/           # Architecture Decision Records
│   ├── api/           # API documentation
│   └── guides/        # Development guides
├── public/            # Static assets
├── Makefile
├── package.json
├── tsconfig.json
├── jest.config.js
└── README.md
```

### 4. Makefile Commands

All SDK operations should be accessible via Make:

```makefile
# Development
make install        # Install dependencies
make dev           # Start development server
make build         # Build for production
make clean         # Clean build artifacts

# Testing
make test          # Run all tests
make test-unit     # Run unit tests only
make test-watch    # Run tests in watch mode
make coverage      # Generate coverage report

# Quality
make lint          # Run linter
make lint-fix      # Fix linting issues
make type-check    # TypeScript type checking
make format        # Format code with Prettier

# Git helpers
make commit        # Interactive commit (with validation)
make push          # Push with checks

# Documentation
make docs          # Generate API documentation
make docs-serve    # Serve documentation locally
```

### 5. Development Workflow

#### Starting a New Feature
```bash
# 1. Create feature branch
git checkout develop
git pull origin develop
git checkout -b feature/paddle-movement

# 2. Implement with TDD approach
# - Write failing test
# - Implement feature
# - Make test pass
# - Refactor
# - Document

# 3. Verify DoD
make test          # All tests pass
make lint          # No linting errors
make type-check    # No type errors
# - Documentation written

# 4. Commit and push
make commit        # Interactive commit
git push origin feature/paddle-movement

# 5. Create Pull Request
# - Link to issue/ticket
# - Describe changes
# - Checklist: DoD items completed
```

#### Code Review Checklist
- [ ] All DoD criteria met (docs, code, tests)
- [ ] Code follows project conventions
- [ ] No unnecessary complexity
- [ ] Performance considerations addressed
- [ ] Security considerations addressed
- [ ] Backward compatibility maintained

### 6. Testing Strategy

#### Unit Tests
- Test individual functions/classes in isolation
- Mock external dependencies
- Cover edge cases and error conditions
- Location: `tests/unit/`

#### Integration Tests
- Test component interactions
- Test game loop and state management
- Test rendering pipeline
- Location: `tests/integration/`

#### Test Naming Convention
```typescript
describe('Paddle', () => {
  describe('move', () => {
    it('should move right when right key pressed', () => {
      // Arrange
      // Act
      // Assert
    });
    
    it('should not move beyond right boundary', () => {
      // ...
    });
  });
});
```

### 7. Documentation Standards

#### Code Documentation
```typescript
/**
 * Represents the game paddle controlled by the player
 * @class Paddle
 */
export class Paddle {
  /**
   * Moves the paddle in the specified direction
   * @param {number} delta - Time delta in milliseconds
   * @param {Direction} direction - Direction to move (left/right)
   * @returns {void}
   * @throws {Error} If direction is invalid
   */
  move(delta: number, direction: Direction): void {
    // Implementation
  }
}
```

#### Architecture Decision Records (ADR)
- Document significant architectural decisions
- Template location: `docs/adr/template.md`
- Numbered sequentially: `001-game-loop-architecture.md`

### 8. CI/CD Pipeline

GitHub Actions workflow should include:
1. **Install dependencies**
2. **Type checking** (`make type-check`)
3. **Linting** (`make lint`)
4. **Unit tests** (`make test-unit`)
5. **Integration tests** (`make test`)
6. **Build** (`make build`)
7. **Coverage report** (upload to Codecov/Coveralls)

### 9. Game-Specific Guidelines

#### Game Loop
- Use `requestAnimationFrame` for smooth rendering
- Fixed timestep for physics updates
- Delta time for frame-independent movement

#### State Management
- Centralized game state
- Immutable state updates where possible
- Clear state transitions (Menu → Playing → Paused → GameOver)

#### Performance
- Object pooling for frequently created/destroyed objects (bricks)
- Efficient collision detection (spatial partitioning if needed)
- Canvas optimization techniques

#### Accessibility
- Keyboard controls (arrow keys, spacebar)
- Optional mouse/touch controls
- High contrast mode support
- Screen reader support for menus

### 10. Release Process

1. **Version Bump**: Update `package.json` version
2. **Changelog**: Update `CHANGELOG.md`
3. **Tag**: Create git tag `git tag v1.0.0`
4. **Build**: `make build`
5. **Deploy**: Push to GitHub Pages or hosting platform
6. **GitHub Release**: Create release with notes

## Quick Start for AI Coding Agent

When working on this project:
1. Always check DoD before marking feature complete
2. Use Makefile commands for all operations
3. Write tests first (TDD)
4. Document as you code, not after
5. Create small, focused commits
6. Keep PRs reviewable (< 400 lines when possible)

## Resources
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)

---
Last Updated: 2025-11-14
Version: 1.0.0