/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", "Helvetica", "Arial", "sans-serif"],
      },
      backgroundImage: {
        "main-image": "url('../public/assets/bg-main-image.png')",
      },
    },
  },
  plugins: [],
};
