/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {

      /* ── Colors ──────────────────────────────────────── */
      colors: {
        bg:        '#0D0F14',
        surface:   '#1E2330',
        surface2:  '#252A3A',
        surface3:  '#2E3448',
        border:    '#2E3448',

        accent: {
          DEFAULT: '#3B7BF8',
          hover:   '#5A92FF',
          dim:     'rgba(59,123,248,0.15)',
          glow:    'rgba(59,123,248,0.30)',
        },

        ink: {
          primary:   '#F0F2F8',
          secondary: '#8B92A8',
          muted:     '#555E75',
        },

        status: {
          success:     '#22C55E',
          successDim:  'rgba(34,197,94,0.12)',
          warning:     '#F59E0B',
          warningDim:  'rgba(245,158,11,0.12)',
          danger:      '#EF4444',
          dangerDim:   'rgba(239,68,68,0.12)',
        },
      },

      /* ── Typography ──────────────────────────────────── */
      fontFamily: {
        display: ['"DM Serif Display"', 'Georgia', 'serif'],
        body:    ['"DM Sans"', 'system-ui', 'sans-serif'],
      },

      /* ── Font sizes ──────────────────────────────────── */
      fontSize: {
        '2xs': ['0.688rem', { lineHeight: '1rem' }],
        xs:    ['0.75rem',  { lineHeight: '1.1rem' }],
        sm:    ['0.875rem', { lineHeight: '1.4rem' }],
        base:  ['1rem',     { lineHeight: '1.6rem' }],
        md:    ['1.125rem', { lineHeight: '1.6rem' }],
        lg:    ['1.25rem',  { lineHeight: '1.5rem' }],
        xl:    ['1.5rem',   { lineHeight: '1.35rem' }],
        '2xl': ['1.875rem', { lineHeight: '1.2rem' }],
        '3xl': ['2.25rem',  { lineHeight: '1.15rem' }],
        '4xl': ['3rem',     { lineHeight: '1.1rem' }],
        '5xl': ['3.75rem',  { lineHeight: '1.05rem' }],
        '6xl': ['4.5rem',   { lineHeight: '1rem' }],
      },

      /* ── Letter spacing ──────────────────────────────── */
      letterSpacing: {
        tighter: '-0.03em',
        tight:   '-0.015em',
        normal:  '0em',
        wide:    '0.04em',
        wider:   '0.08em',
        widest:  '0.12em',
      },

      /* ── Border radius ───────────────────────────────── */
      borderRadius: {
        sm:   '4px',
        md:   '8px',
        lg:   '12px',
        xl:   '16px',
        '2xl':'24px',
        full: '9999px',
      },

      /* ── Box shadow ──────────────────────────────────── */
      boxShadow: {
        sm:     '0 1px 3px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.3)',
        md:     '0 4px 12px rgba(0,0,0,0.4), 0 2px 4px rgba(0,0,0,0.3)',
        lg:     '0 10px 30px rgba(0,0,0,0.5), 0 4px 8px rgba(0,0,0,0.3)',
        xl:     '0 20px 60px rgba(0,0,0,0.6)',
        accent: '0 0 24px rgba(59,123,248,0.30), 0 4px 12px rgba(0,0,0,0.4)',
        inset:  'inset 0 1px 0 rgba(255,255,255,0.06)',
        'notif-badge': '0 0 0 2px #0D0F14',
      },

      /* ── Backdrop blur ───────────────────────────────── */
      backdropBlur: {
        navbar: '16px',
      },

      /* ── Height ──────────────────────────────────────── */
      height: {
        navbar: '64px',
      },

      /* ── Width ───────────────────────────────────────── */
      width: {
        sidebar: '260px',
      },

      /* ── Keyframes & animation ───────────────────────── */
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        'slide-left': {
          from: { opacity: '0', transform: 'translateX(-20px)' },
          to:   { opacity: '1', transform: 'translateX(0)' },
        },
        'dropdown-in': {
          from: { opacity: '0', transform: 'translateY(-8px) scale(0.98)' },
          to:   { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-600px 0' },
          '100%': { backgroundPosition:  '600px 0' },
        },
      },
      animation: {
        'fade-up':    'fade-up 350ms cubic-bezier(0.16,1,0.3,1) both',
        'fade-in':    'fade-in 350ms cubic-bezier(0.16,1,0.3,1) both',
        'slide-left': 'slide-left 350ms cubic-bezier(0.16,1,0.3,1) both',
        'dropdown-in':'dropdown-in 200ms cubic-bezier(0.16,1,0.3,1) both',
        shimmer:      'shimmer 1.4s ease-in-out infinite',
      },

      /* ── Transition timing ───────────────────────────── */
      transitionTimingFunction: {
        'ease-spring': 'cubic-bezier(0.34,1.56,0.64,1)',
        'ease-out-expo': 'cubic-bezier(0.16,1,0.3,1)',
      },
    },
  },
  plugins: [],
};