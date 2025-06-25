import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      // check later, doesn't work
      boxShadow: {
        'custom-soft': '0 0 4px 0 rgba(0, 0, 0, 0.08), 0 2px 4px 0 rgba(0, 0, 0, 0.12)',
      },
    },
  },
  plugins: [],
};

export default config;
