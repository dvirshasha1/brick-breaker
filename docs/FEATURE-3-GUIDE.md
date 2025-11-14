# Feature: Core Game Entities and Physics System

## Issue
**GitHub Issue #3**: https://github.com/dvirshasha1/brick-breaker/issues/3

## Overview
This feature implements the fundamental game mechanics including:
1. Game entity data structures (Paddle, Ball, Brick)
2. Physics engine with collision detection
3. Game UI for score and controls
4. Game state management

## Architecture

### Entity Structure
```
src/entities/
├── Paddle.ts          # Player-controlled paddle
├── Ball.ts            # Game ball with physics
├── Brick.ts           # Individual brick entity
├── BrickGrid.ts       # Manages brick collection
└── index.ts           # Exports all entities
```

### Physics System
```
src/systems/
├── PhysicsEngine.ts        # Updates entity positions
├── CollisionDetector.ts    # Detects collisions
└── index.ts                # Exports all systems
```

### Game Management
```
src/core/
└── GameEngine.ts      # Main game loop and state management
```

### UI Components
```
src/ui/
├── GameHUD.ts         # Score, lives, level display
├── GameControls.ts    # Start, pause, resume, restart buttons
├── GameCanvas.ts      # Canvas rendering
└── HomePage.ts        # Already implemented
```

## Implementation Checklist

### Phase 1: Entity Structures (Estimated: 3 hours)
- [ ] Paddle class with movement and bounds checking
- [ ] Ball class with velocity and physics properties
- [ ] Brick class with health and collision detection
- [ ] BrickGrid class for managing multiple bricks
- [ ] Unit tests for all entity classes

### Phase 2: Physics System (Estimated: 3 hours)
- [ ] CollisionDetector for AABB collision detection
- [ ] PhysicsEngine for entity updates and delta-time handling
- [ ] Collision response handling (bouncing)
- [ ] Integration tests for physics

### Phase 3: UI Components (Estimated: 2 hours)
- [ ] GameHUD for displaying score, lives, level
- [ ] GameControls for game state buttons
- [ ] GameCanvas for rendering entities
- [ ] Unit tests for UI components

### Phase 4: Game Engine (Estimated: 1 hour)
- [ ] GameEngine main loop
- [ ] State management (MENU, PLAYING, PAUSED, GAME_OVER, WON)
- [ ] Integrate all systems
- [ ] Integration tests

### Phase 5: Documentation (Estimated: 1 hour)
- [ ] JSDoc for all classes
- [ ] ADR documents
- [ ] API documentation

## Key Design Decisions

### 1. Entity-Based Architecture
Each game object (Paddle, Ball, Brick) is a class with its own state and methods. This makes the code modular and testable.

### 2. Frame-Rate Independent Physics
All movement uses delta time to ensure smooth gameplay regardless of frame rate:
```typescript
position += velocity * deltaTime;
```

### 3. AABB Collision Detection
Simple Axis-Aligned Bounding Box collision detection:
- Fast to compute
- Suitable for brick breaker game
- Can be enhanced to circle-rectangle for ball precision

### 4. State Machine for Game Flow
Clear state transitions:
```
MENU → PLAYING ↔ PAUSED → GAME_OVER → WON
```

## Testing Strategy

### Unit Tests (>80% coverage)
- Entity classes: movement, bounds, state
- Physics: collision detection, response
- UI: rendering, event handling

### Integration Tests
- Full game loop with multiple entities
- Collision sequences
- State transitions

## Performance Considerations

1. **Object Pooling**: Bricks are created once at game start
2. **Canvas Optimization**: Single canvas context, batch renders
3. **Collision Checks**: Spatial partitioning if needed later
4. **FPS Target**: 60 FPS with smooth delta-time updates

## Files to Create

```
src/
├── entities/
│   ├── Paddle.ts
│   ├── Ball.ts
│   ├── Brick.ts
│   ├── BrickGrid.ts
│   └── index.ts
├── systems/
│   ├── PhysicsEngine.ts
│   ├── CollisionDetector.ts
│   └── index.ts
├── core/
│   └── GameEngine.ts
└── ui/
    ├── GameHUD.ts
    ├── GameControls.ts
    └── GameCanvas.ts

tests/
├── unit/
│   ├── entities/
│   │   ├── Paddle.test.ts
│   │   ├── Ball.test.ts
│   │   ├── Brick.test.ts
│   │   └── BrickGrid.test.ts
│   ├── systems/
│   │   ├── PhysicsEngine.test.ts
│   │   └── CollisionDetector.test.ts
│   └── ui/
│       ├── GameHUD.test.ts
│       ├── GameControls.test.ts
│       └── GameCanvas.test.ts
└── integration/
    ├── game-loop.integration.test.ts
    └── collision.integration.test.ts

docs/
└── adr/
    ├── 001-physics-collision-system.md
    └── 002-entity-component-design.md
```

## Related Documentation
- [CI/CD Setup](./ci-setup.md)
- [Branch Protection](./branch-protection-setup.md)
- [Workflow Diagrams](./workflow-diagrams.md)

## Success Criteria

✅ All entity classes implemented with TypeScript types  
✅ Physics engine with collision detection working  
✅ UI components display game information  
✅ Game loop manages state transitions  
✅ >80% test coverage on all new code  
✅ No linting, type, or console errors  
✅ Full JSDoc documentation  
✅ ADR documents created  

## Next Steps After This Feature

1. Implement rendering pipeline (Canvas drawing)
2. Add game rules (lives, scoring, brick destruction)
3. Add sound effects (optional)
4. Add levels and difficulty progression
5. Add animation and visual effects

## Development Branch
Feature branch: `feature/core-game-entities`

Create with:
```bash
git checkout develop
git pull origin develop
git checkout -b feature/core-game-entities
```
