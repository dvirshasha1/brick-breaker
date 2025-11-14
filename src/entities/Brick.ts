/**
 * Represents a single brick in the game
 * @class Brick
 */
export class Brick {
  /**
   * X position of the brick (top-left corner)
   */
  public readonly x: number;

  /**
   * Y position of the brick (top-left corner)
   */
  public readonly y: number;

  /**
   * Width of the brick
   */
  public readonly width: number;

  /**
   * Height of the brick
   */
  public readonly height: number;

  /**
   * Current health of the brick
   */
  public health: number;

  /**
   * Initial health of the brick (for reset)
   */
  private readonly initialHealth: number;

  /**
   * Whether the brick is destroyed
   */
  public destroyed: boolean;

  /**
   * Color of the brick
   */
  public readonly color: string;

  /**
   * Creates a new Brick instance
   * @param {number} x - X position
   * @param {number} y - Y position
   * @param {number} width - Brick width
   * @param {number} height - Brick height
   * @param {number} health - Brick health (hits to destroy)
   * @param {string} color - Brick color (default: '#FF6B6B')
   */
  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    health: number,
    color: string = '#FF6B6B'
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.health = health;
    this.initialHealth = health;
    this.destroyed = false;
    this.color = color;
  }

  /**
   * Reduces brick health by 1 and marks as destroyed if health reaches 0
   */
  public hit(): void {
    if (this.health > 0) {
      this.health--;
    }
    if (this.health === 0) {
      this.destroyed = true;
    }
  }

  /**
   * Gets the bounding box of the brick for collision detection
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
   * Checks if the brick is destroyed
   * @returns {boolean} True if destroyed, false otherwise
   */
  public isDestroyed(): boolean {
    return this.destroyed;
  }

  /**
   * Resets the brick to its initial state
   */
  public restore(): void {
    this.health = this.initialHealth;
    this.destroyed = false;
  }
}
