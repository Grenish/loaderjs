# @grenishrai/loaderjs v2.0.0

[![npm version](https://badge.fury.io/js/%40grenishrai%2Floaderjs.svg)](https://www.npmjs.com/package/@grenishrai/loaderjs)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A **professional, lightweight JavaScript library** for customizable loading animations. Built with modern ES6+ modules, featuring TypeScript support, accessibility, event system, overlay support, and comprehensive error handling for production-ready web applications.

## ✨ Features

- 🎨 **10 Beautiful Animations** - Round, Bar, Pulse, Wave, PlayDots, Scroll, Square, Lock
- ⚡ **Lightweight** - Zero dependencies, minimal footprint
- 🔧 **Highly Configurable** - Speed, container, overlay, callbacks, and more
- ♿ **Accessibility First** - ARIA labels, screen reader support, reduced motion support
- 🎯 **TypeScript Support** - Full type definitions included
- 📱 **Responsive** - Mobile-friendly with adaptive scaling
- 🎪 **Event System** - Custom events for show/hide/destroy
- 🛡️ **Error Handling** - Comprehensive validation and custom error types
- 🎭 **Overlay Support** - Full-screen overlay with backdrop blur
- 🧹 **Memory Safe** - Proper cleanup and resource management
- 🎛️ **Professional API** - Async/await support, method chaining

## 🚀 Quick Start

### Installation

```bash
npm install @grenishrai/loaderjs
```

### Basic Usage

```javascript
import Loader from '@grenishrai/loaderjs';
import '@grenishrai/loaderjs/style.css';

// Create and show a loader
const loader = new Loader({
  type: 'pulse',
  speed: 'normal'
});

await loader.show();

// Hide after 3 seconds
setTimeout(async () => {
  await loader.hide();
}, 3000);
```

### Quick Start with Factory Method

```javascript
// Create and show in one call
const loader = await Loader.create({
  type: 'wave',
  overlay: true,
  ariaLabel: 'Loading content...'
});

// Clean up when done
setTimeout(() => loader.destroy(), 3000);
```

## 📚 API Reference

### Constructor Options

```typescript
interface LoaderOptions {
  type?: 'round' | 'bar' | 'pulse' | 'wave' | 'playDots1' | 'playDots2' | 'playDots3' | 'scroll' | 'square' | 'lock';
  speed?: 'slow' | 'normal' | 'fast';
  container?: HTMLElement | string;
  className?: string;
  overlay?: boolean;
  ariaLabel?: string;
  onShow?: (loader: Loader) => void | Promise<void>;
  onHide?: (loader: Loader) => void | Promise<void>;
}
```

### Methods

| Method | Description | Returns |
|--------|-------------|---------|
| `show()` | Show the loader | `Promise<void>` |
| `hide()` | Hide the loader | `Promise<void>` |
| `toggle()` | Toggle visibility | `Promise<void>` |
| `destroy()` | Clean up resources | `void` |

### Properties

| Property | Description | Type |
|----------|-------------|------|
| `type` | Get/set loader type | `LoaderType` |
| `speed` | Get/set animation speed | `LoaderSpeed` |
| `isVisible` | Check if visible | `boolean` |
| `isDestroyed` | Check if destroyed | `boolean` |
| `element` | Get DOM element | `HTMLElement` |

### Static Methods

| Method | Description | Returns |
|--------|-------------|---------|
| `Loader.create(options)` | Create and show loader | `Promise<Loader>` |
| `Loader.getValidTypes()` | Get all valid types | `string[]` |
| `Loader.getValidSpeeds()` | Get all valid speeds | `string[]` |

## 🎨 Loader Types

| Type | Description | Best For |
|------|-------------|----------|
| `round` | Classic spinning circle | General loading |
| `bar` | Animated progress bar | File uploads |
| `pulse` | Pulsing circle with shadow | Heartbeat-like feedback |
| `wave` | Smooth wave animation | Fluid operations |
| `playDots1` | Moving dots pattern | Playful interfaces |
| `playDots2` | Complex dots animation | Modern designs |
| `playDots3` | Bouncing dots | Interactive feedback |
| `scroll` | Mouse scroll indicator | Page loading |
| `square` | Morphing squares | Geometric designs |
| `lock` | Security-themed loader | Authentication |

## 🎛️ Advanced Examples

### Container-Specific Loader

```javascript
const containerLoader = new Loader({
  type: 'square',
  container: '#my-container',
  className: 'custom-style'
});

await containerLoader.show();
```

### Overlay Loader with Callbacks

```javascript
const overlayLoader = new Loader({
  type: 'wave',
  speed: 'fast',
  overlay: true,
  ariaLabel: 'Processing payment...',
  onShow: (loader) => console.log('Payment processing started'),
  onHide: (loader) => console.log('Payment completed')
});

await overlayLoader.show();
```

### Event Listeners

```javascript
// Listen for custom events
document.addEventListener('loader:show', (event) => {
  console.log('Loader shown:', event.detail.loader.type);
});

document.addEventListener('loader:hide', (event) => {
  console.log('Loader hidden');
});

const loader = new Loader({ type: 'pulse' });
await loader.show(); // Triggers 'loader:show' event
```

### Dynamic Type Changes

```javascript
const loader = new Loader({ type: 'round' });
await loader.show();

// Change type dynamically
setInterval(() => {
  const types = Loader.getValidTypes();
  loader.type = types[Math.floor(Math.random() * types.length)];
}, 1000);
```

### Error Handling

```javascript
import Loader, { LoaderError } from '@grenishrai/loaderjs';

try {
  const loader = new Loader({
    type: 'invalid-type' // This will throw
  });
} catch (error) {
  if (error instanceof LoaderError) {
    console.error(`Error [${error.code}]: ${error.message}`);
  }
}
```

## 🎨 Customization

### CSS Variables

```css
:root {
  --animation-speed-slow: 3s;
  --animation-speed-normal: 2s;
  --animation-speed-fast: 1s;
}
```

### Custom Styling

```css
.loader.my-custom-loader {
  transform: scale(1.5);
  filter: drop-shadow(0 0 10px rgba(52, 152, 219, 0.5));
}

.loader-overlay {
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(5px);
}
```

## ♿ Accessibility

The library includes comprehensive accessibility features:

- **ARIA Labels**: Automatic `role="status"` and `aria-label` attributes
- **Screen Reader Support**: Proper semantic markup
- **Reduced Motion**: Respects `prefers-reduced-motion` settings
- **Keyboard Navigation**: Focus management for overlays

## 🌐 Browser Support

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+
- Modern mobile browsers

## 📱 Responsive Design

Loaders automatically scale on mobile devices and support responsive breakpoints:

```css
@media (max-width: 768px) {
  .loader {
    transform: scale(0.8);
  }
}
```

## 🔧 Development

```bash
# Clone the repository
git clone https://github.com/Grenish/loaderjs.git

# Open demo
open index.html
```

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines and submit pull requests.

## 📈 Changelog

### v2.0.0 (Current)
- ✨ Complete rewrite with modern ES6+ modules
- 🎯 TypeScript support with full type definitions
- ♿ Accessibility improvements (ARIA, screen readers)
- 🎪 Event system for show/hide/destroy
- 🛡️ Comprehensive error handling with custom error types
- 🎭 Overlay support with backdrop blur
- 🧹 Memory management and proper cleanup
- 📱 Responsive design improvements
- 🎛️ Professional API with async/await support

### v1.0.0
- Initial release with basic loader functionality

---

Made with ❤️ by [grenishrai](https://github.com/Grenish)