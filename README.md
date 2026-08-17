
# 🌌 Multiverse Portfolio

A next-generation portfolio where each project exists in a different universe. Navigate through dimensional portals, experience reality-bending animations, and let an AI guide show you alternate versions of development skills.

## ✨ Features

- **Portal Navigation**: Jump between realities through animated dimensional portals
- **Layered Parallax Worlds**: Multi-depth background layers create immersive depth
- **Dimensional Distortion Effects**: Reality-bending visual effects using CSS and WebGL
- **AI Multiverse Guide**: Voice-enabled assistant narrating your journey
- **3D Portal System**: Three.js-powered dimensional rifts
- **Project Detail Pages**: Deep dive into each project with stats, features, and challenges
- **Responsive Design**: Works across all devices and screen sizes
- **GitHub Pages Deployment**: Automated CI/CD pipeline

## 🚀 Quick Start

### Local Development

```bash
# Clone the repository
git clone https://github.com/yourusername/multiverse-portfolio.git

# Navigate to project
cd multiverse-portfolio

# Open in browser
# Use Live Server extension or:
npx http-server -p 8080
```


### Deployment

The portfolio automatically deploys to GitHub Pages on every push to `main` branch.

## 📁 Project Structure

```
multiverse-portfolio/
├── index.html                 # Main portal hub
├── universes/
│   ├── universe-01.html       # Android Development Realm
│   ├── universe-02.html       # Frontend Web Dimension
│   └── ... (30 universes)
├── project-1.html             # Project detail page template
├── css/
│   ├── global.css             # Core styles
│   ├── universe.css           # Universe-specific styles
│   ├── project-detail.css     # Project page styles
│   └── guide.css              # AI guide interface
├── js/
│   ├── main.js                # App initialization
│   ├── three-portal.js        # 3D portal system
│   ├── guide.js               # AI guide with voice
│   ├── project-detail.js      # Project page logic
│   └── advanced-effects.js    # Advanced animations
├── assets/
│   ├── textures/              # Background images
│   ├── sounds/                # Audio effects
│   └── screenshots/           # Project screenshots
└── .github/workflows/
    └── deploy.yml             # GitHub Actions deployment
```


## 🎨 Customization

### Creating New Universes

1. Duplicate `universes/universe-01.html`
2. Update CSS variables for unique theming
3. Customize content and AI guide dialogue
4. Add unique sound effects

### Adding Projects

1. Create project detail page (`project-X.html`)
2. Update screenshots in `assets/screenshots/`
3. Modify stats, features, and challenges
4. Link from universe page

### AI Guide Customization

Edit dialogue in universe and project JavaScript files:

```javascript
this.guide.speak('Your custom narration here...');
```


## 🛠️ Technologies

- **HTML5/CSS3** - Semantic structure and modern styling
- **JavaScript (ES6+)** - Interactive logic
- **Three.js** - 3D portal effects
- **GSAP** - Professional animations
- **Web Speech API** - AI voice synthesis
- **Web Audio API** - Sound effects
- **GitHub Actions** - Automated deployment


## 📱 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge


## 🎯 Performance

- Optimized for 60fps animations
- Lazy loading for assets
- Responsive images
- Minimal dependencies


## 📄 License

MIT License - Feel free to use for your own portfolio!

## 🙏 Credits

Created by **Moe Kyaw** - Senior Android Developer

---

*Jump between realities. Explore the multiverse.*
