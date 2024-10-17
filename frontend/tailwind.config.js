/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", './public/index.html'],
  theme: {
    extend: {
      colors: {
        mainbg: '#FFFFE6',
        main1: '#FFFFC8',
        main2: '#FFFC51',
        main3: '#8F0786',
      }
    },
  },
  plugins: [],
};
