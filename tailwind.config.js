/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: '#2D7A3A',
          'green-light': '#4CAF50',
          'green-pale': '#E8F5E9',
          red: '#C0392B',
          'red-light': '#E74C3C',
          'red-pale': '#FDECEA',
          'deep-blue': '#1A3A5C',
          'warm-orange': '#E67E22',
          'soft-gold': '#D4AF37',
          cream: '#FEFCF7',
        },
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        heading: ['var(--font-dm-serif)', 'Georgia', 'serif'],
        body: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
      },
      boxShadow: {
        card: '0 4px 16px rgba(0,0,0,0.08)',
        hover: '0 12px 32px rgba(0,0,0,0.12)',
        premium: '0 20px 60px rgba(45,122,58,0.15)',
        'green-glow': '0 0 40px rgba(45,122,58,0.2)',
      },
      borderRadius: {
        '2xl': '20px',
        '3xl': '28px',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-16px)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backgroundImage: {
        'green-radial': 'radial-gradient(circle at 30% 20%, rgba(45,122,58,0.08) 0%, transparent 60%)',
        'cream-gradient': 'linear-gradient(135deg, #FEFCF7 0%, #F9FAFB 100%)',
        'hero-gradient': 'linear-gradient(135deg, #F9FAFB 0%, #E8F5E9 50%, #FEFCF7 100%)',
      },
    },
  },
  plugins: [],
};
