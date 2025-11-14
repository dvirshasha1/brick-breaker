import { Ball } from '../entities/Ball';
import { Paddle } from '../entities/Paddle';
import { BrickGrid } from '../entities/BrickGrid';
import { PhysicsEngine } from '../systems/PhysicsEngine';

/**
 * Game state enum
 */
export enum GameState {
  MENU = 'MENU',
  PLAYING = 'PLAYING',
  PAUSED = 'PAUSED',
  GAME_OVER = 'GAME_OVER',
  WON = 'WON'
}

/**
 * Main game engine managing game loop and state
 * @class GameEngine
 */
export class GameEngine {
  private canvasWidth: number;
  private canvasHeight: number;
  private state: GameState;
  private score: number;
  private lives: number;
  private level: number;
  
  private paddle: Paddle;
  private ball: Ball;
  private brickGrid: BrickGrid;
  private physicsEngine: PhysicsEngine;

  /**
   * Creates a new GameEngine instance
   * @param {number} canvasWidth - Width of the game canvas
   * @param {number} canvasHeight - Height of the game canvas
   */
  constructor(canvasWidth: number, canvasHeight: number) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.state = GameState.MENU;
    this.score = 0;
    this.lives = 3;
    this.level = 1;

    // Initialize game entities
    const paddleY = canvasHeight - 50;
    this.paddle = new Paddle(canvasWidth / 2 - 50, paddleY, 100, 20);
    this.ball = new Ball(canvasWidth / 2, paddleY - 20, 10);
    this.brickGrid = new BrickGrid(5, 8, 75, 20, 50, 50);
    this.physicsEngine = new PhysicsEngine(canvasWidth, canvasHeight);
  }

  /**
   * Gets current game state
   * @returns {GameState} Current game state
   */
  public getState(): GameState {
    return this.state;
  }

  /**
   * Sets game state
   * @param {GameState} state - New game state
   */
  public setState(state: GameState): void {
    this.state = state;
  }

  /**
   * Gets current score
   * @returns {number} Current score
   */
  public getScore(): number {
    return this.score;
  }

  /**
   * Gets remaining lives
   * @returns {number} Remaining lives
   */
  public getLives(): number {
    return this.lives;
  }

  /**
   * Gets current level
   * @returns {number} Current level
   */
  public getLevel(): number {
    return this.level;
  }

  /**
   * Adds to score
   * @param {number} points - Points to add
   */
  public addScore(points: number): void {
    this.score += points;
  }

  /**
   * Reduces lives by 1 and checks for game over
   */
  public loseLife(): void {
    this.lives--;
    if (this.lives <= 0) {
      this.state = GameState.GAME_OVER;
    }
  }

  /**
   * Starts the game
   */
  public start(): void {
    this.state = GameState.PLAYING;
    this.ball.launch(-90); // Launch ball upward
  }

  /**
   * Pauses the game
   */
  public pause(): void {
    if (this.state === GameState.PLAYING) {
      this.state = GameState.PAUSED;
    }
  }

  /**
   * Resumes the game from pause
   */
  public resume(): void {
    if (this.state === GameState.PAUSED) {
      this.state = GameState.PLAYING;
    }
  }

  /**
   * Restarts the game to initial state
   */
  public restart(): void {
    this.state = GameState.MENU;
    this.score = 0;
    this.lives = 3;
    this.level = 1;
    
    // Reset entities
    const paddleY = this.canvasHeight - 50;
    this.paddle.setPosition(this.canvasWidth / 2 - 50, paddleY);
    this.ball.reset(this.canvasWidth / 2, paddleY - 20);
    this.brickGrid.reset();
  }

  /**
   * Updates game state based on delta time
   * @param {number} deltaTime - Time since last update (in seconds)
   */
  public update(deltaTime: number): void {
    if (this.state !== GameState.PLAYING) {
      return;
    }

    // Update ball physics
    this.physicsEngine.updateBall(this.ball, deltaTime);

    // Check paddle collision
    this.physicsEngine.checkPaddleCollision(this.ball, this.paddle);

    // Check brick collisions
    const brickHit = this.physicsEngine.checkBrickCollisions(this.ball, this.brickGrid);
    if (brickHit) {
      this.addScore(10);
    }

    // Check if ball out of bounds
    if (this.physicsEngine.isBallOutOfBounds(this.ball)) {
      this.loseLife();
      if (this.lives > 0) {
        const paddleY = this.canvasHeight - 50;
        this.ball.reset(this.canvasWidth / 2, paddleY - 20);
      }
    }

    // Check win condition
    if (this.brickGrid.allBricksDestroyed()) {
      this.state = GameState.WON;
    }
  }

  /**
   * Moves paddle left
   * @param {number} deltaTime - Time since last update (in seconds)
   */
  public movePaddleLeft(deltaTime: number): void {
    this.paddle.moveLeft(deltaTime);
  }

  /**
   * Moves paddle right
   * @param {number} deltaTime - Time since last update (in seconds)
   */
  public movePaddleRight(deltaTime: number): void {
    this.paddle.moveRight(deltaTime, this.canvasWidth);
  }

  /**
   * Gets paddle instance
   * @returns {Paddle} The game paddle
   */
  public getPaddle(): Paddle {
    return this.paddle;
  }

  /**
   * Gets ball instance
   * @returns {Ball} The game ball
   */
  public getBall(): Ball {
    return this.ball;
  }

  /**
   * Gets brick grid instance
   * @returns {BrickGrid} The brick grid
   */
  public getBrickGrid(): BrickGrid {
    return this.brickGrid;
  }
}
