/**
 * AI Multiverse Guide
 * Provides narration and guidance using Web Speech API
 */

class AIGuide {
  constructor() {
    this.element = document.getElementById('ai-guide');
    this.textElement = this.element.querySelector('.guide-text');
    this.audioElement = this.element.querySelector('.guide-audio');
    this.queue = [];
    this.isSpeaking = false;
    this.synth = window.speechSynthesis;
    this.voice = null;
    this.init();
  }

  init() {
    // Load available voices
    if (this.synth) {
      this.synth.onvoiceschanged = () => {
        const voices = this.synth.getVoices();
        // Prefer a futuristic/robotic voice
        this.voice = voices.find(v => 
          v.name.includes('Google') || 
          v.name.includes('Daniel') ||
          v.lang === 'en-US'
        ) || voices[0];
      };
    }

    // Initialize audio context for sound effects
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }

  speak(text, options = {}) {
    const {
      playSound = true,
      priority = false,
      duration = 1000
    } = options;

    const message = { text, playSound, priority, duration };
    
    if (priority) {
      this.queue.unshift(message);
    } else {
      this.queue.push(message);
    }

    if (!this.isSpeaking) {
      this.processQueue();
    }
  }

  async processQueue() {
    while (this.queue.length > 0) {
      this.isSpeaking = true;
      const message = this.queue.shift();
      await this.displayText(message.text);
      await this.speakAudio(message.text);
      await this.wait(message.duration);
    }
    this.isSpeaking = false;
  }

  async displayText(text) {
    this.element.classList.remove('hidden');
    this.textElement.textContent = '';
    
    // Typewriter effect
    for (let i = 0; i < text.length; i++) {
      this.textElement.textContent += text[i];
      if (text[i] !== ' ') {
        this.playKeySound();
      }
      await this.wait(30);
    }
  }

  async speakAudio(text) {
    if (!this.synth) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = this.voice;
    utterance.rate = 0.9;
    utterance.pitch = 0.8;
    utterance.volume = 0.7;

    return new Promise(resolve => {
      utterance.onend = resolve;
      this.synth.speak(utterance);
    });
  }

  playKeySound() {
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.frequency.value = 800 + Math.random() * 200;
    oscillator.type = 'sine';
    gainNode.gain.setValueAtTime(0.05, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.05);

    oscillator.start();
    oscillator.stop(this.audioContext.currentTime + 0.05);
  }

  playPortalSound() {
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    // Sci-fi portal sound
    oscillator.frequency.setValueAtTime(200, this.audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(800, this.audioContext.currentTime + 0.5);
    oscillator.type = 'sawtooth';
    
    gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 1);

    oscillator.start();
    oscillator.stop(this.audioContext.currentTime + 1);
  }

  wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  hide() {
    this.element.classList.add('hidden');
  }

  show() {
    this.element.classList.remove('hidden');
  }
}

// Make globally available
window.AIGuide = AIGuide;
