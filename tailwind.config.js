/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream : "#F9EAE1",
        softBrown : "#C09F80",
        shadowColor : "#D7CEC7",
        textColor : "#565656",
        maroon : "#76323F",
      }
    },
  },
  plugins: [require("@tailwindcss/forms")],
}
