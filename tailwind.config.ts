/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        pattern:
          "url('data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cg fill='%23efefef' fill-opacity='1'%3E%3Cpolygon fill-rule='evenodd' points='8 4 12 6 8 8 6 12 4 8 0 6 4 4 6 0 8 4'/%3E%3C/g%3E%3C/svg%3E')",
      },
      fontFamily: {
        poppins: ["var(--font-poppins)", "sans-serif"],
      },

      colors: {
        primary: {
          light: "#2563eb", // Light theme primary (blue-600)
          dark: "#3b82f6", // Dark theme primary (blue-500)
        },
        secondary: {
          light: "#6b7280", // Light theme secondary (gray-500)
          dark: "#9ca3af", // Dark theme secondary (gray-400)
        },
        accent: {
          light: "#f59e0b", // Light theme accent (amber-500)
          dark: "#facc15", // Dark theme accent (amber-400)
        },
        background: {
          light: "#ffffff", // Light theme background
          dark: "#111827", // Dark theme background (gray-900)
        },
        foreground: {
          light: "#1f2937", // Light theme text (gray-800)
          dark: "#e5e7eb", // Dark theme text (gray-200)
        },
        card: {
          light: "#f9fafb", // Light card background (gray-50)
          dark: "#1e293b", // Dark card background (gray-800)
        },
        border: {
          light: "#e5e7eb", // Light theme border (gray-200)
          dark: "#374151", // Dark theme border (gray-600)
        },
      },
    },
  },
  plugins: [],
};
