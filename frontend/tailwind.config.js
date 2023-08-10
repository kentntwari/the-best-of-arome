const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    screens: {
      xs: "375px",
      md: "640px",
      lg: "834px",
      xl: "1440px",
    },
    fontSize: {
      "8xl": ["3.813rem", "4.5rem"], // Desktop display
      "7xl": ["3.338rem", "4rem"], // Mobile display
      "6xl": ["3.05rem", "3.5rem"], // Desktop h1
      "5xl": ["2.669rem", "3.25rem"], //Mobile h1
      "4xl": ["2.444rem", "3.25rem"], //Desktop h2
      "3xl": ["2.138rem", "3rem"], // Mobile h2
      "2xl": ["1.956rem", "2.625rem"], //Desktop h3
      xl: ["1.706rem", "2.25rem"], // Mobile h3
      lg: ["1.563rem", "2.25rem"], // Desktop h4
      md: ["1.369rem", "2rem"], // Mobile h4
      umd: ["1.25rem", "1.75rem"], // Desktop subheading
      base: ["1rem", "1.5rem"], // Desktop paragraphs and mobile subheadings
      sm: ["0.875rem", "1.25rem"], // Desktop caption and mobile paragraphs
      xs: ["0.8rem", "1rem"], // Desktop footer and mobile caption
      "2xs": ["0.638rem", "1rem"], // Mobile footer
    },

    extend: {
      fontFamily: {
        sans: ["var(--font-poppins)", fontFamily.sans],
      },
      lineHeight: {
        4.5: "1.125rem",
      },
      colors: {
        lp: {
          50: "#fefefe",
          75: "#fcfba",
          100: "#fafaf7",
          200: "#f8f8f4",
          300: "#f7f6f2",
          400: "#adaca9",
          500: "#979694",
        },
        ls: {
          50: "#f7f1eb",
          75: "#dec5ad",
          100: "#d0ad8b",
          200: "#bc8959",
          300: "#ae7137",
          400: "#7a4f27",
          500: "#6a4522",
        },
        la: {
          50: "#fffcf9",
          75: "#fff4e5",
          100: "#ffefda",
          200: "#ffe8cb",
          300: "#ffe3c0",
          400: "#b39f86",
          500: "#9c8a75",
        },
        dp: {
          50: "#e8e7f0",
          75: "#a19ec3",
          100: "#7a76aa",
          200: "#403a86",
          300: "#19126d",
          400: "#120d4c",
          500: "#0f0b42",
        },
        ds: {
          50: "#eeeae6",
          75: "#bbab96",
          100: "#9f886b",
          200: "#75542b",
          300: "#593100",
          400: "#3e2200",
          500: "#361e00",
        },
        da: {
          50: "#e6edf3",
          75: "#96b6cc",
          100: "#6b98b7",
          200: "#2b6c98",
          300: "#004e83",
          400: "#00375c",
          500: "#003050",
        },
        black: {
          50: "#e6e6e6",
          75: "#969696",
          100: "#6b6b6b",
          200: "#2b2b2b",
          300: "#000000",
        },
        white: {
          300: "#ffffff",
          400: "#b3b3b3",
          500: "#9c9c9c",
        },
        neutral: {
          10: "#fafafa",
          20: "#f5f5f5",
          30: "#ebebeb",
          40: "#dedede",
          50: "#bfbfbf",
          60: "#b0b0b0",
          70: "#a3a3a3",
          80: "#949494",
          90: "#858585",
          100: "#757575",
          200: "#666666",
          300: "#575757",
          400: "#4a4a4a",
          500: "#3b3b3b",
          600: "#2e2e2e",
          700: "#1c1c1c",
          800: "#0d0d0d",
          900: "#000000",
        },
      },
      boxShadow: {
        black: "2px -8px 40px 4px rgba(0,0,0,0.2)",
        white: "2px -8px 40px 4px rgba(255,255,255,0.2)",
        light: {
          primary: "2px -8px 40px 4px rgba(255,171,90,0.2)",
          secondary: "2px -8px 40px 4px rgba(255,204,140,0.2)",
          primary: "2px -8px 40px 4px rgba(206,206,206,0.2)",
        },
        dark: {
          primary: "2px -8px 40px 4px rgba(92,81,255,0.2)",
          secondary: "2px -8px 40px 4px rgba(3,153,255,0.2)",
          primary: "2px -8px 40px 4px rgba(235,235,235,0.2)",
        },
      },
      gap: {
        15: "3.75rem",
      },
      spacing: {
        7.5: "1.875rem",
        50: "12rem",
      },
    },
  },
  plugins: [],
};
