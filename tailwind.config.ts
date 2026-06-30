import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    // Custom breakpoints per v3 spec: 320 -> 2560
    screens: {
      xs: "320px",
      sm: "375px",
      ph: "430px",
      md: "600px",
      lg: "768px",
      xl: "1024px",
      "2xl": "1280px",
      "3xl": "1536px",
      "4xl": "1920px",
      "5xl": "2560px",
    },
    extend: {
      colors: {
        // Clinical / academic palette - solid colors, NO gradients
        teal: {
          DEFAULT: "#0F6E63",
          dark: "#0B5249",
          light: "#E3F0EE",
        },
        bone: {
          DEFAULT: "#F7F6F2",
          dark: "#EDEBE4",
        },
        charcoal: {
          DEFAULT: "#22272B",
          muted: "#5A6168",
        },
        amber: {
          DEFAULT: "#C8862D",
          light: "#F6ECD9",
        },
        alert: "#B23B3B",
        line: "#DFDDD4",
      },
      fontFamily: {
        serif: ["var(--font-source-serif)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(34, 39, 43, 0.04), 0 2px 8px rgba(34, 39, 43, 0.05)",
        "card-hover": "0 2px 4px rgba(34, 39, 43, 0.06), 0 4px 16px rgba(34, 39, 43, 0.08)",
      },
      borderRadius: {
        card: "10px",
      },
    },
  },
  plugins: [],
};

export default config;
