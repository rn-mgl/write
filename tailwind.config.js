const defaulTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        noto: ["var(--noto-font)", ...defaulTheme.fontFamily.sans],
        work: ["var(--work-font)", ...defaulTheme.fontFamily.sans],
      },
    },
    colors: {
      wht: "#F2F2F2",
      gry1: "#A6A6A6",
      gry2: "#595959",
      blk1: "#262626",
      blk2: "#0D0D0D",
      red: colors.red,
      neutral: colors.neutral,
      transparent: colors.transparent,
    },
    keyframes: {
      loading: {
        "0%": { transform: "scaleX(-100%)", background: "#FF7377" },
        "25%": { transform: "scaleX(100%)", background: "#FBB03B" },
        "50%": { transform: "scaleX(-100%)", background: "#349DA9" },
        "75%": { transform: "scaleX(100%)", background: "#62B590" },
        "100%": { transform: "scaleX(-100%)", background: "#DE9C35" },
      },
      sway: {
        "0%": { transform: "translateX(0%)" },
        "100%": { transform: "translateX(50%)" },
      },
      dropOpacity: {
        "0%": { transform: "translateY(-100%)", opacity: 0, filter: "blur(1px)" },
        "100%": { transform: "translateY(0%)", opacity: 1, filter: "blur(0px)" },
      },
    },
    animation: {
      loading: "loading 5s ease-in-out infinite alternate",
      sway: "sway 1s ease-in-out infinite alternate",
      dropOpacity: "dropOpacity 500ms ease-in-out 1",
    },
    screens: {
      "m-s": "320px",
      "m-m": "375px",
      "m-l": "425px",
      t: "768px",
      "l-s": "1024px",
      "l-l": "1440px",
    },
  },
  plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
};
