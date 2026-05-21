import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        neon: {
          purple: "#7c3aed",
          pink: "#ec4899",
          orange: "#f97316",
          gold: "#fbbf24",
        },

        dark: {
          bg: "#050505",
          card: "#111111",
          border: "#1f1f1f",
        }
      },

      fontFamily: {
        sans: ["var(--font-geist)", "sans-serif"],
      },

      boxShadow: {
        neonPink: "0 0 20px rgba(236,72,153,0.5)",
        neonPurple: "0 0 25px rgba(124,58,237,0.5)",
        neonStrong: "0 0 40px rgba(236,72,153,0.7)",
      },

      animation: {
        glow: "glow 2s ease-in-out infinite alternate",
        float: "float 4s ease-in-out infinite",
      },

      keyframes: {
        glow: {
          from: {
            boxShadow: "0 0 10px rgba(236,72,153,0.2)",
          },
          to: {
            boxShadow: "0 0 30px rgba(236,72,153,0.7)",
          },
        },

        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
}

export default config