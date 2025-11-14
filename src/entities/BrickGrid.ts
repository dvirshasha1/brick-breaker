import { Brick } from './Brick';

/**
 * Manages a grid of bricks
 * @class BrickGrid
 */
export class BrickGrid {
  /**
   * Number of rows in the grid
   */
  public readonly rows: number;

  /**
   * Number of columns in the grid
   */
  public readonly columns: number;

  /**
   * Array of all bricks in the grid
   */
  public bricks: Brick[];

  /**
   * Creates a new BrickGrid instance
   * @param {number} rows - Number of rows
   * @param {number} columns - Number of columns
   * @param {number} brickWidth - Width of each brick
   * @param {number} brickHeight - Height of each brick
   * @param {number} offsetX - Horizontal offset from left edge
   * @param {number} offsetY - Vertical offset from top edge
   */
  constructor(
    rows: number,
    columns: number,
    brickWidth: number,
    brickHeight: number,
    offsetX: number,
    offsetY: number
  ) {
    this.rows = rows;
    this.columns = columns;
    this.bricks = [];

    // Create grid of bricks
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < columns; col++) {
        const x = offsetX + col * brickWidth;
        const y = offsetY + row * brickHeight;
        const brick = new Brick(x, y, brickWidth, brickHeight, 1);
        this.bricks.push(brick);
      }
    }
  }

  /**
   * Gets all bricks that are not destroyed
   * @returns {Brick[]} Array of active bricks
   */
  public getActiveBricks(): Brick[] {
    return this.bricks.filter(brick => !brick.isDestroyed());
  }

  /**
   * Checks if all bricks have been destroyed
   * @returns {boolean} True if all bricks destroyed, false otherwise
   */
  public allBricksDestroyed(): boolean {
    return this.bricks.every(brick => brick.isDestroyed());
  }

  /**
   * Resets all bricks to their initial state
   */
  public reset(): void {
    this.bricks.forEach(brick => brick.restore());
  }

  /**
   * Gets the total number of bricks in the grid
   * @returns {number} Total number of bricks
   */
  public getTotalBricks(): number {
    return this.bricks.length;
  }

  /**
   * Gets the number of remaining (non-destroyed) bricks
   * @returns {number} Number of remaining bricks
   */
  public getRemainingBricks(): number {
    return this.getActiveBricks().length;
  }
}
