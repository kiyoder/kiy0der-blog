# MCQ Anki Blog

A modern, static blog built with React, Vite, Tailwind CSS, and deployed on GitHub Pages.

## ✨ Features

- 🚀 **Fast & Modern**: Built with React + Vite for lightning-fast development and production builds
- 🎨 **Beautiful UI**: Styled with Tailwind CSS and ShadCN/UI components
- 🌓 **Dark/Light Mode**: Theme toggle with persistent preference storage
- ✍️ **Markdown Posts**: Write blog posts in Markdown with frontmatter metadata
- 🎭 **Smooth Animations**: Framer Motion for delightful page transitions
- 📱 **Fully Responsive**: Mobile-first design that works on all devices
- 🔍 **Interactive TOC**: Landing page displays all posts as an interactive table of contents
- 📦 **Static Site**: Fully static, no backend required, perfect for GitHub Pages

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/kiyoder/mcq-anki.git
cd mcq-anki

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📝 Adding New Blog Posts

1. Create a new `.md` file in the `src/posts/` directory
2. Add frontmatter metadata at the top of the file:

```markdown
---
title: "Your Post Title"
date: "2025-01-15"
description: "A brief description of your post"
tags: ["tag1", "tag2", "tag3"]
---

Your markdown content here...
```

3. The blog will automatically pick up your new post!

### Frontmatter Fields

- `title` (required): The title of your blog post
- `date` (required): Publication date in YYYY-MM-DD format
- `description` (required): A brief description shown on the home page
- `tags` (optional): Array of tags for categorization

## 🎨 Customization

### Styling

The blog uses Tailwind CSS. You can customize the theme by editing:
- `src/index.css` - Global styles and Tailwind imports
- Tailwind classes in components

### Colors & Theme

The dark/light theme is managed through CSS custom properties and Tailwind's dark mode classes. The theme preference is stored in localStorage and persists across sessions.

### Site Information

Update these files to customize your blog:
- `src/components/Layout.tsx` - Site header, navigation, and footer
- `src/pages/Home.tsx` - Home page content and layout
- `vite.config.ts` - Update the `base` path if not using `/mcq-anki/`

## 🚀 Deployment to GitHub Pages

This blog is configured to automatically deploy to GitHub Pages using GitHub Actions.

### Setup

1. Go to your repository settings
2. Navigate to Pages → Source
3. Select "GitHub Actions" as the source
4. Push to the `main` branch to trigger deployment

The workflow file is located at `.github/workflows/deploy.yml`.

### Custom Domain

To use a custom domain:
1. Add a `CNAME` file to the `public/` directory with your domain
2. Configure DNS settings with your domain provider

## 📂 Project Structure

```
mcq-anki/
├── src/
│   ├── components/      # Reusable React components
│   │   ├── ui/         # ShadCN/UI components
│   │   ├── Layout.tsx  # Main layout with header/footer
│   │   ├── ThemeProvider.tsx
│   │   └── ThemeToggle.tsx
│   ├── pages/          # Page components
│   │   ├── Home.tsx    # Home page with post list
│   │   └── Post.tsx    # Individual post page
│   ├── posts/          # Markdown blog posts
│   │   ├── welcome.md
│   │   ├── react-vite.md
│   │   └── tailwind-css.md
│   ├── lib/            # Utility functions
│   │   ├── posts.ts    # Post loading utilities
│   │   └── utils.ts    # General utilities
│   ├── App.tsx         # Main app component with routing
│   ├── main.tsx        # App entry point
│   └── index.css       # Global styles
├── .github/
│   └── workflows/
│       └── deploy.yml  # GitHub Actions deployment
├── vite.config.ts      # Vite configuration
├── postcss.config.js   # PostCSS configuration
├── tsconfig.json       # TypeScript configuration
└── package.json        # Dependencies and scripts
```

## 🛠️ Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **ShadCN/UI** - Beautiful, accessible component library
- **Framer Motion** - Animation library
- **React Markdown** - Markdown rendering
- **Lucide React** - Icon library

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

Built with ❤️ using React, Vite, and Tailwind CSS
