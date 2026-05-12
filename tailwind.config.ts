import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";
import typography from "@tailwindcss/typography";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/sections/**/*.{ts,tsx}",
    "./src/emails/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-be-vietnam-pro)", "system-ui", "sans-serif"]
      },
      colors: {
        background: "#020617",
        foreground: "#FFFFFF",
        card: "#0F172A",
        "card-foreground": "#FFFFFF",
        popover: "#0F172A",
        "popover-foreground": "#FFFFFF",
        primary: {
          DEFAULT: "#2563EB",
          foreground: "#FFFFFF"
        },
        secondary: {
          DEFAULT: "#1E40AF",
          foreground: "#FFFFFF"
        },
        accent: {
          DEFAULT: "#06B6D4",
          foreground: "#020617"
        },
        muted: {
          DEFAULT: "#1E293B",
          foreground: "#94A3B8"
        },
        destructive: {
          DEFAULT: "#EF4444",
          foreground: "#FFFFFF"
        },
        success: "#22C55E",
        warning: "#F59E0B",
        border: "#1E293B",
        input: "#1E293B",
        ring: "#06B6D4"
      },
      borderRadius: {
        lg: "0.5rem",
        md: "0.375rem",
        sm: "0.25rem"
      },
      boxShadow: {
        glow: "0 0 38px rgba(37, 99, 235, 0.35)",
        cyan: "0 0 34px rgba(6, 182, 212, 0.28)",
        glass: "0 18px 60px rgba(2, 6, 23, 0.45)"
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" }
        },
        glow: {
          "0%, 100%": { boxShadow: "0 0 18px rgba(37, 99, 235, 0.35)" },
          "50%": { boxShadow: "0 0 42px rgba(6, 182, 212, 0.45)" }
        }
      },
      animation: {
        "fade-up": "fade-up 0.65s ease both",
        float: "float 4s ease-in-out infinite",
        glow: "glow 2.8s ease-in-out infinite"
      }
    }
  },
  plugins: [animate, typography]
};

export default config;
