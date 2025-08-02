# 🚐 Aventura en Camper - Southern France Travel Guide

A comprehensive, responsive website for planning family camping trips through Occitania (southern France). This static website provides detailed itineraries, practical information, and interactive tools for an unforgettable camper adventure.

## 🌟 Features

### 📱 **Fully Responsive Design**
- Mobile-first approach optimized for on-the-go access
- Seamless experience across smartphones, tablets, and desktops
- Touch-friendly navigation and interactions

### 🔍 **Smart Search Functionality**
- Real-time search across all content
- Categorized results (Preparativos, Itinerarios, Alojamientos, etc.)
- Search term highlighting for quick scanning
- Works completely offline

### ✅ **Interactive Checklist**
- 50+ categorized packing items
- Progress tracking with visual indicators
- Local storage persistence (saves your progress)
- Export functionality to text format
- Reset and search capabilities

### 🖼️ **Image Gallery**
- Modal viewer with navigation controls
- Keyboard shortcuts (arrow keys, ESC)
- Touch gestures for mobile devices
- Detailed descriptions for each location

### 🖨️ **Print-Optimized**
- Clean, printer-friendly layouts
- Optimized for offline reference during travel
- Essential information preserved in print format

### ♿ **Accessibility First**
- WCAG 2.1 AA compliant
- Semantic HTML markup
- Keyboard navigation support
- Screen reader optimized

## 📋 Content Overview

### 🏁 **Getting Started (Preparativos)**
- Vehicle documentation requirements
- Crit'Air vignette process and application
- Strategies for traveling in August
- Heat management tips for families

### 🗺️ **Two Flexible Itineraries**

**Route A: Heart of Occitania (7 days)**
- Toulouse: La Halle de La Machine, Canal du Midi
- Albi: UNESCO Cathedral, Cordes-sur-Ciel
- Gorges du Tarn: Natural canyons, outdoor activities
- Carcassonne: Medieval citadel exploration

**Route B: Pyrenees to Mediterranean (7 days)**
- Ariège: Prehistoric parks, wolf sanctuaries
- Narbonne: Roman heritage, Mediterranean coast
- Montpellier: Free zoo, aquarium, planetarium
- Flexible coastal exploration

### 🏕️ **Accommodations Guide**
- Strategic camping recommendations
- Aires de service (service areas) explanation
- Booking strategies for August travel
- Detailed facility information

### 📦 **Equipment Checklist**
- Documentation and administration
- Health and first aid supplies
- Clothing and footwear for all weather
- Children's entertainment (age 4+)
- Kitchen and dining essentials
- Bedroom and bathroom necessities
- Essential camper equipment

### 📞 **Resources**
- Emergency contacts (French and Spanish)
- Recommended mobile apps
- Useful French phrases
- Official websites and links

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ (for local development)
- Git
- Modern web browser

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd camper-trip
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start local server**
   ```bash
   npm run serve
   ```
   Website will be available at `http://localhost:3000`

4. **Build for production**
   ```bash
   npm run build
   ```

## 📁 Project Structure

```
src/
├── index.html              # Landing page
├── css/
│   ├── styles.css          # Global styles and navigation
│   └── pages.css           # Page-specific styles and components
├── js/
│   ├── main.js             # Core functionality (search, gallery, navigation)
│   └── checklist.js        # Checklist-specific features
├── pages/
│   ├── getting-started.html # Preparation and documentation
│   ├── itineraries.html    # Two detailed travel routes
│   ├── accommodations.html # Campings and service areas
│   ├── checklist.html      # Interactive packing checklist
│   └── resources.html      # Emergency contacts and references
└── images/                 # Image assets (placeholder)
```

## 🔧 Technology Stack

- **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES6+)
- **Styling**: CSS Grid, Flexbox, Custom Properties
- **Build**: Node.js scripts
- **Deployment**: GitLab Pages with GitLab CI/CD
- **Search**: Client-side implementation with fuzzy matching
- **Storage**: localStorage for checklist persistence

## 🚀 Deployment

### GitLab Pages Deployment

The website automatically deploys to GitLab Pages when changes are pushed to the `main` branch.

**Deployment Process:**
1. Push changes to `main` branch
2. GitLab CI/CD pipeline runs automatically
3. Static files are built and deployed to `public/` directory
4. Website becomes available at your GitLab Pages URL

### Manual Deployment

```bash
# Create production build
npm run build

# Files are ready in public/ directory
# Upload to any static hosting service
```

### Custom Domain Setup

1. Configure DNS settings with your domain provider
2. Add domain in GitLab Pages settings
3. Update `.gitlab-ci.yml` if needed for domain-specific configuration

## 🔄 CI/CD Pipeline

The project includes a GitLab CI/CD configuration (`.gitlab-ci.yml`) with:

- **Automated Deployment**: Triggers on `main` branch pushes
- **Testing Stage**: Runs validation (expandable for future tests)
- **Caching**: Optimizes build times with `node_modules` caching
- **Artifacts**: Preserves build output for deployment

## 🛠️ Development Workflow

### Adding New Content

1. **Update HTML pages** in `src/pages/`
2. **Add search terms** to `searchData` array in `src/js/main.js`
3. **Update navigation** in all HTML files if adding new pages
4. **Test locally** with `npm run serve`
5. **Commit and push** to deploy

### Modifying Styles

- **Global styles**: Edit `src/css/styles.css`
- **Page-specific styles**: Edit `src/css/pages.css`
- **Print styles**: Located at bottom of each CSS file

### Adding Images

1. Place images in `src/images/` directory
2. Update image references in HTML
3. Add to gallery markup if applicable
4. Optimize images for web (recommended: WebP format)

## 📊 Performance Optimization

- **Lightweight**: No external frameworks or libraries
- **Optimized CSS**: Minimal, purpose-built stylesheets
- **Efficient JavaScript**: Vanilla JS with modern features
- **Image Optimization**: Lazy loading implementation ready
- **Caching**: Static assets cached by GitLab Pages

## 🧪 Testing

```bash
# Run local server for manual testing
npm run serve

# Validate HTML (add validation tools as needed)
npm test
```

**Testing Checklist:**
- [ ] All navigation links work correctly
- [ ] Search functionality returns relevant results
- [ ] Checklist saves and loads state properly
- [ ] Image gallery modal functions correctly
- [ ] Print styles display properly
- [ ] Mobile responsiveness across devices
- [ ] Accessibility with screen readers

## 🤝 Contributing

### Content Updates

1. **Fork the repository**
2. **Create feature branch**: `git checkout -b update/new-content`
3. **Make changes** following existing content structure
4. **Test locally** with `npm run serve`
5. **Submit merge request** with description of changes

### Code Contributions

1. **Follow existing code style** and structure
2. **Update search data** when adding new content
3. **Test across different browsers** and devices
4. **Document any new features** in this README

## 📝 Content Management

### Updating Itineraries

- Edit `src/pages/itineraries.html`
- Update activity cards, logistics sections, and image galleries
- Add new search terms to `main.js` searchData array

### Modifying Checklists

- Edit `src/pages/checklist.html`
- Update checklist items in their respective categories
- Test localStorage functionality after changes

### Adding New Accommodations

- Update `src/pages/accommodations.html`
- Follow existing card structure for consistency
- Include essential information: location, services, booking details

## 🌍 Browser Support

- **Chrome/Chromium**: Full support
- **Firefox**: Full support
- **Safari**: Full support (iOS 12+)
- **Edge**: Full support
- **Mobile browsers**: Optimized experience

## 📱 Mobile Optimization

- **Touch Navigation**: Optimized for finger navigation
- **Readable Text**: Minimum 16px font size
- **Fast Loading**: Optimized for 3G connections
- **Offline Capable**: Core functionality works without internet

## 🔗 Related Resources

- [GitLab Pages Documentation](https://docs.gitlab.com/ee/user/project/pages/)
- [CSS Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [Web Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Mobile Web Performance](https://web.dev/mobile/)

## 📄 License

MIT License - Feel free to use this template for your own travel guides!

## 🆘 Support

For technical issues or content questions:
1. Check existing GitLab issues
2. Create new issue with detailed description
3. Include browser information and steps to reproduce

---

**Happy Camping! 🏕️** Enjoy your adventure through the beautiful Occitania region!
