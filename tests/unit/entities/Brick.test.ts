import { Brick } from '../../../src/entities/Brick';

describe('Brick', () => {
  describe('Constructor', () => {
    it('should create a brick with default properties', () => {
      const brick = new Brick(100, 50, 60, 20, 1);
      
      expect(brick.x).toBe(100);
      expect(brick.y).toBe(50);
      expect(brick.width).toBe(60);
      expect(brick.height).toBe(20);
      expect(brick.health).toBe(1);
      expect(brick.destroyed).toBe(false);
      expect(brick.color).toBe('#FF6B6B');
    });

    it('should create a brick with custom color', () => {
      const brick = new Brick(100, 50, 60, 20, 2, '#00FF00');
      
      expect(brick.color).toBe('#00FF00');
    });
  });

  describe('hit', () => {
    it('should reduce health by 1', () => {
      const brick = new Brick(100, 50, 60, 20, 3);
      
      brick.hit();
      
      expect(brick.health).toBe(2);
      expect(brick.destroyed).toBe(false);
    });

    it('should mark as destroyed when health reaches 0', () => {
      const brick = new Brick(100, 50, 60, 20, 1);
      
      brick.hit();
      
      expect(brick.health).toBe(0);
      expect(brick.destroyed).toBe(true);
    });

    it('should not reduce health below 0', () => {
      const brick = new Brick(100, 50, 60, 20, 1);
      
      brick.hit();
      brick.hit();
      
      expect(brick.health).toBe(0);
      expect(brick.destroyed).toBe(true);
    });
  });

  describe('getBounds', () => {
    it('should return correct bounding box', () => {
      const brick = new Brick(100, 50, 60, 20, 1);
      
      const bounds = brick.getBounds();
      
      expect(bounds).toEqual({
        left: 100,
        right: 160,
        top: 50,
        bottom: 70
      });
    });
  });

  describe('isDestroyed', () => {
    it('should return false for undamaged brick', () => {
      const brick = new Brick(100, 50, 60, 20, 1);
      
      expect(brick.isDestroyed()).toBe(false);
    });

    it('should return true for destroyed brick', () => {
      const brick = new Brick(100, 50, 60, 20, 1);
      brick.hit();
      
      expect(brick.isDestroyed()).toBe(true);
    });
  });
});
