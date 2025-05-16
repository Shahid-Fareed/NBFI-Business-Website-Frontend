import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0F1B3F', // Dark Blue
        secondary: '#253E8B', // light Blue
        accent: '#F97316', // Accent color
        awtgreen: '#3B6430', // Accent color
      },
      fontFamily: {
        sans: ['Poppins', 'ui-sans-serif', 'system-ui'], // Use Poppins as the default sans-serif font
      },
    },
  },
  plugins: [
    
  ],
} satisfies Config;
