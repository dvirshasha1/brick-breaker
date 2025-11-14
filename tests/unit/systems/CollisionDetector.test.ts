import { CollisionDetector } from '../../../src/systems/CollisionDetector';
import { Ball } from '../../../src/entities/Ball';
import { Paddle } from '../../../src/entities/Paddle';
import { Brick } from '../../../src/entities/Brick';

describe('CollisionDetector', () => {
  describe('checkBallPaddleCollision', () => {
    it('should detect collision when ball hits paddle', () => {
      const ball = new Ball(450, 540, 10);
      const paddle = new Paddle(400, 550, 100, 20);
      
      const collision = CollisionDetector.checkBallPaddleCollision(ball, paddle);
      
      expect(collision).toBe(true);
    });

    it('should not detect collision when ball misses paddle', () => {
      const ball = new Ball(300, 540, 10);
      const paddle = new Paddle(400, 550, 100, 20);
      
      const collision = CollisionDetector.checkBallPaddleCollision(ball, paddle);
      
      expect(collision).toBe(false);
    });

    it('should not detect collision when ball is above paddle', () => {
      const ball = new Ball(450, 500, 10);
      const paddle = new Paddle(400, 550, 100, 20);
      
      const collision = CollisionDetector.checkBallPaddleCollision(ball, paddle);
      
      expect(collision).toBe(false);
    });
  });

  describe('checkBallBrickCollision', () => {
    it('should detect collision when ball hits brick', () => {
      const ball = new Ball(130, 60, 10);
      const brick = new Brick(100, 50, 60, 20, 1);
      
      const collision = CollisionDetector.checkBallBrickCollision(ball, brick);
      
      expect(collision).toBe(true);
    });

    it('should not detect collision when ball misses brick', () => {
      const ball = new Ball(200, 60, 10);
      const brick = new Brick(100, 50, 60, 20, 1);
      
      const collision = CollisionDetector.checkBallBrickCollision(ball, brick);
      
      expect(collision).toBe(false);
    });

    it('should not detect collision with destroyed brick', () => {
      const ball = new Ball(130, 60, 10);
      const brick = new Brick(100, 50, 60, 20, 1);
      brick.hit();
      
      const collision = CollisionDetector.checkBallBrickCollision(ball, brick);
      
      expect(collision).toBe(false);
    });
  });

  describe('checkBallWallCollision', () => {
    it('should detect left wall collision', () => {
      const ball = new Ball(5, 300, 10);
      
      const collision = CollisionDetector.checkBallWallCollision(ball, 800, 600);
      
      expect(collision.left).toBe(true);
      expect(collision.right).toBe(false);
      expect(collision.top).toBe(false);
    });

    it('should detect right wall collision', () => {
      const ball = new Ball(795, 300, 10);
      
      const collision = CollisionDetector.checkBallWallCollision(ball, 800, 600);
      
      expect(collision.left).toBe(false);
      expect(collision.right).toBe(true);
      expect(collision.top).toBe(false);
    });

    it('should detect top wall collision', () => {
      const ball = new Ball(400, 5, 10);
      
      const collision = CollisionDetector.checkBallWallCollision(ball, 800, 600);
      
      expect(collision.left).toBe(false);
      expect(collision.right).toBe(false);
      expect(collision.top).toBe(true);
    });

    it('should detect no collision when ball is in bounds', () => {
      const ball = new Ball(400, 300, 10);
      
      const collision = CollisionDetector.checkBallWallCollision(ball, 800, 600);
      
      expect(collision.left).toBe(false);
      expect(collision.right).toBe(false);
      expect(collision.top).toBe(false);
    });
  });

  describe('checkBallOutOfBounds', () => {
    it('should return true when ball goes below bottom', () => {
      const ball = new Ball(400, 610, 10);
      
      const outOfBounds = CollisionDetector.checkBallOutOfBounds(ball, 600);
      
      expect(outOfBounds).toBe(true);
    });

    it('should return false when ball is in bounds', () => {
      const ball = new Ball(400, 300, 10);
      
      const outOfBounds = CollisionDetector.checkBallOutOfBounds(ball, 600);
      
      expect(outOfBounds).toBe(false);
    });
  });
});
