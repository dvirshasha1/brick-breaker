/**
 * Represents the player-controlled paddle in the game
 * @class Paddle
 */
export class Paddle {
  /**
   * X position of the paddle (top-left corner)
   */
  public x: number;

  /**
   * Y position of the paddle (top-left corner)
   */
  public y: number;

  /**
   * Width of the paddle
   */
  public readonly width: number;

  /**
   * Height of the paddle
   */
  public readonly height: number;

  /**
   * Movement speed in pixels per second
   */
  public readonly speed: number;

  /**
   * Creates a new Paddle instance
   * @param {number} x - Initial X position
   * @param {number} y - Initial Y position
   * @param {number} width - Paddle width
   * @param {number} height - Paddle height
   * @param {number} speed - Movement speed (default: 300 px/s)
   */
  constructor(x: number, y: number, width: number, height: number, speed: number = 300) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
  }

  /**
   * Moves the paddle left by speed * deltaTime
   * @param {number} deltaTime - Time elapsed since last frame (in seconds)
   */
  public moveLeft(deltaTime: number): void {
    this.x -= this.speed * deltaTime;
    if (this.x < 0) {
      this.x = 0;
    }
  }

  /**
   * Moves the paddle right by speed * deltaTime
   * @param {number} deltaTime - Time elapsed since last frame (in seconds)
   * @param {number} canvasWidth - Width of the game canvas
   */
  public moveRight(deltaTime: number, canvasWidth: number): void {
    this.x += this.speed * deltaTime;
    const maxX = canvasWidth - this.width;
    if (this.x > maxX) {
      this.x = maxX;
    }
  }

  /**
   * Gets the bounding box of the paddle for collision detection
   * @returns {Object} Bounding box with left, right, top, bottom
   */
  public getBounds(): { left: number; right: number; top: number; bottom: number } {
    return {
      left: this.x,
      right: this.x + this.width,
      top: this.y,
      bottom: this.y + this.height
    };
  }

  /**
   * Sets the position of the paddle
   * @param {number} x - New X position
   * @param {number} y - New Y position
   */
  public setPosition(x: number, y: number): void {
    this.x = x;
    this.y = y;
  }
}
