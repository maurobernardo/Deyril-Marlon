# Deyril Marlon Ibraimo - Portfolio

A modern, responsive portfolio website built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- 🌐 **Multi-language Support**: English and Portuguese
- 🌓 **Dark/Light Mode**: Toggle between themes
- 📱 **Fully Responsive**: Works on all devices
- 🎨 **Modern Design**: Clean and professional UI
- 🖼️ **Image Sliders**: Auto-rotating project images
- 📄 **Project Details**: Detailed project pages with images and videos

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   ├── globals.css         # Global styles
│   └── projects/
│       └── [id]/
│           └── page.tsx    # Project detail pages
├── components/
│   ├── Navbar.tsx          # Navigation bar
│   ├── Home.tsx            # Home section
│   ├── About.tsx           # About section
│   ├── Projects.tsx        # Projects section
│   ├── ProjectCard.tsx     # Project card component
│   ├── Skills.tsx          # Skills section
│   ├── Courses.tsx         # Courses section
│   ├── Publications.tsx    # Publications section
│   ├── Training.tsx        # Training section
│   ├── ThemeProvider.tsx   # Theme context
│   └── LanguageProvider.tsx # Language context
└── public/
    └── locales/
        ├── en/
        │   └── common.json # English translations
        └── pt/
            └── common.json # Portuguese translations
```

## Customization

### Adding Projects

Edit `components/Projects.tsx` to add new projects to the projects array.

### Adding Images

Place project images in `public/projects/[project-id]/` directory.

### Modifying Colors

Edit `tailwind.config.js` to customize the color palette.

## Build for Production

```bash
npm run build
npm start
```

## Technologies Used

- Next.js 14
- TypeScript
- Tailwind CSS
- Framer Motion (for animations)
- React Context API (for theme and language)

## License

This project is private and proprietary.