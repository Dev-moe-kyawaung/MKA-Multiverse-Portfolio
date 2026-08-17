/**
 * Three.js Portal System
 * Creates 3D dimensional rifts and portal effects
 */

class ThreePortal {
  constructor() {
    this.canvas = document.getElementById('three-canvas');
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.portals = [];
    this.particles = [];
    this.init();
  }

  init() {
    // Scene setup
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x1a1a2e, 0.002);

    // Camera setup
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.z = 5;

    // Renderer setup
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create portals
    this.createPortal(0, 0, 0);
    this.createPortal(-3, 1, -2);
    this.createPortal(3, -1, -3);

    // Create particle system
    this.createParticles();

    // Lighting
    this.addLights();

    // Event listeners
    window.addEventListener('resize', this.onResize.bind(this));
    document.addEventListener('mousemove', this.onMouseMove.bind(this));

    // Start animation loop
    this.animate();
  }

  createPortal(x, y, z) {
    // Portal geometry - torus shape
    const geometry = new THREE.TorusGeometry(1, 0.1, 16, 100);
    
    // Portal material with glow
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color(0xff6b6b) },
        secondaryColor: { value: new THREE.Color(0x4ecdc4) }
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vPosition;
        
        void main() {
          vUv = uv;
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 color;
        uniform vec3 secondaryColor;
        varying vec2 vUv;
        varying vec3 vPosition;
        
        void main() {
          float glow = 1.0 - smoothstep(0.0, 1.0, vUv.x);
          float pulse = sin(time * 2.0 + vUv.x * 10.0) * 0.5 + 0.5;
          vec3 finalColor = mix(color, secondaryColor, pulse);
          gl_FragColor = vec4(finalColor, glow * 0.8);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending
    });

    const portal = new THREE.Mesh(geometry, material);
    portal.position.set(x, y, z);
    portal.rotation.y = Math.random() * Math.PI * 2;
    
    this.scene.add(portal);
    this.portals.push({
      mesh: portal,
      material: material,
      rotationSpeed: (Math.random() - 0.5) * 0.02
    });
  }

  createParticles() {
    const particleCount = 2000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    const color1 = new THREE.Color(0xff6b6b);
    const color2 = new THREE.Color(0x4ecdc4);

    for (let i = 0; i < particleCount * 3; i += 3) {
      // Position
      positions[i] = (Math.random() - 0.5) * 20;
      positions[i + 1] = (Math.random() - 0.5) * 20;
      positions[i + 2] = (Math.random() - 0.5) * 20 - 5;

      // Color
      const mixedColor = color1.clone().lerp(color2, Math.random());
      colors[i] = mixedColor.r;
      colors[i + 1] = mixedColor.g;
      colors[i + 2] = mixedColor.b;

      // Size
      sizes[i / 3] = Math.random() * 0.1;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(geometry, material);
    this.scene.add(particles);
    this.particles.push(particles);
  }

  addLights() {
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    this.scene.add(ambientLight);

    // Point lights for portal glow
    const pointLight1 = new THREE.PointLight(0xff6b6b, 1, 10);
    pointLight1.position.set(0, 0, 0);
    this.scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x4ecdc4, 1, 10);
    pointLight2.position.set(-3, 1, -2);
    this.scene.add(pointLight2);
  }

  onResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  onMouseMove(event) {
    const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

    // Smooth camera movement
    this.camera.position.x += (mouseX * 0.5 - this.camera.position.x) * 0.05;
    this.camera.position.y += (mouseY * 0.5 - this.camera.position.y) * 0.05;
    this.camera.lookAt(this.scene.position);
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));

    const time = Date.now() * 0.001;

    // Animate portals
    this.portals.forEach((portal, index) => {
      portal.mesh.rotation.z += portal.rotationSpeed;
      portal.mesh.rotation.x = Math.sin(time * 0.5 + index) * 0.2;
      portal.material.uniforms.time.value = time;
    });

    // Animate particles
    this.particles.forEach(particles => {
      particles.rotation.y = time * 0.05;
      particles.rotation.x = time * 0.02;
    });

    this.renderer.render(this.scene, this.camera);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ThreePortal();
});
