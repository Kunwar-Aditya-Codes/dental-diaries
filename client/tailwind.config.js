/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#002135",
        secondary: "#b6ecff",
      },

      fontFamily: {
        custom: "'Geologica', sans-serif",
      },
    },
  },
};
