/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-dark': '#113272',
        'primary-main': '#164194',
        'neutral-extra-light': '#DDDDDD',
      }
    },
  },
  plugins: [],
}