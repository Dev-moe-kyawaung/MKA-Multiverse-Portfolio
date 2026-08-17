import { ParallaxWorld } from './parallax.js';

export class PortalSystem {
  constructor() {
    this.container = document.getElementById('portal-container');
    this.portals = [];
    this.init();
  }

  init() {
    this.createPortal(100, 100, 'Universe 01');
    this.createPortal(400, 300, 'Universe 02');
    this.createPortal(700, 200, 'Universe 03');
  }

  createPortal(x, y, label) {
    const portal = document.createElement('div');
    portal.className = 'portal';
    portal.style.left = `\${x}px`;
    portal.style.top = `\${y}px`;
    portal.textContent = label;
    
    portal.addEventListener('click', () => this.openPortal(portal, label));
    this.container.appendChild(portal);
    this.portals.push(portal);
  }

  openPortal(portal, universeName) {
    // Dimensional distortion effect
    const distortion = document.createElement('div');
    distortion.className = 'portal-distortion';
    document.body.appendChild(distortion);

    gsap.to(distortion, {
      opacity: 0.6,
      duration: 0.5,
      ease: 'power2.in'
    });

    gsap.to(portal, {
      scale: 3,
      opacity: 0,
      duration: 0.8,
      ease: 'expo.in',
      onComplete: () => {
        window.location.href = `universes/universe-\${universeName.split(' ')[1]}.html`;
      }
    });

    // Trigger AI guide narration
    if (window.aiGuide) {
      window.aiGuide.speak(`Opening portal to \${universeName}... Prepare for dimensional shift.`);
    }
  }
}
