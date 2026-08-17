/**
 * Project Detail Page Logic
 * Handles entry animations, content reveal, and AI guide narration
 */

class ProjectDetail {
  constructor() {
    this.guide = null;
    this.projectName = this.getProjectName();
    this.init();
  }

  getProjectName() {
    const path = window.location.pathname;
    const match = path.match(/project-(\d+)\.html/);
    return match ? `Project \${match[1]}` : 'Unknown Project';
  }

  async init() {
    // Initialize AI guide
    this.guide = new AIGuide();
    window.aiGuide = this.guide;

    // Play entry portal animation
    await this.playEntryAnimation();

    // Reveal main content
    await this.revealContent();

    // Initialize project visual
    this.initProjectVisual();

    // Initialize GSAP animations
    this.initAnimations();

    // Set up ambient sound
    this.initAmbientSound();

    // Start AI guide narration
    this.startGuideNarration();
  }

  async playEntryAnimation() {
    const portal = document.getElementById('entry-portal');
    this.guide.playPortalSound();

    await this.guide.wait(1500);

    gsap.to(portal, {
      opacity: 0,
      duration: 0.5,
      ease: 'expo.out'
    });

    await this.guide.wait(500);
    portal.style.display = 'none';
  }

  async revealContent() {
    const main = document.querySelector('.project-main');
    main.classList.remove('hidden');

    gsap.fromTo(main, 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    );
  }

  initProjectVisual() {
    // Initialize Three.js visual for hero section
    new ProjectVisual('project-canvas');
  }

  initAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // Animate sections on scroll
    gsap.utils.toArray('.project-overview, .project-features, .tech-universe, .project-gallery, .project-challenges').forEach(section => {
      gsap.from(section, {
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      });
    });

    // Animate feature cards with stagger
    gsap.from('.feature-card', {
      scrollTrigger: {
        trigger: '.features-grid',
        start: 'top 80%'
      },
      y: 50,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out'
    });

    // Animate tech items
    gsap.from('.tech-item', {
      scrollTrigger: {
        trigger: '.tech-showcase',
        start: 'top 80%'
      },
      scale: 0.8,
      opacity: 0,
      duration: 0.5,
      stagger: 0.08,
      ease: 'back.out(1.7)'
    });

    // Animate gallery items
    gsap.from('.gallery-item', {
      scrollTrigger: {
        trigger: '.gallery-grid',
        start: 'top 80%'
      },
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out'
    });
  }

  async startGuideNarration() {
    await this.guide.wait(1000);
    
    this.guide.speak(
      `You've entered the \${this.projectName} reality. ` +
      `This dimension showcases advanced Android development techniques. ` +
      `Scroll to explore the features and technologies.`,
      { duration: 2500 }
    );

    // Narrate stats when visible
    ScrollTrigger.create({
      trigger: '.stats-grid',
      start: 'top 70%',
      onEnter: () => {
        this.guide.speak(
          'Key performance metrics detected. ' +
          'This project demonstrates production-ready scalability.',
          { duration: 2000 }
        );
      }
    });

    // Narrate challenges when visible
    ScrollTrigger.create({
      trigger: '.project-challenges',
      start: 'top 70%',
      onEnter: () => {
        this.guide.speak(
          'Dimensional anomalies encountered during development. ' +
          'Each challenge required innovative problem-solving.',
          { duration: 2000 }
        );
      }
    });
  }

  initAmbientSound() {
    const ambientSound = document.getElementById('ambient-sound');
    if (ambientSound) {
      ambientSound.volume = 0.2;
      
      document.addEventListener('click', () => {
        ambientSound.play().catch(err => console.log('Audio autoplay prevented:', err));
      }, { once: true });
    }
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ProjectDetail();
});
