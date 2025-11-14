/**
 * HomePage Component Tests
 * 
 * Tests for the welcome home page component
 */

import { HomePage } from '../../../src/ui/HomePage';

describe('HomePage', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    // Create a container element for testing
    container = document.createElement('div');
    container.id = 'test-container';
    document.body.appendChild(container);
  });

  afterEach(() => {
    // Clean up after each test
    document.body.removeChild(container);
  });

  describe('Constructor', () => {
    it('should create an instance with a valid container', () => {
      const homePage = new HomePage('test-container');
      expect(homePage).toBeInstanceOf(HomePage);
    });

    it('should throw an error if container does not exist', () => {
      expect(() => {
        new HomePage('non-existent-container');
      }).toThrow('Container with id "non-existent-container" not found');
    });
  });

  describe('render', () => {
    it('should render the home page content', () => {
      const homePage = new HomePage('test-container');
      homePage.render();

      expect(container.innerHTML).toContain('Brick Breaker Game');
      expect(container.innerHTML).toContain('Welcome to Brick Breaker');
    });

    it('should render all sections', () => {
      const homePage = new HomePage('test-container');
      homePage.render();

      expect(container.querySelector('.welcome')).toBeTruthy();
      expect(container.querySelector('.instructions')).toBeTruthy();
      expect(container.querySelector('.actions')).toBeTruthy();
    });

    it('should render start and settings buttons', () => {
      const homePage = new HomePage('test-container');
      homePage.render();

      const startBtn = homePage.getStartButton();
      const settingsBtn = homePage.getSettingsButton();

      expect(startBtn).toBeTruthy();
      expect(settingsBtn).toBeTruthy();
      expect(startBtn?.textContent).toContain('Start Game');
      expect(settingsBtn?.textContent).toContain('Settings');
    });

    it('should render instructions list', () => {
      const homePage = new HomePage('test-container');
      homePage.render();

      const listItems = container.querySelectorAll('li');
      expect(listItems.length).toBe(3);
      expect(listItems[0].textContent).toContain('arrow keys');
      expect(listItems[1].textContent).toContain('bricks');
      expect(listItems[2].textContent).toContain('ball fall');
    });
  });

  describe('getStartButton', () => {
    it('should return the start button after render', () => {
      const homePage = new HomePage('test-container');
      homePage.render();

      const button = homePage.getStartButton();
      expect(button).toBeTruthy();
      expect(button?.id).toBe('start-game-btn');
    });

    it('should return null if not rendered', () => {
      const homePage = new HomePage('test-container');
      // Don't call render
      const button = homePage.getStartButton();
      expect(button).toBeNull();
    });
  });

  describe('getSettingsButton', () => {
    it('should return the settings button after render', () => {
      const homePage = new HomePage('test-container');
      homePage.render();

      const button = homePage.getSettingsButton();
      expect(button).toBeTruthy();
      expect(button?.id).toBe('settings-btn');
    });

    it('should return null if not rendered', () => {
      const homePage = new HomePage('test-container');
      // Don't call render
      const button = homePage.getSettingsButton();
      expect(button).toBeNull();
    });
  });

  describe('getHeading', () => {
    it('should return the main heading after render', () => {
      const homePage = new HomePage('test-container');
      homePage.render();

      const heading = homePage.getHeading();
      expect(heading).toBeTruthy();
      expect(heading?.textContent).toBe('Brick Breaker Game');
    });

    it('should return null if not rendered', () => {
      const homePage = new HomePage('test-container');
      // Don't call render
      const heading = homePage.getHeading();
      expect(heading).toBeNull();
    });
  });

  describe('onStartGame', () => {
    it('should attach event listener to start button', () => {
      const homePage = new HomePage('test-container');
      homePage.render();

      const callback = jest.fn();
      homePage.onStartGame(callback);

      const button = homePage.getStartButton();
      button?.click();

      expect(callback).toHaveBeenCalledTimes(1);
    });

    it('should not throw if button is not rendered', () => {
      const homePage = new HomePage('test-container');
      const callback = jest.fn();

      expect(() => {
        homePage.onStartGame(callback);
      }).not.toThrow();
    });
  });

  describe('onSettings', () => {
    it('should attach event listener to settings button', () => {
      const homePage = new HomePage('test-container');
      homePage.render();

      const callback = jest.fn();
      homePage.onSettings(callback);

      const button = homePage.getSettingsButton();
      button?.click();

      expect(callback).toHaveBeenCalledTimes(1);
    });

    it('should not throw if button is not rendered', () => {
      const homePage = new HomePage('test-container');
      const callback = jest.fn();

      expect(() => {
        homePage.onSettings(callback);
      }).not.toThrow();
    });
  });

  describe('Multiple renders', () => {
    it('should replace content on multiple renders', () => {
      const homePage = new HomePage('test-container');
      
      homePage.render();
      const firstRender = container.innerHTML;
      
      homePage.render();
      const secondRender = container.innerHTML;
      
      expect(firstRender).toBe(secondRender);
    });
  });
});
