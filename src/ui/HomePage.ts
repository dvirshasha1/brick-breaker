/**
 * HomePage Component
 * 
 * Renders the welcome home page for the brick breaker game.
 * Displays welcome message and game information.
 */

export class HomePage {
  private container: HTMLElement;

  /**
   * Initialize the home page component
   * @param containerId - ID of the container element
   */
  constructor(containerId: string) {
    const element = document.getElementById(containerId);
    if (!element) {
      throw new Error(`Container with id "${containerId}" not found`);
    }
    this.container = element;
  }

  /**
   * Render the home page
   */
  render(): void {
    const content = `
      <div class="home-page">
        <header class="game-header">
          <h1>Brick Breaker Game</h1>
        </header>
        <main class="game-content">
          <section class="welcome">
            <h2>Welcome to Brick Breaker</h2>
            <p>A classic arcade game built with TypeScript and Canvas</p>
          </section>
          <section class="instructions">
            <h3>How to Play</h3>
            <ul>
              <li>Use arrow keys to move the paddle</li>
              <li>Break all the bricks to advance</li>
              <li>Don't let the ball fall!</li>
            </ul>
          </section>
          <section class="actions">
            <button id="start-game-btn" class="btn btn-primary">Start Game</button>
            <button id="settings-btn" class="btn btn-secondary">Settings</button>
          </section>
        </main>
      </div>
    `;
    this.container.innerHTML = content;
  }

  /**
   * Get the start game button element
   */
  getStartButton(): HTMLButtonElement | null {
    return document.getElementById('start-game-btn') as HTMLButtonElement | null;
  }

  /**
   * Get the settings button element
   */
  getSettingsButton(): HTMLButtonElement | null {
    return document.getElementById('settings-btn') as HTMLButtonElement | null;
  }

  /**
   * Get the main heading
   */
  getHeading(): HTMLHeadingElement | null {
    return this.container.querySelector('h1') as HTMLHeadingElement | null;
  }

  /**
   * Attach event listener to start button
   */
  onStartGame(callback: () => void): void {
    const button = this.getStartButton();
    if (button) {
      button.addEventListener('click', callback);
    }
  }

  /**
   * Attach event listener to settings button
   */
  onSettings(callback: () => void): void {
    const button = this.getSettingsButton();
    if (button) {
      button.addEventListener('click', callback);
    }
  }
}
