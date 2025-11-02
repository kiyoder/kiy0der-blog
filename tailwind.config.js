// Create a Tailwind config that enables class-based dark mode and points to our source files
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // map semantic tokens to CSS variables (RGB) so Tailwind can generate
        // opacity-aware utilities like `bg-background/95` using the <alpha-value>
        background: 'rgb(var(--background-rgb) / <alpha-value>)',
        foreground: 'rgb(var(--foreground-rgb) / <alpha-value>)',
        card: 'rgb(var(--card-rgb) / <alpha-value>)',
        primary: 'rgb(var(--primary-rgb) / <alpha-value>)',
        secondary: 'rgb(var(--secondary-rgb) / <alpha-value>)',
        destructive: 'rgb(var(--destructive-rgb) / <alpha-value>)',
        input: 'rgb(var(--input-rgb) / <alpha-value>)',
        accent: 'rgb(var(--accent-rgb) / <alpha-value>)',
        border: 'rgb(var(--border-rgb) / <alpha-value>)',
      },
    },
  },
  plugins: [],
};

