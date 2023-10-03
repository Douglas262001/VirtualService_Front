/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#fec80a",
          secondary: "#fec80a",
          accent: "#37CDBE",
          neutral: "#bebebe",
          "base-100": "#F5F5F5",
          info: "#3ABFF8",
          success: "#79F564",
          warning: "#FBBD23",
          error: "#FF4F4F",
        },
        dark: {
          primary: "#fec80a",
          secondary: "#fec80a",
          accent: "#37CDBE",
          neutral: "#292929",
          "base-100": "#303030",
          info: "#3ABFF8",
          success: "#79F564",
          warning: "#FBBD23",
          error: "#FF4F4F",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
