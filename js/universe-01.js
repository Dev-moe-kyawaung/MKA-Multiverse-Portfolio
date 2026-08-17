/**
 * Universe 01 - Android Development Realm
 * Handles project interactions, animations, and AI guide narration
 */

class Universe01 {
  constructor() {
    this.guide = null;
    this.projects = [];
    this.currentProject = null;
    this.init();
  }

  async init() {
    // Initialize AI guide
    this.guide = new AIGuide();
    window.aiGuide = this.guide;

    // Welcome message
    await this.wait(500);
    this.guide.speak(
      "Welcome to the Android Development Realm. " +
      "Here, mobile applications transcend dimensional boundaries. " +
      "Each project exists in its own pocket universe.",
      { duration: 2000 }
    );

    // Initialize project cards
    this.initProjects();

    // Initialize GSAP animations
    this.initAnimations();

    // Set up ambient sound
    this.initAmbientSound();
  }

  initProjects() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach((card, index) => {
      const projectName = card.querySelector('h2').textContent;
      
      card.addEventListener('mouseenter', () => {
        this.guide.speak(`Project detected: \${projectName}. Approach to enter.`, {
          playSound: false,
          duration: 500
        });
      });

      card.addEventListener('click', () => {
        this.enterProject(card, index);
      });

      this.projects.push({
        element: card,
        name: projectName,
        index: index
      });
    });
  }

  enterProject(card, index) {
    const projectName = card.querySelector('h2').textContent;
    
    // Dimensional transition effect
    this.guide.speak(`Initiating dimensional transfer to \${projectName}...`, {
      priority: true,
      duration: 1500
    });

    this.guide.playPortalSound();

    // GSAP animations
    gsap.to(card, {
      scale: 1.1,
      duration: 0.3,
      ease: 'power2.out'
    });

    gsap.to(card, {
      scale: 0,
      opacity: 0,
      duration: 0.5,
      delay: 0.3,
      ease: 'expo.in',
      onComplete: () => {
        // Navigate to project detail page
        window.location.href = `project-\${index + 1}.html`;
      }
    });

    // Distortion effect
    const distortion = document.createElement('div');
    distortion.className = 'dimensional-distortion';
    document.body.appendChild(distortion);

    gsap.to(distortion, {
      opacity: 0.8,
      duration: 0.5,
      ease: 'power2.in'
    });

    gsap.to(distortion, {
      opacity: 0,
      duration: 0.8,
      delay: 0.5,
      ease: 'expo.out',
      onComplete: () => distortion.remove()
    });
  }

  initAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // Animate project cards on scroll
    gsap.from('.project-card', {
      scrollTrigger: {
        trigger: '.project-showcase',
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none none'
      },
      y: 100,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out'
    });

    // Animate header
    gsap.from('.universe-header', {
      y: -50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    });
  }

  initAmbientSound() {
    const ambientSound = document.getElementById('ambient-sound');
    if (ambientSound) {
      ambientSound.volume = 0.3;
      
      // Play on user interaction
      document.addEventListener('click', () => {
        ambientSound.play().catch(err => {
          console.log('Audio autoplay prevented:', err);
        });
      }, { once: true });
    }
  }

  wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new Universe01();
});
