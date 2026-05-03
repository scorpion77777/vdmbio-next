import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        lab: {
          50:  '#f0f7ff',
          100: '#e0effe',
          200: '#bae0fd',
          300: '#7dc8fb',
          400: '#38aaf6',
          500: '#0e8ee7',
          600: '#026fc5',
          700: '#0358a0',
          800: '#074b84',
          900: '#0c3f6e',
          950: '#082849',
        },
        teal: {
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
        },
        slate: {
          850: '#172033',
          950: '#0a0f1e',
        }
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        body: ['var(--font-body)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease forwards',
        'fade-in': 'fadeIn 0.4s ease forwards',
        'slide-in': 'slideIn 0.5s ease forwards',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        slideIn: {
          from: { opacity: '0', transform: 'translateX(-20px)' },
          to:   { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
      },
      backgroundImage: {
        'grid-pattern': "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230e8ee7' fill-opacity='0.05'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        'molecule-pattern': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Ccircle cx='30' cy='30' r='2' fill='%230e8ee7' fill-opacity='0.08'/%3E%3Ccircle cx='10' cy='10' r='1.5' fill='%2314b8a6' fill-opacity='0.06'/%3E%3Ccircle cx='50' cy='10' r='1.5' fill='%2314b8a6' fill-opacity='0.06'/%3E%3Ccircle cx='10' cy='50' r='1.5' fill='%2314b8a6' fill-opacity='0.06'/%3E%3Ccircle cx='50' cy='50' r='1.5' fill='%2314b8a6' fill-opacity='0.06'/%3E%3Cline x1='10' y1='10' x2='30' y2='30' stroke='%230e8ee7' stroke-opacity='0.04' stroke-width='0.5'/%3E%3Cline x1='50' y1='10' x2='30' y2='30' stroke='%230e8ee7' stroke-opacity='0.04' stroke-width='0.5'/%3E%3Cline x1='10' y1='50' x2='30' y2='30' stroke='%230e8ee7' stroke-opacity='0.04' stroke-width='0.5'/%3E%3Cline x1='50' y1='50' x2='30' y2='30' stroke='%230e8ee7' stroke-opacity='0.04' stroke-width='0.5'/%3E%3C/g%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
}

export default config
