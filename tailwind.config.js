
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      animation: {
        float: "float 6s ease-in-out infinite",
        glow: "glow 2.5s ease-in-out infinite"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" }
        },
        glow: {
          "0%,100%": { boxShadow: "0 0 20px #38bdf8" },
          "50%": { boxShadow: "0 0 40px #22d3ee" }
        }
      }
    }
  },
  plugins: []
}
