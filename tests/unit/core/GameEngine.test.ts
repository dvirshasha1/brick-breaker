import { GameEngine, GameState } from '../../../src/core/GameEngine';

describe('GameEngine', () => {
  describe('Constructor', () => {
    it('should create engine with default state', () => {
      const engine = new GameEngine(800, 600);
      
      expect(engine.getState()).toBe(GameState.MENU);
      expect(engine.getScore()).toBe(0);
      expect(engine.getLives()).toBe(3);
      expect(engine.getLevel()).toBe(1);
    });
  });

  describe('setState', () => {
    it('should update game state', () => {
      const engine = new GameEngine(800, 600);
      
      engine.setState(GameState.PLAYING);
      
      expect(engine.getState()).toBe(GameState.PLAYING);
    });
  });

  describe('start', () => {
    it('should transition from MENU to PLAYING', () => {
      const engine = new GameEngine(800, 600);
      
      engine.start();
      
      expect(engine.getState()).toBe(GameState.PLAYING);
    });
  });

  describe('pause', () => {
    it('should transition from PLAYING to PAUSED', () => {
      const engine = new GameEngine(800, 600);
      engine.setState(GameState.PLAYING);
      
      engine.pause();
      
      expect(engine.getState()).toBe(GameState.PAUSED);
    });
  });

  describe('resume', () => {
    it('should transition from PAUSED to PLAYING', () => {
      const engine = new GameEngine(800, 600);
      engine.setState(GameState.PAUSED);
      
      engine.resume();
      
      expect(engine.getState()).toBe(GameState.PLAYING);
    });
  });

  describe('restart', () => {
    it('should reset game to initial state', () => {
      const engine = new GameEngine(800, 600);
      engine.setState(GameState.GAME_OVER);
      
      engine.restart();
      
      expect(engine.getState()).toBe(GameState.MENU);
      expect(engine.getScore()).toBe(0);
      expect(engine.getLives()).toBe(3);
      expect(engine.getLevel()).toBe(1);
    });
  });

  describe('update', () => {
    it('should not update when state is MENU', () => {
      const engine = new GameEngine(800, 600);
      const initialState = engine.getState();
      
      engine.update(0.016);
      
      expect(engine.getState()).toBe(initialState);
    });

    it('should not update when state is PAUSED', () => {
      const engine = new GameEngine(800, 600);
      engine.setState(GameState.PAUSED);
      
      engine.update(0.016);
      
      expect(engine.getState()).toBe(GameState.PAUSED);
    });
  });

  describe('addScore', () => {
    it('should increase score', () => {
      const engine = new GameEngine(800, 600);
      
      engine.addScore(100);
      
      expect(engine.getScore()).toBe(100);
    });
  });

  describe('loseLife', () => {
    it('should decrease lives', () => {
      const engine = new GameEngine(800, 600);
      
      engine.loseLife();
      
      expect(engine.getLives()).toBe(2);
    });

    it('should transition to GAME_OVER when no lives left', () => {
      const engine = new GameEngine(800, 600);
      
      engine.loseLife();
      engine.loseLife();
      engine.loseLife();
      
      expect(engine.getLives()).toBe(0);
      expect(engine.getState()).toBe(GameState.GAME_OVER);
    });
  });

  describe('getPaddle', () => {
    it('should return paddle instance', () => {
      const engine = new GameEngine(800, 600);
      
      const paddle = engine.getPaddle();
      
      expect(paddle).toBeDefined();
      expect(paddle.x).toBeDefined();
    });
  });

  describe('getBall', () => {
    it('should return ball instance', () => {
      const engine = new GameEngine(800, 600);
      
      const ball = engine.getBall();
      
      expect(ball).toBeDefined();
      expect(ball.x).toBeDefined();
    });
  });

  describe('getBrickGrid', () => {
    it('should return brick grid instance', () => {
      const engine = new GameEngine(800, 600);
      
      const grid = engine.getBrickGrid();
      
      expect(grid).toBeDefined();
      expect(grid.bricks).toBeDefined();
    });
  });
});
