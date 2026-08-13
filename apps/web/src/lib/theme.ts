import type { ThemeConfig } from 'antd';

/**
 * Ant Design theme tokens aligned with the Tailwind brand palette so both
 * styling systems stay visually consistent (charcoal + red accent).
 */
export const antdTheme: ThemeConfig = {
  // CSS-variable mode computes design tokens once and reuses them, cutting the
  // per-render style serialization cost of antd's CSS-in-JS (faster SSR).
  cssVar: true,
  hashed: false,
  token: {
    colorPrimary: '#2563eb',
    colorInfo: '#2563eb',
    colorLink: '#2563eb',
    colorLinkHover: '#60a5fa',
    borderRadius: 10,
    fontFamily: 'var(--font-sans), system-ui, sans-serif',
    controlHeight: 40,
    colorTextBase: '#111418',
  },
  components: {
    Button: {
      controlHeight: 44,
      fontWeight: 600,
      primaryShadow: 'none',
    },
    Input: { controlHeight: 44 },
    Select: { controlHeight: 44 },
    DatePicker: { controlHeight: 44 },
    Drawer: { paddingLG: 20 },
  },
};
