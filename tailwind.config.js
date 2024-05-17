/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['Segoe UI']
    },
    fontSize: {
      'sm': '14px',
      'base': '12px',
      'lg': '18px',
      'xl': '20px',
    },
  },
  plugins: [],
}

