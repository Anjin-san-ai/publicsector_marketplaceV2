export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // CSS-variable-backed theme colors
        'theme-bg':      'var(--color-bg-primary)',
        'theme-surface': 'var(--color-bg-surface)',
        'theme-alt':     'var(--color-bg-surface-alt)',
        'theme-light':   'var(--color-bg-light)',
        'theme-accent':  'var(--color-accent)',
        'theme-text':    'var(--color-text-primary)',
        'theme-muted':   'var(--color-text-muted)',
        'theme-border':  'var(--color-border)',
        // Legacy palette kept for Agent Builder neural-flow compatibility
        primary: {
          DEFAULT: '#1d70b8',
          dark: '#1558a0',
        },
        accent: {
          cyan: '#1d70b8',
        },
      },
      fontFamily: {
        gds: ['"GDS Transport"', 'Arial', 'sans-serif'],
      },
      borderRadius: {
        pill: '999px',
        card: '18px',
      },
    },
  },
}
