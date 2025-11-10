/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        // 'sans' is the default font for the app (for UI, buttons, labels)
        sans: ['Inter', 'sans-serif'],
        // 'serif' is our display font (for titles, clock)
        serif: ['"Playfair Display"', 'serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'), // Highly recommended for styling forms
  ],
}