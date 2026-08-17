import { mapRange, lerp } from './utils.js';

export class ParallaxWorld {
  constructor() {
    this.layers = document.querySelectorAll('.layer');
    this.mouse = { x: 0, y: 0 };
    this.target = { x: 0, y: 0 };
    this.init();
  }

  init() {
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
    });

    this.animate();
  }

  animate() {
    this.target.x = lerp(this.target.x, this.mouse.x, 0.05);
    this.target.y = lerp(this.target.y, this.mouse.y, 0.05);

    this.layers.forEach(layer => {
      const depth = parseFloat(layer.dataset.depth);
      const x = this.target.x * depth * 50;
      const y = this.target.y * depth * 50;
      layer.style.transform = `translate3d(\${x}px, \${y}px, 0)`;
    });

    requestAnimationFrame(() => this.animate());
  }
}
