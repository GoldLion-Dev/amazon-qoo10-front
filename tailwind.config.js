/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", "./src/**/**/*.{html,js}"],
  theme: {
    extend: {
      keyframes: {
        chase: {
          "0%, 100%": { transform: "translateY(0) scale(0)" },
          "25%": { transform: "translateY(-12px) scale(1)" },
          "50%": { transform: "translateX(12px) scale(1)" },
          "75%": { transform: "translateY(12px) scale(1)" },
        },
      },
      animation: {
        chase: "chase 2s linear infinite",
      },
    },
  },
  plugins: [],
};
