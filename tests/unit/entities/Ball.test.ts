import { Ball } from '../../../src/entities/Ball';

describe('Ball', () => {
  describe('Constructor', () => {
    it('should create a ball with default properties', () => {
      const ball = new Ball(400, 300, 10);
      
      expect(ball.x).toBe(400);
      expect(ball.y).toBe(300);
      expect(ball.radius).toBe(10);
      expect(ball.velocityX).toBe(0);
      expect(ball.velocityY).toBe(0);
      expect(ball.speed).toBe(300);
    });

    it('should create a ball with custom speed', () => {
      const ball = new Ball(400, 300, 10, 500);
      
      expect(ball.speed).toBe(500);
    });
  });

  describe('update', () => {
    it('should update position based on velocity and delta time', () => {
      const ball = new Ball(400, 300, 10);
      ball.velocityX = 100;
      ball.velocityY = 100;
      const deltaTime = 1; // 1 second
      
      ball.update(deltaTime);
      
      expect(ball.x).toBe(500); // 400 + (100 * 1)
      expect(ball.y).toBe(400); // 300 + (100 * 1)
    });

    it('should handle negative velocities', () => {
      const ball = new Ball(400, 300, 10);
      ball.velocityX = -100;
      ball.velocityY = -100;
      const deltaTime = 0.5;
      
      ball.update(deltaTime);
      
      expect(ball.x).toBe(350);
      expect(ball.y).toBe(250);
    });
  });

  describe('launch', () => {
    it('should set velocity at given angle', () => {
      const ball = new Ball(400, 300, 10, 300);
      const angle = -90; // Straight up in degrees
      
      ball.launch(angle);
      
      expect(ball.velocityX).toBeCloseTo(0, 5);
      expect(ball.velocityY).toBeCloseTo(-300, 5);
    });

    it('should launch at 45 degree angle', () => {
      const ball = new Ball(400, 300, 10, 300);
      const angle = -45;
      
      ball.launch(angle);
      
      const expectedComponent = 300 * Math.cos(45 * Math.PI / 180);
      expect(ball.velocityX).toBeCloseTo(expectedComponent, 1);
      expect(ball.velocityY).toBeCloseTo(-expectedComponent, 1);
    });
  });

  describe('reverseX', () => {
    it('should reverse horizontal velocity', () => {
      const ball = new Ball(400, 300, 10);
      ball.velocityX = 100;
      
      ball.reverseX();
      
      expect(ball.velocityX).toBe(-100);
    });
  });

  describe('reverseY', () => {
    it('should reverse vertical velocity', () => {
      const ball = new Ball(400, 300, 10);
      ball.velocityY = 100;
      
      ball.reverseY();
      
      expect(ball.velocityY).toBe(-100);
    });
  });

  describe('getBounds', () => {
    it('should return correct bounding box', () => {
      const ball = new Ball(400, 300, 10);
      
      const bounds = ball.getBounds();
      
      expect(bounds).toEqual({
        left: 390,
        right: 410,
        top: 290,
        bottom: 310
      });
    });
  });

  describe('reset', () => {
    it('should reset ball to initial position and stop movement', () => {
      const ball = new Ball(400, 300, 10);
      ball.velocityX = 100;
      ball.velocityY = 100;
      ball.x = 500;
      ball.y = 400;
      
      ball.reset(400, 300);
      
      expect(ball.x).toBe(400);
      expect(ball.y).toBe(300);
      expect(ball.velocityX).toBe(0);
      expect(ball.velocityY).toBe(0);
    });
  });
});
