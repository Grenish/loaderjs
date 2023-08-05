# @grenishrai/loaderjs Documentation

## Introduction
@grenishrai/loaderjs is a lightweight JavaScript library designed to enhance user experience by adding customizable loading animations to web projects. With various loader types and animation speeds, @grenishrai/loaderjs allows developers to create visually appealing and interactive loading indicators effortlessly.

## Getting Started
### Installation
To use @grenishrai/loaderjs in your project, you can install it through npm:
```javascript
npm install @grenishrai/loaderjs
```
### Usage
1. Import the Loader class:
```javascript
import Loader from '@grenishrai/loaderjs';
```
2. Create a new Loader instance with optional configuration
```javascript
const loader = new Loader({
  type: "loader-round", // Optional: Default is "loader-round"
  speed: "normal",     // Optional: Default is "normal"
});
```
3. Display the loader on your webpage:
```html
<!-- Place the loader container where you want the loader to appear -->
<div id="loader-container"></div>
```
4. Customize the loader's appearance and behavior (optional):
```css
/* Customize loader appearance using CSS variables */
:root {
  --animation-speed-slow: 3s;
  --animation-speed-normal: 2s; /* Default speed */
  --animation-speed-fast: 1s;
}
```
5. Change the loader type and speed dynamically (optional):
```javascript
// Change the loader type
loader.type = "loader-bar";

// Change the loader speed
loader.speed = "slow";
```
### Options

#### type (string)
The type option specifies the type of loader animation to be displayed. Available types include "loader-round", "loader-bar", "loader-pulse", "loader-wave", and more. The default type is "loader-round".

### speed (string)
The speed option controls the animation speed of the loader. You can set it to "slow", "normal", or "fast". The default speed is "normal".

### Examples
#### Example 1: Basic Usage
```javascript
import Loader from '@grenishrai/loaderjs';

const loader = new Loader();
```

#### Example 2: Customization
```javascript
import Loader from '@grenishrai/loaderjs';

const loader = new Loader({
  type: "loader-bar",
  speed: "slow",
});
```

#### Example 3: Dynamic Changes
```javascript
import Loader from '@grenishrai/loaderjs';

const loader = new Loader();

// Change the loader type after 3 seconds
setTimeout(() => {
  loader.type = "loader-pulse";
}, 3000);

// Change the loader speed after 5 seconds
setTimeout(() => {
  loader.speed = "fast";
}, 5000);
```

## Conclusion
With @grenishrai/loaderjs, creating engaging loading animations for your web projects is quick and effortless. The library provides a range of loader types and allows you to adjust animation speeds dynamically, ensuring a smooth and visually pleasing loading experience for your users.