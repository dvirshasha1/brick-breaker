/**
 * Represents the game ball with physics properties
 * @class Ball
 */
export class Ball {
  /**
   * X position of the ball (center)
   */
  public x: number;

  /**
   * Y position of the ball (center)
   */
  public y: number;

  /**
   * Radius of the ball
   */
  public readonly radius: number;

  /**
   * Horizontal velocity in pixels per second
   */
  public velocityX: number;

  /**
   * Vertical velocity in pixels per second
   */
  public velocityY: number;

  /**
   * Maximum speed of the ball
   */
  public readonly speed: number;

  /**
   * Creates a new Ball instance
   * @param {number} x - Initial X position
   * @param {number} y - Initial Y position
   * @param {number} radius - Ball radius
   * @param {number} speed - Maximum speed (default: 300 px/s)
   */
  constructor(x: number, y: number, radius: number, speed: number = 300) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speed = speed;
    this.velocityX = 0;
    this.velocityY = 0;
  }

  /**
   * Updates ball position based on velocity and delta time
   * @param {number} deltaTime - Time elapsed since last frame (in seconds)
   */
  public update(deltaTime: number): void {
    this.x += this.velocityX * deltaTime;
    this.y += this.velocityY * deltaTime;
  }

  /**
   * Launches the ball at a given angle
   * @param {number} angleDegrees - Launch angle in degrees (0 = right, -90 = up)
   */
  public launch(angleDegrees: number): void {
    const angleRadians = (angleDegrees * Math.PI) / 180;
    this.velocityX = this.speed * Math.cos(angleRadians);
    this.velocityY = this.speed * Math.sin(angleRadians);
  }

  /**
   * Reverses horizontal velocity (for wall/paddle collisions)
   */
  public reverseX(): void {
    this.velocityX = -this.velocityX;
  }

  /**
   * Reverses vertical velocity (for wall/brick collisions)
   */
  public reverseY(): void {
    this.velocityY = -this.velocityY;
  }

  /**
   * Gets the bounding box of the ball for collision detection
   * @returns {Object} Bounding box with left, right, top, bottom
   */
  public getBounds(): { left: number; right: number; top: number; bottom: number } {
    return {
      left: this.x - this.radius,
      right: this.x + this.radius,
      top: this.y - this.radius,
      bottom: this.y + this.radius
    };
  }

  /**
   * Resets the ball to a given position with zero velocity
   * @param {number} x - Reset X position
   * @param {number} y - Reset Y position
   */
  public reset(x: number, y: number): void {
    this.x = x;
    this.y = y;
    this.velocityX = 0;
    this.velocityY = 0;
  }
}
