/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        xp: {
          blue: {
            titlebar: '#0058e6', // Left gradient titlebar
            titlebarLight: '#3a93ff', // Right gradient titlebar
            taskbar: '#245edb',
            border: '#0054e3', // Outer window border
            innerBorder: '#003dbb', // Inner window border
          },
          green: {
            start: '#3c812d', // Start button base
            startHover: '#4a9c39',
          },
          silver: {
            bg: '#ece9d8', // Default window background
            text: '#000000',
          },
          orange: {
            alert: '#e55400',
          },
          red: {
            close: '#e24838', // Close button
          }
        }
      },
      fontFamily: {
        tahoma: ['Tahoma', 'Geneva', 'sans-serif'], // The standard XP UI font
        trebuchet: ['"Trebuchet MS"', 'sans-serif'], // Start menu title font
      },
      backgroundImage: {
        'xp-desktop': "url('/assets/bliss.jpg')",
        'titlebar-gradient': "linear-gradient(180deg, #0997ff, #0053ee 8%, #0050ee 40%, #0066ff 88%, #0066ff 93%, #0050ee 95%, #0050ee 96%, #003aab 100%)", // Authentic gradient
        'titlebar-inactive': "linear-gradient(180deg, #7ea4d8, #6d93cb 8%, #6a91c8 40%, #7da2d5 88%, #7da2d5 93%, #6a91c8 95%, #6a91c8 96%, #5275a5 100%)",
        'taskbar-gradient': "linear-gradient(180deg, #245edb 0%, #3f8cf3 9%, #245edb 18%, #245edb 92%, #333333 100%)",
      }
    },
  },
  plugins: [],
}
