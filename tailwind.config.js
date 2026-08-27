/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'svg-line': 'tp-svg-line 30s linear infinite forwards', // Define your custom animation
      },
      keyframes: {
        'tp-svg-line': {
          '100%': { strokeDashoffset: '350' }, // Define the keyframe for the animation
        },
      },
      screens: {
        'xs': '320px',  // Custom breakpoint for 320px
      },
    },
  },
  plugins: [],
};
