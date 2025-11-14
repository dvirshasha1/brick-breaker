import { GameEngine, GameState } from '../../src/core/GameEngine';

describe('Game Loop Integration', () => {
  it('should complete a full game cycle', () => {
    const engine = new GameEngine(800, 600);
    
    // Start in MENU state
    expect(engine.getState()).toBe(GameState.MENU);
    
    // Start game
    engine.start();
    expect(engine.getState()).toBe(GameState.PLAYING);
    
    // Ball should be launched
    const ball = engine.getBall();
    expect(ball.velocityX).not.toBe(0);
    expect(ball.velocityY).not.toBe(0);
    
    // Simulate some game updates
    for (let i = 0; i < 10; i++) {
      engine.update(0.016); // 60 FPS
    }
    
    // Game should still be playing
    expect(engine.getState()).toBe(GameState.PLAYING);
  });

  it('should handle pause and resume', () => {
    const engine = new GameEngine(800, 600);
    engine.start();
    
    engine.pause();
    expect(engine.getState()).toBe(GameState.PAUSED);
    
    engine.resume();
    expect(engine.getState()).toBe(GameState.PLAYING);
  });

  it('should handle brick destruction and scoring', () => {
    const engine = new GameEngine(800, 600);
    engine.start();
    
    const initialScore = engine.getScore();
    const grid = engine.getBrickGrid();
    const initialBricks = grid.getRemainingBricks();
    
    // Manually hit a brick to test scoring
    grid.bricks[0].hit();
    engine.addScore(10);
    
    expect(engine.getScore()).toBe(initialScore + 10);
    expect(grid.getRemainingBricks()).toBe(initialBricks - 1);
  });

  it('should handle losing all lives', () => {
    const engine = new GameEngine(800, 600);
    engine.start();
    
    engine.loseLife();
    engine.loseLife();
    engine.loseLife();
    
    expect(engine.getLives()).toBe(0);
    expect(engine.getState()).toBe(GameState.GAME_OVER);
  });

  it('should handle winning the game', () => {
    const engine = new GameEngine(800, 600);
    engine.start();
    
    // Destroy all bricks
    const grid = engine.getBrickGrid();
    grid.bricks.forEach(brick => brick.hit());
    
    // Update game to check win condition
    engine.update(0.016);
    
    expect(engine.getState()).toBe(GameState.WON);
  });

  it('should restart game properly', () => {
    const engine = new GameEngine(800, 600);
    engine.start();
    engine.addScore(100);
    engine.loseLife();
    
    engine.restart();
    
    expect(engine.getState()).toBe(GameState.MENU);
    expect(engine.getScore()).toBe(0);
    expect(engine.getLives()).toBe(3);
    expect(engine.getBrickGrid().allBricksDestroyed()).toBe(false);
  });

  it('should handle paddle movement', () => {
    const engine = new GameEngine(800, 600);
    const paddle = engine.getPaddle();
    const initialX = paddle.x;
    
    engine.movePaddleRight(0.1);
    expect(paddle.x).toBeGreaterThan(initialX);
    
    engine.movePaddleLeft(0.1);
    expect(paddle.x).toBeLessThan(initialX + 30);
  });

  it('should handle ball-paddle collision', () => {
    const engine = new GameEngine(800, 600);
    const ball = engine.getBall();
    const paddle = engine.getPaddle();
    
    engine.start();
    
    // Position ball above paddle moving downward
    ball.x = paddle.x + 50;
    ball.y = paddle.y - 5;
    ball.velocityY = 100;
    
    engine.update(0.016);
    
    // Ball should bounce upward
    expect(ball.velocityY).toBeLessThan(0);
  });
});
