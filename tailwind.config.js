/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'voice-primary': '#e8d5b7',    // Warm cream from Horafly logo
        'voice-secondary': '#d4c4a8',  // Deeper cream
        'voice-accent': '#c4b49a',     // Muted cream-gold
        'voice-dark': '#000000',       // Pure Black
        'voice-light': '#faf8f3',      // Warm white
        'horafly': {
          50: '#faf8f3',
          100: '#f5f1e8',
          200: '#f0ebe0',
          300: '#ebe5d8',
          400: '#e8d5b7',
          500: '#d4c4a8',
          600: '#c4b49a',
          700: '#a0896b',
          800: '#8b7355',
          900: '#5a4f3a',
        },
        'black': {
          50: '#f5f5f5',
          100: '#e0e0e0',
          200: '#bdbdbd',
          300: '#9e9e9e',
          400: '#757575',
          500: '#424242',
          600: '#2a2318',
          700: '#1a1510',
          800: '#0d0d0d',
          900: '#000000',
        }
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'wave': 'wave 3s ease-in-out infinite',
        'bounce-subtle': 'bounce-subtle 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'slide-up': 'slide-up 0.5s ease-out',
        'slide-down': 'slide-down 0.5s ease-out',
        'fade-in': 'fade-in 0.6s ease-out',
        'scale-in': 'scale-in 0.4s ease-out',
        'rotate-slow': 'rotate-slow 10s linear infinite',
        'bounce-x': 'bounce-x 1s ease-in-out infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(255, 215, 0, 0.5)',
            transform: 'scale(1)'
          },
          '50%': { 
            boxShadow: '0 0 40px rgba(255, 215, 0, 0.8)',
            transform: 'scale(1.05)'
          },
        },
        'wave': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'bounce-subtle': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-10px) rotate(1deg)' },
          '66%': { transform: 'translateY(-5px) rotate(-1deg)' },
        },
        'shimmer': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'glow': {
          '0%': { boxShadow: '0 0 20px rgba(255, 215, 0, 0.5)' },
          '100%': { boxShadow: '0 0 40px rgba(255, 215, 0, 0.8), 0 0 60px rgba(255, 215, 0, 0.4)' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-down': {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'rotate-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'bounce-x': {
          '0%, 100%': { transform: 'translateX(0px)' },
          '50%': { transform: 'translateX(5px)' },
        },
        'wiggle': {
          '0%, 100%': { transform: 'rotate(-1deg)' },
          '50%': { transform: 'rotate(1deg)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'horafly-gradient': 'linear-gradient(135deg, #e8d5b7, #d4c4a8, #c4b49a)',
        'black-gradient': 'linear-gradient(135deg, #000000, #1a1510, #2a2318)',
        'shimmer-gradient': 'linear-gradient(90deg, transparent, rgba(232, 213, 183, 0.4), transparent)',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'horafly': '0 4px 20px rgba(232, 213, 183, 0.3)',
        'horafly-lg': '0 10px 40px rgba(232, 213, 183, 0.4)',
        'black': '0 4px 20px rgba(0, 0, 0, 0.5)',
        'inner-horafly': 'inset 0 2px 4px rgba(232, 213, 183, 0.2)',
      },
    },
  },
  plugins: [],
}

