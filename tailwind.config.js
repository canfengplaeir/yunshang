module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'minecraft': ['Minecraft', 'monospace']
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'float': 'float 6s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.8s ease-out',
        'gradient-border': 'gradientBorder 4s linear infinite'
      }
    },
  },
  plugins: [require('daisyui'), require('@tailwindcss/typography')],
  daisyui: {
    themes: [
      {
        "light": {
          "primary": "#3b82f6",
          "secondary": "#f59e0b",
          "accent": "#10b981",
          "neutral": "#1f2937",
          "base-100": "#ffffff",
        },
        "dark": {
          "primary": "#60a5fa",
          "secondary": "#fbbf24",
          "accent": "#34d399",
          "neutral": "#111827",
          "base-100": "#1f2937",
          "base-200": "#111827",
          "base-300": "#0f172a",
          "base-content": "#f3f4f6",
        }
      },
    ],
    base: true,
    styled: true,
  }
} 