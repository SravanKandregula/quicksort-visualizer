/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: '#FFFFFF',
          50: '#FFFFFF',
          100: '#FAFAFA',
          200: '#F4F4F6',
          300: '#EAEAEF',
          400: '#D5D6DF',
          500: '#B8B9C8',
        },
        ink: {
          DEFAULT: '#282B4A',
          50: '#F5F5F8',
          100: '#E4E5EC',
          200: '#C7C9D8',
          300: '#A1A4BD',
          400: '#73779B',
          500: '#4D527B',
          600: '#383C61',
          700: '#282B4A',
          800: '#1C1E34',
          900: '#121321',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      borderRadius: {
        'sm': '2px',
        DEFAULT: '3px',
        'md': '4px',
        'lg': '5px',
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(40, 43, 74, 0.06)',
        'elevated': '0 4px 16px 0 rgba(40, 43, 74, 0.08)',
      }
    },
  },
  plugins: [],
};
