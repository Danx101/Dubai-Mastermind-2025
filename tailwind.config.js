/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Dubai theme colors - Navy Blue
        navy: {
          50: '#E7E9EF',
          100: '#C5CAD8',
          200: '#9FA7BE',
          300: '#7984A4',
          400: '#5D6A91',
          500: '#40507D',
          600: '#3A4975',
          700: '#32406A',
          800: '#2A3760',
          900: '#1E3A8A',
          950: '#0A1128',
        },
        gold: {
          50: '#FFFBF0',
          100: '#FFF6E0',
          200: '#FFEDC2',
          300: '#FFE4A3',
          400: '#FFD700',
          500: '#D4AF37',
          600: '#B8942F',
          700: '#9C7927',
          800: '#805E1F',
          900: '#644317',
        },
        parchment: {
          50: '#FCFAF7',
          100: '#F9F5EF',
          200: '#F5E6D3',
          300: '#F0D7B7',
          400: '#E8DCC4',
          500: '#E0D1B1',
          600: '#D4C49F',
          700: '#C8B78D',
          800: '#BCAA7B',
          900: '#B09D69',
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['Playfair Display', 'Georgia', 'serif'],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideUp: {
          from: { transform: "translateY(20px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        fadeIn: "fadeIn 0.5s ease-in-out",
        slideUp: "slideUp 0.6s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
