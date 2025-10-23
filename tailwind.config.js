/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        background: "var(--color-background)",
        foreground: "var(--color-foreground)",
        secondary: "var(--color-secondary)",
        muted: "var(--color-muted)",
        accent: "var(--color-accent)",
        card: "var(--color-card)",
        border: "var(--color-border)",
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [
    function({ addComponents }) {
      addComponents({
        '.feature': {
          '@apply flex-row items-center justify-center mb-6': {},
        },
        '.feature-icon': {
          '@apply w-12 h-12 rounded-lg bg-primary items-center justify-center mr-3': {},
        },
        '.feature-text': {
          '@apply text-base leading-[22px] font-medium text-secondary flex-col flex-1 gap-2': {},
        },
        '.feature-title': {
          '@apply font-bold text-foreground': {},
        },
      })
    }
  ],
};
