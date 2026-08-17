/**
 * Project Visual - Three.js animation for project detail hero section
 */

class ProjectVisual {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.geometry = null;
    this.material = null;
    this.mesh = null;
    
    this.init();
  }

  init() {
    // Scene
    this.scene = new THREE.Scene();

    // Camera
    this.camera = new THREE.PerspectiveCamera(
      75,
      this.canvas.clientWidth / this.canvas.clientHeight,
      0.1,
      100
    );
    this.camera.position.z = 5;

    // Renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true
    });
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create 3D object (icosahedron for tech feel)
    this.geometry = new THREE.IcosahedronGeometry(2, 1);
    
    // Wireframe material
    this.material = new THREE.MeshBasicMaterial({
      color: 0xff6b6b,
      wireframe: true,
      transparent: true,
      opacity: 0.8
    });

    // Inner glow sphere
    const innerGeometry = new THREE.IcosahedronGeometry(1.5, 2);
    const innerMaterial = new THREE.MeshBasicMaterial({
      color: 0x4ecdc4,
      wireframe: true,
      transparent: true,
      opacity: 0.5
    });

    // Create particles
    this.createParticles();

    // Meshes
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    const innerMesh = new THREE.Mesh(innerGeometry, innerMaterial);
    
    this.scene.add(this.mesh);
    this.scene.add(innerMesh);

    // Lights
    const ambientLight = new THREE.AmbientLight(0x404040);
    this.scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1, 100);
    pointLight.position.set(5, 5, 5);
    this.scene.add(pointLight);

    // Event listeners
    window.addEventListener('resize', this.onResize.bind(this));

    // Animation loop
    this.animate();
  }

  createParticles() {
    const particleCount = 500;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 10;
      positions[i + 1] = (Math.random() - 0.5) * 10;
      positions[i + 2] = (Math.random() - 0.5) * 10;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0xff6b6b,
      size: 0.05,
      transparent: true,
      opacity: 0.6
    });

    const particles = new THREE.Points(geometry, material);
    this.scene.add(particles);
  }

  onResize() {
    this.camera.aspect = this.canvas.clientWidth / this.canvas.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));

    const time = Date.now() * 0.001;

    // Rotate main mesh
    this.mesh.rotation.x = time * 0.2;
    this.mesh.rotation.y = time * 0.3;

    // Pulse effect
    const scale = 1 + Math.sin(time) * 0.05;
    this.mesh.scale.set(scale, scale, scale);

    this.renderer.render(this.scene, this.camera);
  }
}

// Make globally available
window.ProjectVisual = ProjectVisual;
