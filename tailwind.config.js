/* eslint-disable @typescript-eslint/no-var-requires */
const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: [
    "./src/pages/*.{js,ts,jsx,tsx}",
    "./src/pages/app/**/*.{js,ts,jsx,tsx}",
    "./src/client/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
      keyframes: {
        blob: {
          "0%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(3rem, -4rem) scale(1.4)" },
          "50%": { transform: "translate(2rem, 2rem) scale(1)" },
          "66%": { transform: "translate(1rem, 12rem) scale(0.8)" },
          "100%": { transform: "translate(0, 0) scale(1)" },
        },
        loading: {
          to: {
            "background-position": "left",
          },
        },
      },
      animation: {
        blob: "blob 7s infinite",
        loading: "loading .8s infinite",
      },
      skew: {
        35: "-35deg",
      },
    },
    cursor: {
      grab: "grab",
      pointer: "pointer",
      "not-allowed": "not-allowed",
    },
  },
  variants: {
    extend: {
      opacity: ["disabled"],
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".youtube-scroll:hover": {
          "&::-webkit-scrollbar": {
            width: "16px",
          },
          "&::-webkit-scrollbar-thumb": {
            display: "block",
            height: "56px",
            "border-radius": "8px",
            border: "4px solid transparent",
            "background-clip": "content-box",
            "background-color": "#ccc",
          },
        },
        ".youtube-scroll": {
          "&::-webkit-scrollbar": {
            width: "16px",
          },
          "&::-webkit-scrollbar-thumb": {
            display: "none",
          },
        },
      });
    }),
  ],
};
