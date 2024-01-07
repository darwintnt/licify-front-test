/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        "licify-yellow": "#fdd750",
        "licify-yellow-100": "#fdd750",
        "licify-gray": "#f3f3f3",
        "licify-gray-2": "#333333",
        "licify-gray-100": "#333333",
      },
    },
  },
  plugins: [],
};
