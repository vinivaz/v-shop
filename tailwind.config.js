module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,html}"],
  theme: {
  extend: {
    fontFamily: {
      sans: ['var(--font-inter)', 'sans-serif'],
      zen: ['var(--font-zen-dots)', 'sans-serif'],
    },
  }
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}