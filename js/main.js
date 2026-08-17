import { ParallaxWorld } from './parallax.js';
import { PortalSystem } from './portals.js';
import { AIGuide } from './guide.js';

class MultiverseApp {
  constructor() {
    this.parallax = new ParallaxWorld();
    this.portals = new PortalSystem();
    this.guide = new AIGuide();
    window.aiGuide = this.guide;
    
    this.init();
  }

  init() {
    this.guide.speak('Welcome to the multiverse portfolio. Each portal leads to a different reality of my work. Choose your dimension.');
    
    document.querySelectorAll('.reality-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const universe = e.target.dataset.universe;
        window.location.href = `universes/universe-\${universe}.html`;
      });
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new MultiverseApp();
});
