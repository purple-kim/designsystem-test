/**
 * Tailwind — 색·간격·타이포는 모두 var(--sds-*)만 사용합니다. 실제 값은 theme.css.
 */
import themePreset from './tailwind.theme-preset.js';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}'],
  theme: {
    extend: themePreset,
  },
  plugins: [],
};
