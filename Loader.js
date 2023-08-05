const default_options = {
  type: "loader-round",
  speed: "normal",
};

export default class Loader {
  #loader;

  constructor(options) {
    this.#loader = document.createElement("div");
    this.#loader.classList.add("loader");
    this.type = options?.type || default_options.type;
    this.speed = options?.speed || default_options.speed;
    document.body.appendChild(this.#loader);
  }

  set type(value) {
    const selector = `.loader[data-type="${value}"]`;
    const isInDOM = this.#loader.parentElement !== null;
    if (isInDOM) {
      const currentType = this.#loader.dataset.type;
      if (currentType) {
        this.#loader.classList.remove(currentType);
      }
    }
    this.#loader.classList.add(value);
    this.#loader.dataset.type = value;
    if (isInDOM) {
      const existingLoader = document.querySelector(selector);
      if (existingLoader) {
        existingLoader.className = this.#loader.className;
        existingLoader.dataset.type = value;
      }
    }
  }

  set speed(value) {
    const validSpeeds = ["slow", "normal", "fast"];
    if (validSpeeds.includes(value)) {
      this.#loader.style.animationDuration = `var(--animation-speed-${value})`;
    }
  }
}
