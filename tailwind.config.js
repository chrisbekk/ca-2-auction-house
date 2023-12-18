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
    },
  },
  plugins: [],
};
