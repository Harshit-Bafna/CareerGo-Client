/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'black': 'var(--color-black)',
        'dark-gray': 'var(--color-dark-gray)',
        'navy-blue': 'var(--color-navy-blue)',
        'deep-blue': 'var(--color-deep-blue)',
        'gold': 'var(--color-gold)',
        'light-gray': 'var(--color-light-gray)',
        'deep-indigo': 'var(--color-deep-indigo)',
        'background-white': 'var(--background-white)',
        'background-light': 'var(--background-light)',
        'background-dark': 'var(--background-dark)',
        'background-accent': 'var(--background-accent)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-accent': 'var(--text-accent)',
        'border-light': 'var(--border-light)',
        'border-dark': 'var(--border-dark)',
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'serif'],
        body: ['var(--font-body)', 'sans-serif'],
        accent: ['var(--font-accent)', 'sans-serif'],
      },
      boxShadow: {
        'input-shadow': 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
      },
    },
  },
  plugins: [],
};
