/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", "Helvetica", "Arial", "sans-serif"],
        mono: ["Roboto Mono", "monospace", "ui-monospace"],
      },
      backgroundImage: {
        "main-image": "url('../public/assets/bg-main-image.png')",
      },
      colors: {
        "primary-400": "#CAA06E",
        "primary-600": "#BD8A4C",
        "primary-800": "#3E3932",
      },
    },
  },
  plugins: [],
};
