module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts}'],
  theme: {
    extend: {
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
        mytheme: {
          "primary": "#3b82f6",
          "secondary": "#f59e0b",
          "accent": "#10b981",
          "neutral": "#1f2937",
          "base-100": "#ffffff",
        },
      },
    ],
    base: true,
    styled: true,
  }
} 