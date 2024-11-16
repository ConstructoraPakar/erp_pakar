/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#17a2b8',
        'secondary': '#00949a',
        'background': '#f8f9fa',
        'positive': '#28a745',
        'negative': '#dc3545',
        'warning': '#ffc107',
      },
    },
  },
  plugins: [],
}