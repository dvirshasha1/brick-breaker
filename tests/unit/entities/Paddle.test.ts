import { Paddle } from '../../../src/entities/Paddle';

describe('Paddle', () => {
  describe('Constructor', () => {
    it('should create a paddle with default position and size', () => {
      const paddle = new Paddle(400, 550, 100, 20);
      
      expect(paddle.x).toBe(400);
      expect(paddle.y).toBe(550);
      expect(paddle.width).toBe(100);
      expect(paddle.height).toBe(20);
      expect(paddle.speed).toBe(300);
    });

    it('should create a paddle with custom speed', () => {
      const paddle = new Paddle(400, 550, 100, 20, 500);
      
      expect(paddle.speed).toBe(500);
    });
  });

  describe('moveLeft', () => {
    it('should move paddle left based on delta time', () => {
      const paddle = new Paddle(400, 550, 100, 20, 300);
      const deltaTime = 1; // 1 second
      
      paddle.moveLeft(deltaTime);
      
      expect(paddle.x).toBe(100); // 400 - (300 * 1)
    });

    it('should not move beyond left boundary', () => {
      const paddle = new Paddle(50, 550, 100, 20, 300);
      const deltaTime = 1;
      
      paddle.moveLeft(deltaTime);
      
      expect(paddle.x).toBe(0);
    });
  });

  describe('moveRight', () => {
    it('should move paddle right based on delta time', () => {
      const paddle = new Paddle(400, 550, 100, 20, 300);
      const deltaTime = 1;
      const canvasWidth = 800;
      
      paddle.moveRight(deltaTime, canvasWidth);
      
      expect(paddle.x).toBe(700); // 400 + (300 * 1), capped at 800 - 100
    });

    it('should not move beyond right boundary', () => {
      const paddle = new Paddle(750, 550, 100, 20, 300);
      const deltaTime = 1;
      const canvasWidth = 800;
      
      paddle.moveRight(deltaTime, canvasWidth);
      
      expect(paddle.x).toBe(700); // 800 - 100
    });
  });

  describe('getBounds', () => {
    it('should return correct bounding box', () => {
      const paddle = new Paddle(400, 550, 100, 20);
      
      const bounds = paddle.getBounds();
      
      expect(bounds).toEqual({
        left: 400,
        right: 500,
        top: 550,
        bottom: 570
      });
    });
  });

  describe('setPosition', () => {
    it('should set paddle position', () => {
      const paddle = new Paddle(400, 550, 100, 20);
      
      paddle.setPosition(300, 500);
      
      expect(paddle.x).toBe(300);
      expect(paddle.y).toBe(500);
    });
  });
});
