/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#173653",
        muted: "#8a94a3",
        line: "#e7edf5",
        panel: "#f6f8fc",
        navy: "#06446f",
        teal: "#27c7bd",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        invoice: "0 18px 45px rgba(23, 54, 83, 0.09)",
        button: "0 10px 18px rgba(6, 68, 111, 0.22)",
      },
    },
  },
  plugins: [],
};
