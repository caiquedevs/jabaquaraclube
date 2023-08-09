/** @type {import('tailwindcss').Config} */

const withMT = require('@material-tailwind/react/utils/withMT');

module.exports = withMT({
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  plugins: [],
  darkMode: 'class',
  theme: {
    fontFamily: {
      inter: ['Inter', 'sans-serif'],
      changa: ['Changa', 'sans-serif'],
    },
    extend: {
      colors: {
        primary: '#EF5757',
        secondary: '#2D3436',
        background: '#f5f5f5',
        warn: '#EFA957',
        success: '#05c46b',
        'border-primary': '#EBEBEB',
        'border-input': '#DDDFE2',
        sky: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        slate: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
      },
      boxShadow: {
        base: '4px 4px 4px rgba(0, 0, 0, 0.04)',
        input: '0px 0px 0px 1px',
      },
      width: {},
      minWidth: {},
      maxWidth: {},
      height: {
        13: '50px',
      },
      minHeight: {},
      maxHeight: {},
      spacing: {},
      fontSize: {},
      lineHeight: {
        initial: 'initial',
      },
      borderRadius: {
        base: '3px',
      },
      borderWidth: {},
      gridTemplateColumns: {},
      transitionDuration: { 0: '0ms' },
      keyframes: {
        pushBottom: {
          '0%': { transform: 'translateY(260px)' },
          '100%': { transform: 'translateY(0px)' },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        dash: {
          to: {
            'stroke-dashoffset': 100,
            'stroke-dasharray': 100,
          },
        },
        scale: {
          '0%': { opacity: 0, transform: 'scale(0.9)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
        'pulse-intense': {
          '0%, 100%': {
            opacity: 1,
          },
          '50%': {
            opacity: 0.3,
          },
        },
      },
      animation: {
        'pulse-intense': 'pulse-intense 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        fadeIn: 'fadeIn 0.2s cubic-bezier(.4,0,.2,1)',
        scale: 'scale 0.2s cubic-bezier(.4,0,.2,1)',
        dash: 'dash 2s linear infinite;',
        pushBottom: 'pushBottom 0.2s ease-out',
      },
      gridTemplateColumns: {},
      backgroundImage: {
        'bg-mobile': "url('/bg-mobile.jpg')",
      },
      screens: {
        mobile: '900px',
        desk: '901px',
      },
    },
  },
});
