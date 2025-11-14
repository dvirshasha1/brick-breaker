# ADR 001: Entity-Component Design Pattern

**Date**: 2025-11-14  
**Status**: Accepted  
**Context**: Issue #3 - Core Game Entities and Physics System

## Context and Problem Statement

The brick breaker game requires a clear architecture for representing game objects (paddle, ball, bricks) and their interactions. We need a design that is:
- Easy to test in isolation
- Simple to extend with new features
- Maintainable as the codebase grows
- Type-safe with TypeScript

## Decision Drivers

* **Testability**: Each entity should be testable independently
* **Separation of Concerns**: Game logic, physics, and rendering should be separate
* **Type Safety**: Leverage TypeScript for compile-time checks
* **Simplicity**: Avoid over-engineering for a simple game

## Considered Options

1. **Entity-Component System (ECS)**: Full ECS architecture with entities as IDs and components as data
2. **Object-Oriented Entities**: Each game object as a class with its own state and methods
3. **Functional Approach**: Pure functions operating on data structures

## Decision Outcome

**Chosen option**: Object-Oriented Entities

We chose to implement each game object (Paddle, Ball, Brick, BrickGrid) as a TypeScript class with:
- Encapsulated state (position, size, velocity)
- Behavior methods (move, hit, update)
- Getter methods for collision detection (getBounds)

### Positive Consequences

* Clear separation of responsibilities - each entity manages its own state
* Easy to test - can instantiate and test entities in isolation
* Familiar pattern - OOP is well-understood by most developers
* Type-safe - TypeScript interfaces ensure correct usage
* Simple to extend - inheritance or composition for new entity types

### Negative Consequences

* Not as flexible as full ECS for large-scale games
* Some coupling between entities and game logic
* May require refactoring if game becomes significantly more complex

## Implementation Details

### Entity Classes

```typescript
class Paddle {
  x, y, width, height, speed
  moveLeft(deltaTime), moveRight(deltaTime)
  getBounds()
}

class Ball {
  x, y, radius, velocityX, velocityY
  update(deltaTime), launch(angle)
  reverseX(), reverseY()
  getBounds()
}

class Brick {
  x, y, width, height, health
  hit(), isDestroyed()
  getBounds()
}

class BrickGrid {
  bricks[]
  getActiveBricks(), allBricksDestroyed()
}
```

### Bounds for Collision Detection

Each entity implements `getBounds()` returning AABB (Axis-Aligned Bounding Box):
```typescript
{ left, right, top, bottom }
```

This standardized interface allows the CollisionDetector to work with any entity type.

## Related Decisions

* ADR 002: Physics and Collision System
* Entity classes are separate from rendering (future ADR)

## Notes

If the game grows to include many more entity types or complex component composition, we may revisit this decision and migrate to a full ECS architecture.
