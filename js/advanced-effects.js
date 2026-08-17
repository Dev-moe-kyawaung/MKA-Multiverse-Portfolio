/**
 * Advanced Animation Effects
 * Dimensional distortion, reality shifts, and quantum effects
 */

class AdvancedEffects {
  constructor() {
    this.cursor = null;
    this.init();
  }

  init() {
    this.createQuantumCursor();
    this.createRealityDistortion();
    this.createDimensionalRifts();
  }

  // Quantum Cursor Effect
  createQuantumCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'quantum-cursor';
    document.body.appendChild(cursor);

    const cursorTrail = document.createElement('div');
    cursorTrail.className = 'quantum-trail';
    document.body.appendChild(cursorTrail);

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    const animate = () => {
      cursorX += (mouseX - cursorX) * 0.1;
      cursorY += (mouseY - cursorY) * 0.1;

      cursor.style.left = `\${cursorX}px`;
      cursor.style.top = `\${cursorY}px`;

      cursorTrail.style.left = `\${mouseX}px`;
      cursorTrail.style.top = `\${mouseY}px`;

      requestAnimationFrame(animate);
    };

    animate();
  }

  // Reality Distortion Effect
  createRealityDistortion() {
    const distortion = document.createElement('div');
    distortion.className = 'reality-distortion';
    document.body.appendChild(distortion);

    // Trigger on scroll
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const scroll = window.pageYOffset;
      const delta = Math.abs(scroll - lastScroll);

      if (delta > 50) {
        this.triggerDistortion(distortion);
        lastScroll = scroll;
      }
    });
  }

  triggerDistortion(element) {
    gsap.to(element, {
      opacity: 0.3,
      duration: 0.2,
      ease: 'power2.out',
      onComplete: () => {
        gsap.to(element, {
          opacity: 0,
          duration: 0.5,
          ease: 'power2.in'
        });
      }
    });
  }

  // Dimensional Rifts
  createDimensionalRifts() {
    const riftCount = 5;
    
    for (let i = 0; i < riftCount; i++) {
      const rift = document.createElement('div');
      rift.className = 'dimensional-rift';
      rift.style.left = `\${Math.random() * 100}vw`;
      rift.style.top = `\${Math.random() * 100}vh`;
      document.body.appendChild(rift);

      // Animate rift
      gsap.to(rift, {
        scale: 1.2,
        opacity: 0.8,
        duration: 2 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }
  }
}

// Add CSS for advanced effects
const advancedEffectsCSS = `
  /* Quantum Cursor */
  .quantum-cursor {
    position: fixed;
    width: 20px;
    height: 20px;
    border: 2px solid #00f0ff;
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%);
    mix-blend-mode: difference;
  }

  .quantum-trail {
    position: fixed;
    width: 10px;
    height: 10px;
    background: #ff00e6;
    border-radius: 50%;
    pointer-events: none;
    z-index: 9998;
    transform: translate(-50%, -50%);
    opacity: 0.5;
    filter: blur(4px);
  }

  /* Reality Distortion */
  .reality-distortion {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: 
      repeating-linear-gradient(
        45deg,
        transparent,
        transparent 10px,
        rgba(255, 107, 107, 0.05) 10px,
        rgba(255, 107, 107, 0.05) 20px
      );
    pointer-events: none;
    z-index: 9997;
    opacity: 0;
    mix-blend-mode: overlay;
  }

  /* Dimensional Rifts */
  .dimensional-rift {
    position: fixed;
    width: 200px;
    height: 200px;
    background: radial-gradient(circle, rgba(78, 205, 196, 0.1) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
    z-index: 1;
    opacity: 0.3;
  }
`;

// Inject CSS
const style = document.createElement('style');
style.textContent = advancedEffectsCSS;
document.head.appendChild(style);

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  new AdvancedEffects();
});
