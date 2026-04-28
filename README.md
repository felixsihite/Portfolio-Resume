# Portfolio-Resume
Personal portfolio website showcasing projects in Data Analytics &amp; Business Intelligence, Machine Learning &amp; AI, Data Science, Data Engineering, and UI/UX Design.

## 🚀 Features

- **Modern Dark Theme** - Professional dark design with blue gradient accents
- **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile devices
- **Smooth Animations** - AOS (Animate On Scroll) library integration
- **Interactive Elements** - Typing effect, skill bars, counters, and more
- **Portfolio Filter** - Filter projects by category
- **Contact Form** - PHP-powered contact form with email functionality
- **SEO Optimized** - Proper meta tags and semantic HTML structure

## 📁 Project Structure

```
portfolio/
├── index.html              # Main HTML file
├── README.md               # Project documentation
├── assets/
│   ├── css/
│   │   └── style.css       # Main stylesheet
│   ├── js/
│   │   └── main.js         # Main JavaScript file
│   ├── img/
│   │   ├── expertise       # Expertise images
|   |   ├── services        # Services image
|   |   ├── testimonials    # Testimonials image
│   │   ├── profile.jpg     # Profile image
│   │   └── portfolio/      # Portfolio images
│   └── files/
│       └── resume.pdf      # Downloadable resume
└── forms/
    └── contact.php         # Contact form handler
```

## 🛠️ Technologies Used

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Custom properties, Flexbox, Grid, Animations
- **JavaScript (ES6+)** - Vanilla JS with modern features
- **Google Fonts** - Inter & JetBrains Mono
- **Boxicons** - Icon library
- **AOS** - Animate On Scroll library

### Backend
- **PHP** - Contact form processing and email handling

## 🎨 Color Palette

| Color | Hex Code | Usage |
|-------|----------|-------|
| Primary 500 | `#2aa4ff` | Primary accent color |
| Primary 600 | `#0d85f8` | Buttons, links |
| Dark 900 | `#0a0f1a` | Background |
| Dark 800 | `#0f1629` | Cards, sections |
| Gray 200 | `#e2e8f0` | Text |
| Gray 400 | `#94a3b8` | Secondary text |

## 📦 Installation

1. **Clone or download** this repository:
   ```bash
   git clone https://github.com/felixsihite/Portfolio-Resume.git
   ```

2. **Navigate** to the project directory:
   ```bash
   cd portfolio
   ```

3. **For local development**, you can use:
   - Live Server extension in VS Code
   - Python's simple HTTP server:
     ```bash
     python -m http.server 8000
     ```
   - PHP's built-in server:
     ```bash
     php -S localhost:8000
     ```

4. **Open** `http://localhost:8000` in your browser

## ⚙️ Configuration

### Contact Form Setup

1. Open `forms/contact.php`
2. Update the recipient email:
   ```php
   define('RECIPIENT_EMAIL', 'your-email@example.com');
   define('RECIPIENT_NAME', 'Your Name');
   ```

### Customization

1. **Personal Information**
   - Update `index.html` with your personal details
   - Replace profile image in `assets/img/`
   - Update social media links

2. **Colors**
   - Modify CSS variables in `assets/css/style.css`:
     ```css
     :root {
         --primary-500: #2aa4ff;
     }
     ```

3. **Skills**
   - Update skill percentages in `index.html`
   - Skill bars animate based on `data-width` attribute

4. **Portfolio Items**
   - Add/remove portfolio cards in the portfolio section
   - Use `data-category` attribute for filtering

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

## 🔧 Development

### Prerequisites
- Modern web browser
- Text editor (VS Code recommended)
- PHP 7.4+ (for contact form)
- Local server environment

### Scripts

The JavaScript file (`assets/js/main.js`) includes:
- Preloader
- Typing effect
- Particle animation
- Mobile menu
- Smooth scrolling
- Skill bar animations
- Stats counter
- Portfolio filtering
- Back to top button
- Contact form handling

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Felix Alveus Seventeen Sihite**

- Email: lixsihite@gmail.com
- Phone: +62 821-4604-5379
- Location: Madiun, East Java, Indonesia
- University: Satya Wacana Christian University (SWCU)

## 🙏 Acknowledgments

- [Boxicons](https://boxicons.com/) - Beautiful icons
- [AOS](https://michalsnik.github.io/aos/) - Animate On Scroll library
- [Google Fonts](https://fonts.google.com/) - Typography

---

Made with ❤️ by Felix Sihite

*Data & AI Specialist*
