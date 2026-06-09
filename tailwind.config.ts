import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#F3F1F0',
          primary: '#8A645D',
          'primary-hover': '#76514B',
          surface: '#ECE9E8',
          border: '#D4C6C2',
        },
      },
      fontFamily: {
        'serif-brand': ['var(--font-playfair)', 'Georgia', 'serif'],
        'sans-brand': ['var(--font-jakarta)', 'sans-serif'],
      },
      borderRadius: {
        organic: '40px 10px 40px 10px',
        'organic-reverse': '10px 40px 10px 40px',
      },
    },
  },
  plugins: [],
};

export default config;
