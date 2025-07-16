# Nike Shop - Premium Athletic Footwear

A modern, responsive Nike shoe shop built with React, Vite, and Tailwind CSS. This project showcases the latest Nike arrivals with a focus on quality, comfort, and innovation.

🌐 **Live Demo**: [https://SDeath-Scythe.github.io/Vite_Repositry/](https://SDeath-Scythe.github.io/Vite_Repositry/)

## 🚀 Features

- **Responsive Design**: Fully responsive layout that works on all devices
- **Modern UI/UX**: Clean and modern design with smooth animations
- **Mobile Navigation**: Functional hamburger menu for mobile devices with hover effects
- **Admin Panel**: Secure admin interface with dual-mode authentication
  - **Demo Mode**: Local storage-based product management (GitHub Pages)
  - **Real Mode**: Backend-integrated admin with database persistence (Local development)
- **Price Validation**: User-friendly price input with auto-formatting
- **Security Features**: Injection-proof input validation and sanitization
- **Interactive Components**: Functional newsletter subscription and product showcase
- **Accessibility**: ARIA labels and proper semantic HTML
- **SEO Optimized**: Meta tags and Open Graph data for better search visibility

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks and Context API
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing with GitHub Pages support
- **ESLint** - Code linting and formatting

### Backend (Local Development)
- **Express.js** - Web application framework
- **Helmet** - Security middleware for HTTP headers
- **Express Rate Limit** - Rate limiting middleware
- **Express Validator** - Input validation and sanitization
- **CORS** - Cross-origin resource sharing
- **bcrypt** - Password hashing utility

## 📦 Installation & Development

1. **Clone the repository:**
```bash
git clone https://github.com/SDeath-Scythe/Vite_Repositry.git
cd Shop_Site
```

2. **Install dependencies:**
```bash
npm install
```

3. **Development modes:**

   **Frontend only (GitHub Pages simulation):**
   ```bash
   npm run dev
   ```

   **Full-stack development (with backend):**
   ```bash
   npm run dev:full
   ```

4. **Build for production:**
```bash
npm run build
```

## 🚀 GitHub Pages Deployment

This project is fully configured for automatic GitHub Pages deployment:

### Automatic Deployment
- Every push to the `main` branch automatically triggers deployment
- GitHub Actions workflow builds and deploys the site
- No manual intervention required

### Manual Deployment
If you prefer manual deployment:
```bash
npm run deploy
```

### Admin Panel on GitHub Pages
- **Mode**: Demo only (changes saved to localStorage)
- **Features**: Full product management with client-side persistence
- **Access**: Protected with authentication

## 🔧 Configuration

### GitHub Pages Setup
1. Go to repository Settings → Pages
2. Select "GitHub Actions" as source
3. The workflow will automatically deploy on push to main

### Local Development with Backend
- Backend runs on `http://localhost:3001`
- Frontend runs on `http://localhost:5173` or available port
- Real admin mode with database persistence

## 🛡️ Security Features

- **Input Sanitization**: All user inputs are sanitized to prevent XSS
- **Rate Limiting**: API endpoints protected against DoS attacks
- **CORS Protection**: Configured for specific allowed origins
- **Helmet Security**: HTTP security headers configured
- **Validation**: Comprehensive input validation on both client and server
- **Injection Prevention**: SQL injection and script injection protection

## 📱 Features Overview

### Public Features
- **Hero Section**: Main showcase with product highlights
- **Popular Products**: Featured product grid with interactive cards
- **Services**: Company service highlights
- **Special Offers**: Promotional content section
- **Customer Reviews**: Social proof section
- **Newsletter**: Subscription functionality
- **Footer**: Complete site navigation and links

### Admin Features (Demo Mode on GitHub Pages)
- **Product Management**: Add, edit, delete products
- **Price Auto-formatting**: User-friendly price input (e.g., "10" → "$10.00")
- **Image Management**: URL-based product images
- **Category Management**: Predefined categories (Running, Basketball, etc.)
- **Brand Management**: Nike, Jordan, Converse support
- **Sale Management**: Sale price and promotion flags
- **Local Persistence**: Changes saved to browser localStorage
- **Reset Functionality**: Restore default product catalog

## 🎨 Design System

- **Colors**: Coral red (#FF6452), Slate gray, Light gray backgrounds
- **Typography**: Palanquin font family for headings, Montserrat for body
- **Responsive**: Mobile-first design with breakpoints
- **Animations**: Smooth hover effects and transitions
- **Icons**: Custom SVG icon set for UI elements

## 🔗 Live Site

Visit the live site: **[Nike Shop](https://SDeath-Scythe.github.io/Vite_Repositry/)**

Try the admin panel:
1. Navigate to `/admin`
2. Use the demo authentication
3. Explore the demo features!
```

## 📄 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run deploy` - Deploy to GitHub Pages

## 🎨 Design Features

- **Hero Section**: Eye-catching hero with product showcase
- **Popular Products**: Grid layout showcasing featured products
- **Super Quality**: Product quality highlights
- **Services**: Company service offerings
- **Special Offers**: Promotional content
- **Customer Reviews**: Social proof and testimonials
- **Newsletter**: Email subscription functionality
- **Footer**: Comprehensive footer with links and social media

## 📱 Responsive Breakpoints

- Mobile: 640px and below
- Tablet: 641px - 1024px
- Desktop: 1025px and above
- Wide: 1440px and above

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🔗 Live Demo

[View Live Demo](https://SDeath-Scythe.github.io/Vite_Repositry/)

---

Built with ❤️ using React + Vite
