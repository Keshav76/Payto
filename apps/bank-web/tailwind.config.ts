/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addBase, config }: any) {
      addBase({
        'input[type="number"]::-webkit-outer-spin-button': {
          "-webkit-appearance": "none",
          margin: "0",
        },
        'input[type="number"]::-webkit-inner-spin-button': {
          "-webkit-appearance": "none",
          margin: "0",
        },
        'input[type="number"]': {
          "-moz-appearance": "textfield", // For Firefox
        },
        "*::-webkit-scrollbar": {
          display: "none",
        },
      });
    },
  ],
};
