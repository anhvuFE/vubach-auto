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
        // Brand palette: deep charcoal / white / gray with navy-blue accent
        brand: {
          DEFAULT: '#2563eb',
          dark: '#1d4ed8',
          light: '#60a5fa',
        },
        charcoal: {
          DEFAULT: '#0f1720',
          soft: '#18212e',
          muted: '#243141',
        },
        ink: '#0a0f16',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-sans)', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(15, 23, 42, 0.04)',
        'card-hover': '0 16px 40px rgba(15, 23, 42, 0.12)',
        header: '0 1px 0 rgba(15, 23, 42, 0.08)',
      },
      borderRadius: {
        xl: '10px',
        '2xl': '12px',
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
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out both',
        'fade-in': 'fade-in 0.8s ease-out both',
        marquee: 'marquee 32s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
