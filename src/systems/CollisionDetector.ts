import { Ball } from '../entities/Ball';
import { Paddle } from '../entities/Paddle';
import { Brick } from '../entities/Brick';

/**
 * Handles collision detection using AABB (Axis-Aligned Bounding Box) algorithm
 * @class CollisionDetector
 */
export class CollisionDetector {
  /**
   * Checks collision between ball and paddle
   * @param {Ball} ball - The game ball
   * @param {Paddle} paddle - The player paddle
   * @returns {boolean} True if collision detected
   */
  public static checkBallPaddleCollision(ball: Ball, paddle: Paddle): boolean {
    const ballBounds = ball.getBounds();
    const paddleBounds = paddle.getBounds();

    return (
      ballBounds.right >= paddleBounds.left &&
      ballBounds.left <= paddleBounds.right &&
      ballBounds.bottom >= paddleBounds.top &&
      ballBounds.top <= paddleBounds.bottom
    );
  }

  /**
   * Checks collision between ball and a brick
   * @param {Ball} ball - The game ball
   * @param {Brick} brick - A brick
   * @returns {boolean} True if collision detected and brick is not destroyed
   */
  public static checkBallBrickCollision(ball: Ball, brick: Brick): boolean {
    if (brick.isDestroyed()) {
      return false;
    }

    const ballBounds = ball.getBounds();
    const brickBounds = brick.getBounds();

    return (
      ballBounds.right >= brickBounds.left &&
      ballBounds.left <= brickBounds.right &&
      ballBounds.bottom >= brickBounds.top &&
      ballBounds.top <= brickBounds.bottom
    );
  }

  /**
   * Checks collision between ball and canvas walls
   * @param {Ball} ball - The game ball
   * @param {number} canvasWidth - Width of the canvas
   * @param {number} _canvasHeight - Height of the canvas (unused)
   * @returns {Object} Object with left, right, top collision flags
   */
  public static checkBallWallCollision(
    ball: Ball,
    canvasWidth: number,
    _canvasHeight: number
  ): { left: boolean; right: boolean; top: boolean } {
    const ballBounds = ball.getBounds();

    return {
      left: ballBounds.left <= 0,
      right: ballBounds.right >= canvasWidth,
      top: ballBounds.top <= 0
    };
  }

  /**
   * Checks if ball has gone out of bounds (below canvas)
   * @param {Ball} ball - The game ball
   * @param {number} canvasHeight - Height of the canvas
   * @returns {boolean} True if ball is out of bounds
   */
  public static checkBallOutOfBounds(ball: Ball, canvasHeight: number): boolean {
    return ball.y + ball.radius > canvasHeight;
  }
}
