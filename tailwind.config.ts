import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  // Disable Tailwind's Preflight to avoid resetting Ant Design component styles.
  // We provide our own minimal base resets in globals.css.
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        // Brand palette: charcoal / white / gray with red accent
        brand: {
          DEFAULT: '#e11d2a',
          dark: '#b0141f',
          light: '#ff3b47',
        },
        charcoal: {
          DEFAULT: '#111418',
          soft: '#1c2127',
          muted: '#2a2f36',
        },
        ink: '#0b0d10',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-sans)', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 20px rgba(15, 23, 42, 0.08)',
        'card-hover': '0 18px 40px rgba(15, 23, 42, 0.16)',
        header: '0 2px 16px rgba(0, 0, 0, 0.08)',
      },
      borderRadius: {
        xl: '14px',
        '2xl': '20px',
      },
      maxWidth: {
        container: '1280px',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out both',
        'fade-in': 'fade-in 0.8s ease-out both',
      },
    },
  },
  plugins: [],
};

export default config;
