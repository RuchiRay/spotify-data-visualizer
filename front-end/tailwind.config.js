// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      md2:"900px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      boxShadow: {
        "3xl": "inset 20px 20px 60px #0a0a0a,inset -20px -20px 60px #262626",
        "4xl": " inset 15px 15px 30px #0a0a0a,inset -15px -15px 30px #262626",
        "5xl": "15px 15px 30px #0a0a0a,-15px -15px 30px #262626",
        "6xl": "20px 20px 55px #121212,-20px -20px 55px #1e1e1e",
      },
      gridTemplateColumns:{
        'custom':'repeat(auto-fit,minmax(15rem,1fr))',
        'custom2':'repeat(auto-fit,minmax(11rem,1fr))',
      }
    },

    borderWidth: {
      DEFAULT: "1px",
      0: "0",
      2: "2px",
      3: "3px",
      4: "4px",
      6: "6px",
      8: "8px",
    },
  },
  plugins: [],
};
