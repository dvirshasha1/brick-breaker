# ADR 002: Physics and Collision System

**Date**: 2025-11-14  
**Status**: Accepted  
**Context**: Issue #3 - Core Game Entities and Physics System

## Context and Problem Statement

The game requires physics simulation for ball movement and collision detection between the ball and other entities (paddle, bricks, walls). The system must:
- Handle frame-rate independent physics
- Detect collisions accurately
- Respond to collisions appropriately
- Be testable in isolation

## Decision Drivers

* **Frame-Rate Independence**: Game should run consistently on different hardware
* **Accuracy**: Collisions should be detected reliably without missed hits
* **Performance**: Collision detection should be efficient
* **Testability**: Physics calculations should be unit testable
* **Simplicity**: Avoid complex physics for a simple 2D game

## Considered Options

1. **AABB (Axis-Aligned Bounding Box) Collision Detection**: Simple rectangle-based collision
2. **Circle-Rectangle Collision**: More accurate for ball-brick collisions
3. **Physics Engine Library**: Use existing library like Matter.js or Box2D
4. **Pixel-Perfect Collision**: Check actual pixel overlap

## Decision Outcome

**Chosen option**: AABB Collision Detection with Delta-Time Physics

### Architecture

Two main classes handle physics:

1. **CollisionDetector** (Static Methods):
   - `checkBallPaddleCollision(ball, paddle)`
   - `checkBallBrickCollision(ball, brick)`
   - `checkBallWallCollision(ball, width, height)`
   - `checkBallOutOfBounds(ball, height)`

2. **PhysicsEngine** (Instance Class):
   - `updateBall(ball, deltaTime)` - Updates position and handles wall collisions
   - `checkPaddleCollision(ball, paddle)` - Collision detection and response
   - `checkBrickCollisions(ball, grid)` - Collision detection and response
   - `isBallOutOfBounds(ball)` - Boundary check

### Delta-Time Physics

All movement calculations use delta time:
```typescript
position += velocity * deltaTime
```

This ensures consistent movement regardless of frame rate. If the game runs at 30 FPS vs 60 FPS, entities move the same distance over the same real time.

### AABB Collision Algorithm

```typescript
overlap = (
  box1.right >= box2.left &&
  box1.left <= box2.right &&
  box1.bottom >= box2.top &&
  box1.top <= box2.bottom
)
```

Simple, fast, and sufficient for brick breaker gameplay.

### Positive Consequences

* **Simple**: Easy to understand and debug
* **Fast**: AABB checks are O(1) operations
* **Testable**: Static methods are easy to unit test
* **Frame-Independent**: Delta-time ensures consistent behavior
* **No Dependencies**: No external physics library needed

### Negative Consequences

* **Less Accurate**: Ball-brick collisions treat ball as rectangle, not circle
* **No Advanced Physics**: No rotation, friction, or complex forces
* **Limited Collision Response**: Simple velocity reversal only

## Implementation Details

### Collision Response

When collision detected:
- **Wall**: Reverse X velocity (left/right) or Y velocity (top)
- **Paddle**: Reverse Y velocity, position ball above paddle
- **Brick**: Reverse Y velocity, destroy brick

### Position Correction

To prevent "tunneling" (ball getting stuck inside objects):
```typescript
if (wallCollision.left) {
  ball.x = ball.radius; // Snap to boundary
}
```

### Performance Optimization

For brick collisions, we only check active (non-destroyed) bricks:
```typescript
const activeBricks = grid.getActiveBricks();
for (const brick of activeBricks) {
  // Check collision
}
```

With ~40 bricks, this is negligible, but could be optimized with spatial partitioning if needed.

## Alternatives Considered

### Circle-Rectangle Collision

More accurate for ball-brick hits, but adds complexity:
```typescript
// Find closest point on rectangle to circle
// Check if distance < radius
```

**Rejected**: AABB is sufficient for gameplay, and the complexity isn't justified.

### Physics Engine Library

Using Matter.js or Box2D would provide:
- Advanced collision shapes
- Realistic physics (friction, rotation)
- Constraint systems

**Rejected**: Overkill for brick breaker. Adds significant bundle size and learning curve.

## Future Considerations

If we need more accurate collisions later, we could:
1. Implement circle-rectangle collision for ball specifically
2. Add collision side detection to bounce ball at different angles based on hit location
3. Implement paddle angle-based ball deflection

## Related Decisions

* ADR 001: Entity-Component Design (entities provide getBounds())
* Future: Game Loop Architecture (deltaTime calculation)

## Testing Strategy

Both classes are fully unit tested:
- CollisionDetector: 13 tests covering all collision scenarios
- PhysicsEngine: 11 tests covering physics updates and responses
- Integration tests: 8 tests for full game loop

Total: 96 tests passing with >80% coverage.
