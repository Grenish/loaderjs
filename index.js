/**
 * Demo implementation showcasing the professional @grenishrai/loaderjs library
 * This file demonstrates various loader types, configurations, and advanced features
 */

import Loader, { LoaderError } from './Loader.js';

// Demo: Basic loader with error handling
async function createBasicLoader() {
  try {
    const loader = new Loader({
      type: 'pulse',
      speed: 'normal',
      ariaLabel: 'Loading content...',
      onShow: (loaderInstance) => {
        console.log('Loader shown:', loaderInstance.type);
      },
      onHide: (loaderInstance) => {
        console.log('Loader hidden:', loaderInstance.type);
      }
    });

    await loader.show();

    // Auto-hide after 3 seconds
    setTimeout(async () => {
      await loader.hide();
      console.log('Basic demo completed');
    }, 3000);

    return loader;
  } catch (error) {
    console.error('Error creating loader:', error.message);
  }
}

// Demo: Loader with overlay
async function createOverlayLoader() {
  const overlayLoader = new Loader({
    type: 'wave',
    speed: 'fast',
    overlay: true,
    ariaLabel: 'Processing your request...'
  });

  await overlayLoader.show();

  // Simulate async operation
  setTimeout(async () => {
    await overlayLoader.hide();
    overlayLoader.destroy(); // Clean up resources
    console.log('Overlay demo completed');
  }, 4000);
}

// Demo: Container-specific loader
async function createContainerLoader() {
  // Create a container element
  const container = document.createElement('div');
  container.id = 'demo-container';
  container.style.cssText = `
    width: 200px;
    height: 200px;
    border: 2px solid #3498db;
    border-radius: 10px;
    margin: 20px auto;
    position: relative;
  `;
  document.body.appendChild(container);

  const containerLoader = new Loader({
    type: 'square',
    speed: 'slow',
    container: '#demo-container',
    className: 'custom-loader'
  });

  await containerLoader.show();

  setTimeout(async () => {
    await containerLoader.hide();
    containerLoader.destroy();
    document.body.removeChild(container);
    console.log('Container demo completed');
  }, 5000);
}

// Demo: Dynamic loader type changes
async function createDynamicLoader() {
  const dynamicLoader = new Loader({
    type: 'round',
    speed: 'normal'
  });

  await dynamicLoader.show();

  const types = Loader.getValidTypes();
  let currentIndex = 0;

  const interval = setInterval(async () => {
    currentIndex = (currentIndex + 1) % types.length;
    try {
      dynamicLoader.type = types[currentIndex];
      console.log(`Changed to: ${types[currentIndex]}`);
    } catch (error) {
      console.error('Error changing type:', error.message);
    }
  }, 1000);

  // Stop after 10 seconds
  setTimeout(async () => {
    clearInterval(interval);
    await dynamicLoader.hide();
    dynamicLoader.destroy();
    console.log('Dynamic demo completed');
  }, 10000);
}

// Demo: Event listeners
function createEventListenerDemo() {
  const eventLoader = new Loader({
    type: 'playDots2',
    speed: 'normal'
  });

  // Listen for custom events
  document.addEventListener('loader:show', (event) => {
    console.log('Event: Loader shown', event.detail.loader.type);
  });

  document.addEventListener('loader:hide', (event) => {
    console.log('Event: Loader hidden', event.detail.loader.type);
  });

  document.addEventListener('loader:destroy', (event) => {
    console.log('Event: Loader destroyed');
  });

  eventLoader.show();

  setTimeout(() => {
    eventLoader.toggle(); // Hide
    setTimeout(() => {
      eventLoader.toggle(); // Show again
      setTimeout(() => {
        eventLoader.destroy();
        console.log('Event demo completed');
      }, 2000);
    }, 2000);
  }, 2000);
}

// Demo: Error handling
function createErrorDemo() {
  try {
    // This will throw an error
    const invalidLoader = new Loader({
      type: 'invalid-type',
      speed: 'normal'
    });
  } catch (error) {
    if (error instanceof LoaderError) {
      console.error(`LoaderError [${error.code}]: ${error.message}`);
    }
  }

  try {
    // This will also throw an error
    const invalidSpeedLoader = new Loader({
      type: 'pulse',
      speed: 'super-fast'
    });
  } catch (error) {
    if (error instanceof LoaderError) {
      console.error(`LoaderError [${error.code}]: ${error.message}`);
    }
  }
}

// Demo: Static factory method
async function createFactoryDemo() {
  const quickLoader = await Loader.create({
    type: 'scroll',
    speed: 'fast',
    overlay: true
  });

  setTimeout(() => {
    quickLoader.destroy();
    console.log('Factory demo completed');
  }, 3000);
}

// Main demo execution
async function runDemos() {
  console.log('Starting @grenishrai/loaderjs professional demos...');
  console.log('Available types:', Loader.getValidTypes());
  console.log('Available speeds:', Loader.getValidSpeeds());

  // Run demos sequentially with delays
  await createBasicLoader();
  
  setTimeout(() => createOverlayLoader(), 4000);
  setTimeout(() => createContainerLoader(), 8000);
  setTimeout(() => createDynamicLoader(), 14000);
  setTimeout(() => createEventListenerDemo(), 25000);
  setTimeout(() => createErrorDemo(), 33000);
  setTimeout(() => createFactoryDemo(), 34000);
}

// Initialize demos when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', runDemos);
} else {
  runDemos();
}

