/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: "1rem",
      },
      fontFamily: { // add new font family
        montserrat: ['Montserrat', 'sans-serif']
      },
      colors: {
        cream : "#F9EAE1",
        softBrown : "#DEC9B5",
        softGrey : "#C4C4C4",
        softPink : "#FCC6B7",
        shadowColor : "#D7CEC7",
        textColor : "#565656",
        maroon : "#76323F",

      }
    },
  },
  plugins: [require("@tailwindcss/forms")],
}
