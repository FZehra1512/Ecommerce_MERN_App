/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cherryBlossomPink: "#edafb8",
        champagnePink: "#f7e1d7",
        timberWolf: "#dedbd2",
        ashGray: "#b0c4b1",
        outerSpace: "#4a5759",
      },
    },
  },
  plugins: [],
};

