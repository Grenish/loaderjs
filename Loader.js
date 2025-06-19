/**
 * @grenishrai/loaderjs - Professional Loading Animation Library
 * A lightweight, customizable loading animation library for modern web applications
 * 
 * @version 2.0.0
 * @author grenishrai
 * @license MIT
 */

// Type definitions for better IDE support
/**
 * @typedef {'round' | 'bar' | 'pulse' | 'wave' | 'playDots1' | 'playDots2' | 'playDots3' | 'scroll' | 'square' | 'lock'} LoaderType
 * @typedef {'slow' | 'normal' | 'fast'} LoaderSpeed
 * @typedef {Object} LoaderOptions
 * @property {LoaderType} [type='round'] - The type of loader animation
 * @property {LoaderSpeed} [speed='normal'] - The animation speed
 * @property {HTMLElement|string} [container] - Container element or selector
 * @property {string} [className] - Additional CSS class names
 * @property {boolean} [overlay=false] - Whether to show overlay background
 * @property {string} [ariaLabel='Loading'] - Accessibility label
 * @property {Function} [onShow] - Callback when loader is shown
 * @property {Function} [onHide] - Callback when loader is hidden
 */

const DEFAULT_OPTIONS = {
  type: 'round',
  speed: 'normal',
  container: null,
  className: '',
  overlay: false,
  ariaLabel: 'Loading',
  onShow: null,
  onHide: null
};

const VALID_TYPES = ['round', 'bar', 'pulse', 'wave', 'playDots1', 'playDots2', 'playDots3', 'scroll', 'square', 'lock'];
const VALID_SPEEDS = ['slow', 'normal', 'fast'];

/**
 * LoaderError - Custom error class for loader-specific errors
 */
class LoaderError extends Error {
  constructor(message, code = 'LOADER_ERROR') {
    super(message);
    this.name = 'LoaderError';
    this.code = code;
  }
}

/**
 * Loader - Professional loading animation component
 */
export default class Loader {
  #element = null;
  #container = null;
  #overlay = null;
  #options = {};
  #isVisible = false;
  #destroyed = false;

  /**
   * Create a new Loader instance
   * @param {LoaderOptions} options - Configuration options
   */
  constructor(options = {}) {
    this.#validateOptions(options);
    this.#options = { ...DEFAULT_OPTIONS, ...options };
    this.#init();
  }

  /**
   * Validate constructor options
   * @private
   * @param {LoaderOptions} options
   */
  #validateOptions(options) {
    if (options.type && !VALID_TYPES.includes(options.type)) {
      throw new LoaderError(
        `Invalid loader type: "${options.type}". Valid types: ${VALID_TYPES.join(', ')}`,
        'INVALID_TYPE'
      );
    }

    if (options.speed && !VALID_SPEEDS.includes(options.speed)) {
      throw new LoaderError(
        `Invalid loader speed: "${options.speed}". Valid speeds: ${VALID_SPEEDS.join(', ')}`,
        'INVALID_SPEED'
      );
    }

    if (options.container && typeof options.container !== 'string' && !(options.container instanceof HTMLElement)) {
      throw new LoaderError(
        'Container must be a string selector or HTMLElement',
        'INVALID_CONTAINER'
      );
    }
  }

  /**
   * Initialize the loader
   * @private
   */
  #init() {
    this.#createElements();
    this.#setupAccessibility();
    this.#setupContainer();
    this.#applyStyles();
  }

  /**
   * Create DOM elements
   * @private
   */
  #createElements() {
    // Create main loader element
    this.#element = document.createElement('div');
    this.#element.className = `loader loader-${this.#options.type}`;
    
    if (this.#options.className) {
      this.#element.className += ` ${this.#options.className}`;
    }

    this.#element.dataset.type = `loader-${this.#options.type}`;

    // Create overlay if needed
    if (this.#options.overlay) {
      this.#overlay = document.createElement('div');
      this.#overlay.className = 'loader-overlay';
      this.#overlay.appendChild(this.#element);
    }
  }

  /**
   * Setup accessibility attributes
   * @private
   */
  #setupAccessibility() {
    const targetElement = this.#overlay || this.#element;
    targetElement.setAttribute('role', 'status');
    targetElement.setAttribute('aria-label', this.#options.ariaLabel);
    targetElement.setAttribute('aria-live', 'polite');
  }

  /**
   * Setup container
   * @private
   */
  #setupContainer() {
    if (this.#options.container) {
      if (typeof this.#options.container === 'string') {
        this.#container = document.querySelector(this.#options.container);
        if (!this.#container) {
          throw new LoaderError(
            `Container not found: "${this.#options.container}"`,
            'CONTAINER_NOT_FOUND'
          );
        }
      } else {
        this.#container = this.#options.container;
      }
    } else {
      this.#container = document.body;
    }
  }

  /**
   * Apply styles and speed
   * @private
   */
  #applyStyles() {
    const targetElement = this.#overlay || this.#element;
    targetElement.style.animationDuration = `var(--animation-speed-${this.#options.speed})`;
    
    if (this.#overlay) {
      targetElement.style.display = 'none';
    } else {
      targetElement.style.display = 'none';
    }
  }

  /**
   * Show the loader
   * @returns {Promise<void>}
   */
  async show() {
    if (this.#destroyed) {
      throw new LoaderError('Cannot show destroyed loader', 'LOADER_DESTROYED');
    }

    if (this.#isVisible) return;

    const targetElement = this.#overlay || this.#element;
    
    if (!targetElement.parentElement) {
      this.#container.appendChild(targetElement);
    }

    targetElement.style.display = 'flex';
    this.#isVisible = true;

    // Trigger callback
    if (typeof this.#options.onShow === 'function') {
      try {
        await this.#options.onShow(this);
      } catch (error) {
        console.warn('Error in onShow callback:', error);
      }
    }

    // Dispatch custom event
    this.#dispatchEvent('show');
  }

  /**
   * Hide the loader
   * @returns {Promise<void>}
   */
  async hide() {
    if (this.#destroyed || !this.#isVisible) return;

    const targetElement = this.#overlay || this.#element;
    targetElement.style.display = 'none';
    this.#isVisible = false;

    // Trigger callback
    if (typeof this.#options.onHide === 'function') {
      try {
        await this.#options.onHide(this);
      } catch (error) {
        console.warn('Error in onHide callback:', error);
      }
    }

    // Dispatch custom event
    this.#dispatchEvent('hide');
  }

  /**
   * Toggle loader visibility
   * @returns {Promise<void>}
   */
  async toggle() {
    if (this.#isVisible) {
      await this.hide();
    } else {
      await this.show();
    }
  }

  /**
   * Destroy the loader and clean up resources
   */
  destroy() {
    if (this.#destroyed) return;

    this.hide();
    
    const targetElement = this.#overlay || this.#element;
    if (targetElement.parentElement) {
      targetElement.parentElement.removeChild(targetElement);
    }

    this.#element = null;
    this.#overlay = null;
    this.#container = null;
    this.#options = null;
    this.#destroyed = true;

    // Dispatch custom event
    this.#dispatchEvent('destroy');
  }

  /**
   * Dispatch custom events
   * @private
   * @param {string} eventType
   */
  #dispatchEvent(eventType) {
    if (typeof window !== 'undefined' && window.CustomEvent) {
      const event = new CustomEvent(`loader:${eventType}`, {
        detail: { loader: this },
        bubbles: true
      });
      
      const targetElement = this.#overlay || this.#element;
      if (targetElement && targetElement.parentElement) {
        targetElement.dispatchEvent(event);
      }
    }
  }

  // Getters
  get type() {
    return this.#options.type;
  }

  get speed() {
    return this.#options.speed;
  }

  get isVisible() {
    return this.#isVisible;
  }

  get isDestroyed() {
    return this.#destroyed;
  }

  get element() {
    return this.#element;
  }

  // Setters
  set type(value) {
    if (this.#destroyed) {
      throw new LoaderError('Cannot modify destroyed loader', 'LOADER_DESTROYED');
    }

    if (!VALID_TYPES.includes(value)) {
      throw new LoaderError(
        `Invalid loader type: "${value}". Valid types: ${VALID_TYPES.join(', ')}`,
        'INVALID_TYPE'
      );
    }

    // Remove old classes
    this.#element.className = this.#element.className
      .split(' ')
      .filter(cls => !cls.startsWith('loader-') || cls === 'loader')
      .join(' ');

    // Add new class
    this.#element.classList.add(`loader-${value}`);
    this.#element.dataset.type = `loader-${value}`;
    this.#options.type = value;
  }

  set speed(value) {
    if (this.#destroyed) {
      throw new LoaderError('Cannot modify destroyed loader', 'LOADER_DESTROYED');
    }

    if (!VALID_SPEEDS.includes(value)) {
      throw new LoaderError(
        `Invalid loader speed: "${value}". Valid speeds: ${VALID_SPEEDS.join(', ')}`,
        'INVALID_SPEED'
      );
    }

    const targetElement = this.#overlay || this.#element;
    targetElement.style.animationDuration = `var(--animation-speed-${value})`;
    this.#options.speed = value;
  }

  /**
   * Static method to create and show a loader in one call
   * @param {LoaderOptions} options
   * @returns {Promise<Loader>}
   */
  static async create(options = {}) {
    const loader = new Loader(options);
    await loader.show();
    return loader;
  }

  /**
   * Static method to get all valid loader types
   * @returns {string[]}
   */
  static getValidTypes() {
    return [...VALID_TYPES];
  }

  /**
   * Static method to get all valid speeds
   * @returns {string[]}
   */
  static getValidSpeeds() {
    return [...VALID_SPEEDS];
  }
}

// Export error class for external use
export { LoaderError };
