import { BrickGrid } from '../../../src/entities/BrickGrid';

describe('BrickGrid', () => {
  describe('Constructor', () => {
    it('should create a grid with specified rows and columns', () => {
      const grid = new BrickGrid(5, 8, 60, 20, 10, 50);
      
      expect(grid.rows).toBe(5);
      expect(grid.columns).toBe(8);
      expect(grid.bricks.length).toBe(40); // 5 * 8
    });

    it('should position bricks correctly in grid', () => {
      const grid = new BrickGrid(2, 3, 60, 20, 10, 50);
      
      const firstBrick = grid.bricks[0];
      expect(firstBrick.x).toBe(10);
      expect(firstBrick.y).toBe(50);
      
      const secondBrick = grid.bricks[1];
      expect(secondBrick.x).toBe(70); // 10 + 60
      
      const fourthBrick = grid.bricks[3]; // First brick of second row
      expect(fourthBrick.y).toBe(70); // 50 + 20
    });
  });

  describe('getActiveBricks', () => {
    it('should return all bricks initially', () => {
      const grid = new BrickGrid(2, 3, 60, 20, 10, 50);
      
      const activeBricks = grid.getActiveBricks();
      
      expect(activeBricks.length).toBe(6);
    });

    it('should exclude destroyed bricks', () => {
      const grid = new BrickGrid(2, 3, 60, 20, 10, 50);
      grid.bricks[0].hit(); // Destroy first brick
      grid.bricks[2].hit(); // Destroy third brick
      
      const activeBricks = grid.getActiveBricks();
      
      expect(activeBricks.length).toBe(4);
    });
  });

  describe('allBricksDestroyed', () => {
    it('should return false when bricks remain', () => {
      const grid = new BrickGrid(2, 2, 60, 20, 10, 50);
      
      expect(grid.allBricksDestroyed()).toBe(false);
    });

    it('should return true when all bricks destroyed', () => {
      const grid = new BrickGrid(2, 2, 60, 20, 10, 50);
      grid.bricks.forEach(brick => brick.hit());
      
      expect(grid.allBricksDestroyed()).toBe(true);
    });
  });

  describe('reset', () => {
    it('should restore all bricks to initial state', () => {
      const grid = new BrickGrid(2, 2, 60, 20, 10, 50);
      grid.bricks[0].hit();
      grid.bricks[1].hit();
      
      grid.reset();
      
      expect(grid.allBricksDestroyed()).toBe(false);
      expect(grid.getActiveBricks().length).toBe(4);
    });
  });

  describe('getTotalBricks', () => {
    it('should return total number of bricks', () => {
      const grid = new BrickGrid(3, 5, 60, 20, 10, 50);
      
      expect(grid.getTotalBricks()).toBe(15);
    });
  });

  describe('getRemainingBricks', () => {
    it('should return count of active bricks', () => {
      const grid = new BrickGrid(2, 3, 60, 20, 10, 50);
      grid.bricks[0].hit();
      grid.bricks[1].hit();
      
      expect(grid.getRemainingBricks()).toBe(4);
    });
  });
});
