import { PhysicsEngine } from '../../../src/systems/PhysicsEngine';
import { Ball } from '../../../src/entities/Ball';
import { Paddle } from '../../../src/entities/Paddle';
import { BrickGrid } from '../../../src/entities/BrickGrid';

describe('PhysicsEngine', () => {
  describe('updateBall', () => {
    it('should update ball position', () => {
      const engine = new PhysicsEngine(800, 600);
      const ball = new Ball(400, 300, 10);
      ball.velocityX = 100;
      ball.velocityY = 100;
      
      engine.updateBall(ball, 0.1);
      
      expect(ball.x).toBe(410);
      expect(ball.y).toBe(310);
    });

    it('should bounce ball off left wall', () => {
      const engine = new PhysicsEngine(800, 600);
      const ball = new Ball(5, 300, 10);
      ball.velocityX = -100;
      
      engine.updateBall(ball, 0.1);
      
      expect(ball.velocityX).toBeGreaterThan(0);
    });

    it('should bounce ball off right wall', () => {
      const engine = new PhysicsEngine(800, 600);
      const ball = new Ball(795, 300, 10);
      ball.velocityX = 100;
      
      engine.updateBall(ball, 0.1);
      
      expect(ball.velocityX).toBeLessThan(0);
    });

    it('should bounce ball off top wall', () => {
      const engine = new PhysicsEngine(800, 600);
      const ball = new Ball(400, 5, 10);
      ball.velocityY = -100;
      
      engine.updateBall(ball, 0.1);
      
      expect(ball.velocityY).toBeGreaterThan(0);
    });
  });

  describe('checkPaddleCollision', () => {
    it('should bounce ball off paddle', () => {
      const engine = new PhysicsEngine(800, 600);
      const ball = new Ball(450, 540, 10);
      ball.velocityY = 100;
      const paddle = new Paddle(400, 550, 100, 20);
      
      const result = engine.checkPaddleCollision(ball, paddle);
      
      expect(result).toBe(true);
      expect(ball.velocityY).toBeLessThan(0);
    });

    it('should not bounce when no collision', () => {
      const engine = new PhysicsEngine(800, 600);
      const ball = new Ball(300, 540, 10);
      const originalVelocityY = 100;
      ball.velocityY = originalVelocityY;
      const paddle = new Paddle(400, 550, 100, 20);
      
      const result = engine.checkPaddleCollision(ball, paddle);
      
      expect(result).toBe(false);
      expect(ball.velocityY).toBe(originalVelocityY);
    });
  });

  describe('checkBrickCollisions', () => {
    it('should destroy brick and bounce ball on collision', () => {
      const engine = new PhysicsEngine(800, 600);
      const ball = new Ball(130, 60, 10);
      ball.velocityY = 100;
      const grid = new BrickGrid(1, 1, 60, 20, 100, 50);
      
      const result = engine.checkBrickCollisions(ball, grid);
      
      expect(result).toBe(true);
      expect(grid.bricks[0].isDestroyed()).toBe(true);
      expect(ball.velocityY).toBeLessThan(0);
    });

    it('should not bounce when no collision', () => {
      const engine = new PhysicsEngine(800, 600);
      const ball = new Ball(300, 300, 10);
      const originalVelocityY = 100;
      ball.velocityY = originalVelocityY;
      const grid = new BrickGrid(1, 1, 60, 20, 100, 50);
      
      const result = engine.checkBrickCollisions(ball, grid);
      
      expect(result).toBe(false);
      expect(ball.velocityY).toBe(originalVelocityY);
    });
  });

  describe('isBallOutOfBounds', () => {
    it('should return true when ball is below canvas', () => {
      const engine = new PhysicsEngine(800, 600);
      const ball = new Ball(400, 610, 10);
      
      const result = engine.isBallOutOfBounds(ball);
      
      expect(result).toBe(true);
    });

    it('should return false when ball is in bounds', () => {
      const engine = new PhysicsEngine(800, 600);
      const ball = new Ball(400, 300, 10);
      
      const result = engine.isBallOutOfBounds(ball);
      
      expect(result).toBe(false);
    });
  });
});
