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
          bg: '#F8FAF9',
          primary: '#88B7A5',
          'primary-hover': '#72A190',
          accent: '#E8A8B8',
          'accent-hover': '#D892A5',
          surface: '#EEF5F2',
          'surface-pink': '#FBF0F3',
          border: '#C8DDD4',
          text: '#527A6B',
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
