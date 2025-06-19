/**
 * TypeScript definitions for @grenishrai/loaderjs
 * Professional loading animation library
 */

export type LoaderType = 
  | 'round' 
  | 'bar' 
  | 'pulse' 
  | 'wave' 
  | 'playDots1' 
  | 'playDots2' 
  | 'playDots3' 
  | 'scroll' 
  | 'square' 
  | 'lock';

export type LoaderSpeed = 'slow' | 'normal' | 'fast';

export interface LoaderOptions {
  /** The type of loader animation */
  type?: LoaderType;
  /** The animation speed */
  speed?: LoaderSpeed;
  /** Container element or selector where the loader should be rendered */
  container?: HTMLElement | string;
  /** Additional CSS class names */
  className?: string;
  /** Whether to show overlay background */
  overlay?: boolean;
  /** Accessibility label for screen readers */
  ariaLabel?: string;
  /** Callback when loader is shown */
  onShow?: (loader: Loader) => void | Promise<void>;
  /** Callback when loader is hidden */
  onHide?: (loader: Loader) => void | Promise<void>;
}

export class LoaderError extends Error {
  code: string;
  constructor(message: string, code?: string);
}

export default class Loader {
  /** Create a new Loader instance */
  constructor(options?: LoaderOptions);

  /** Get the loader type */
  get type(): LoaderType;
  /** Set the loader type */
  set type(value: LoaderType);

  /** Get the loader speed */
  get speed(): LoaderSpeed;
  /** Set the loader speed */
  set speed(value: LoaderSpeed);

  /** Check if loader is visible */
  get isVisible(): boolean;

  /** Check if loader is destroyed */
  get isDestroyed(): boolean;

  /** Get the loader DOM element */
  get element(): HTMLElement | null;

  /** Show the loader */
  show(): Promise<void>;

  /** Hide the loader */
  hide(): Promise<void>;

  /** Toggle loader visibility */
  toggle(): Promise<void>;

  /** Destroy the loader and clean up resources */
  destroy(): void;

  /** Create and show a loader in one call */
  static create(options?: LoaderOptions): Promise<Loader>;

  /** Get all valid loader types */
  static getValidTypes(): LoaderType[];

  /** Get all valid speeds */
  static getValidSpeeds(): LoaderSpeed[];
}

/** Custom events dispatched by the loader */
export interface LoaderEvents {
  'loader:show': CustomEvent<{ loader: Loader }>;
  'loader:hide': CustomEvent<{ loader: Loader }>;
  'loader:destroy': CustomEvent<{ loader: Loader }>;
}

declare global {
  interface DocumentEventMap extends LoaderEvents {}
}