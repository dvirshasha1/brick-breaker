import { Ball } from '../entities/Ball';
import { Paddle } from '../entities/Paddle';
import { BrickGrid } from '../entities/BrickGrid';
import { CollisionDetector } from './CollisionDetector';

/**
 * Manages physics updates and collision responses
 * @class PhysicsEngine
 */
export class PhysicsEngine {
  /**
   * Canvas width
   */
  private readonly canvasWidth: number;

  /**
   * Canvas height
   */
  private readonly canvasHeight: number;

  /**
   * Creates a new PhysicsEngine instance
   * @param {number} canvasWidth - Width of the game canvas
   * @param {number} canvasHeight - Height of the game canvas
   */
  constructor(canvasWidth: number, canvasHeight: number) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
  }

  /**
   * Updates ball position and handles wall collisions
   * @param {Ball} ball - The game ball
   * @param {number} deltaTime - Time elapsed since last frame (in seconds)
   */
  public updateBall(ball: Ball, deltaTime: number): void {
    ball.update(deltaTime);

    const wallCollision = CollisionDetector.checkBallWallCollision(
      ball,
      this.canvasWidth,
      this.canvasHeight
    );

    if (wallCollision.left || wallCollision.right) {
      ball.reverseX();
      // Correct position to prevent sticking
      if (wallCollision.left) {
        ball.x = ball.radius;
      } else if (wallCollision.right) {
        ball.x = this.canvasWidth - ball.radius;
      }
    }

    if (wallCollision.top) {
      ball.reverseY();
      ball.y = ball.radius;
    }
  }

  /**
   * Checks and handles paddle collision
   * @param {Ball} ball - The game ball
   * @param {Paddle} paddle - The player paddle
   * @returns {boolean} True if collision occurred
   */
  public checkPaddleCollision(ball: Ball, paddle: Paddle): boolean {
    const collision = CollisionDetector.checkBallPaddleCollision(ball, paddle);
    
    if (collision) {
      ball.reverseY();
      // Position ball just above paddle to prevent multiple collisions
      ball.y = paddle.y - ball.radius;
    }

    return collision;
  }

  /**
   * Checks and handles brick collisions
   * @param {Ball} ball - The game ball
   * @param {BrickGrid} grid - The brick grid
   * @returns {boolean} True if any collision occurred
   */
  public checkBrickCollisions(ball: Ball, grid: BrickGrid): boolean {
    const activeBricks = grid.getActiveBricks();
    
    for (const brick of activeBricks) {
      const collision = CollisionDetector.checkBallBrickCollision(ball, brick);
      
      if (collision) {
        brick.hit();
        ball.reverseY();
        return true;
      }
    }

    return false;
  }

  /**
   * Checks if ball is out of bounds
   * @param {Ball} ball - The game ball
   * @returns {boolean} True if ball is out of bounds
   */
  public isBallOutOfBounds(ball: Ball): boolean {
    return CollisionDetector.checkBallOutOfBounds(ball, this.canvasHeight);
  }
}
