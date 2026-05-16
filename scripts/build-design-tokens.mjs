/**
 * Figma variable export → theme.css, theme.js, tailwind.config.js
 * Run: node scripts/build-design-tokens.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

/** Raw keys from Figma MCP get_variable_defs (Color + Typography + section merge) */
const RAW = {
  'var(--sds-size-radius-400)': '16',
  'var(--sds-size-stroke-border)': '1',
  'var(--sds-color-background-default-default)': '#ffffff',
  'var(--sds-color-border-utilities-swatch)': '#0000003d',
  'var(--sds-size-depth-0)': '0',
  'var(--sds-color-black-100)': '#0c0c0d0d',
  'var(--sds-size-depth-025)': '1',
  'var(--sds-size-depth-100)': '4',
  'var(--sds-color-black-200)': '#0c0c0d1a',
  'var(--sds-color-border-default-default)': '#d9d9d9',
  'var(--sds-color-background-default-default-hover)': '#f5f5f5',
  'var(--sds-color-background-default-secondary)': '#f5f5f5',
  'var(--sds-color-background-default-secondary-hover)': '#e6e6e6',
  'var(--sds-color-background-default-tertiary)': '#d9d9d9',
  'var(--sds-color-background-default-tertiary-hover)': '#b3b3b3',
  'var(--sds-color-background-disabled-default)': '#d9d9d9',
  'var(--sds-color-background-brand-default)': '#2c2c2c',
  'var(--sds-color-background-brand-hover)': '#1e1e1e',
  'var(--sds-color-background-brand-secondary)': '#e6e6e6',
  'var(--sds-color-background-brand-secondary-hover)': '#d9d9d9',
  'var(--sds-color-background-neutral-default)': '#5a5a5a',
  'var(--sds-color-background-neutral-hover)': '#434343',
  'var(--sds-color-background-neutral-secondary)': '#cdcdcd',
  'var(--sds-color-background-neutral-secondary-hover)': '#b2b2b2',
  'var(--sds-color-background-neutral-tertiary)': '#e3e3e3',
  'var(--sds-color-background-neutral-tertiary-hover)': '#cdcdcd',
  'var(--sds-color-background-positive-default)': '#14ae5c',
  'var(--sds-color-background-positive-hover)': '#009951',
  'var(--sds-color-background-positive-secondary)': '#cff7d3',
  'var(--sds-color-background-positive-secondary-hover)': '#aff4c6',
  'var(--sds-color-background-positive-tertiary)': '#ebffee',
  'var(--sds-color-background-positive-tertiary-hover)': '#cff7d3',
  'var(--sds-color-background-warning-default)': '#e8b931',
  'var(--sds-color-background-warning-hover)': '#e5a000',
  'var(--sds-color-background-warning-secondary)': '#fff1c2',
  'var(--sds-color-background-warning-tertiary)': '#fffbeb',
  'var(--sds-color-background-warning-tertiary-hover)': '#fff1c2',
  'var(--sds-color-background-danger-default)': '#ec221f',
  'var(--sds-color-background-danger-hover)': '#c00f0c',
  'var(--sds-color-background-danger-secondary)': '#fdd3d0',
  'var(--sds-color-background-danger-secondary-hover)': '#fcb3ad',
  'var(--sds-color-background-danger-tertiary)': '#fee9e7',
  'var(--sds-color-background-danger-tertiary-hover)': '#fdd3d0',
  'var(--sds-color-text-neutral-on-neutral-tertiary)': '#434343',
  'var(--sds-typography-scale-03)': '16',
  'var(--sds-typography-family-mono)': 'Roboto Mono',
  'var(--sds-typography-weight-regular)': '400',
  'var(--sds-size-space-200)': '8',
  'var(--sds-size-space-100)': '4',
  'var(--sds-size-radius-200)': '8',
  'var(--sds-color-border-neutral-tertiary)': '#b2b2b2',
  'var(--sds-color-text-neutral-on-neutral-secondary)': '#303030',
  'var(--sds-color-background-utilities-scrim)': '#ffffffcc',
  'var(--sds-color-background-utilities-blanket)': '#000000b2',
  'var(--sds-color-background-utilities-overlay)': '#00000080',
  'var(--sds-size-radius-xl)': '24',
  'var(--sds-color-icon-warning-on-warning-secondary)': '#682d03',
  'var(--sds-color-text-warning-on-warning-secondary)': '#682d03',
  'var(--sds-size-space-300)': '12',
  'var(--sds-size-space-400)': '16',
  'var(--sds-color-border-warning-default)': '#522504',
  'var(--sds-size-icon-small)': '24',
  'var(--sds-size-radius-full)': '9999',
  'var(--sds-color-text-warning-on-warning-tertiary)': '#522504',
  'var(--sds-typography-weight-bold)': '700',
  'var(--sds-size-depth-negative-025)': '-1',
  'var(--sds-color-border-default-secondary)': '#757575',
  'var(--sds-color-border-default-tertiary)': '#383838',
  'var(--sds-color-border-disabled-default)': '#b3b3b3',
  'var(--sds-color-border-brand-default)': '#2c2c2c',
  'var(--sds-color-border-brand-secondary)': '#444444',
  'var(--sds-color-border-brand-tertiary)': '#757575',
  'var(--sds-color-border-neutral-default)': '#303030',
  'var(--sds-color-border-neutral-secondary)': '#767676',
  'var(--sds-color-border-positive-default)': '#02542d',
  'var(--sds-color-border-positive-secondary)': '#009951',
  'var(--sds-color-border-positive-tertiary)': '#14ae5c',
  'var(--sds-color-border-warning-secondary)': '#975102',
  'var(--sds-color-border-warning-tertiary)': '#bf6a02',
  'var(--sds-color-border-danger-default)': '#900b09',
  'var(--sds-color-border-danger-secondary)': '#c00f0c',
  'var(--sds-color-border-danger-tertiary)': '#ec221f',
  'var(--sds-color-text-default-default)': '#1e1e1e',
  'var(--sds-color-text-default-secondary)': '#757575',
  'var(--sds-color-text-default-tertiary)': '#b3b3b3',
  'var(--sds-color-text-disabled-default)': '#b3b3b3',
  'var(--sds-color-text-disabled-on-disabled)': '#b3b3b3',
  'var(--sds-color-text-brand-default)': '#2c2c2c',
  'var(--sds-color-text-brand-secondary)': '#444444',
  'var(--sds-color-text-brand-tertiary)': '#757575',
  'var(--sds-color-text-brand-on-brand)': '#f5f5f5',
  'var(--sds-color-text-brand-on-brand-secondary)': '#1e1e1e',
  'var(--sds-color-text-brand-on-brand-tertiary)': '#2c2c2c',
  'var(--sds-color-text-neutral-default)': '#303030',
  'var(--sds-color-text-neutral-secondary)': '#5a5a5a',
  'var(--sds-color-text-neutral-tertiary)': '#767676',
  'var(--sds-color-text-neutral-on-neutral)': '#f3f3f3',
  'var(--sds-color-text-danger-default)': '#900b09',
  'var(--sds-color-text-danger-secondary)': '#c00f0c',
  'var(--sds-color-text-danger-tertiary)': '#ec221f',
  'var(--sds-color-text-danger-on-danger)': '#fee9e7',
  'var(--sds-color-text-danger-on-danger-secondary)': '#900b09',
  'var(--sds-color-text-danger-on-danger-tertiary)': '#900b09',
  'var(--sds-color-text-warning-default)': '#522504',
  'var(--sds-color-text-warning-secondary)': '#975102',
  'var(--sds-color-text-warning-tertiary)': '#bf6a02',
  'var(--sds-color-text-warning-on-warning)': '#401b01',
  'var(--sds-color-text-positive-default)': '#02542d',
  'var(--sds-color-text-positive-secondary)': '#009951',
  'var(--sds-color-text-positive-tertiary)': '#14ae5c',
  'var(--sds-color-text-positive-on-positive)': '#ebffee',
  'var(--sds-color-text-positive-on-positive-secondary)': '#02542d',
  'var(--sds-color-text-positive-on-positive-tertiary)': '#02542d',
  'var(--sds-color-icon-default-default)': '#1e1e1e',
  'var(--sds-color-icon-default-secondary)': '#757575',
  'var(--sds-color-icon-default-tertiary)': '#b3b3b3',
  'var(--sds-color-icon-disabled-default)': '#b3b3b3',
  'var(--sds-color-icon-brand-default)': '#2c2c2c',
  'var(--sds-color-icon-brand-secondary)': '#444444',
  'var(--sds-color-icon-brand-on-brand-tertiary)': '#2c2c2c',
  'var(--sds-color-icon-brand-on-brand)': '#f5f5f5',
  'var(--sds-color-icon-brand-on-brand-secondary)': '#1e1e1e',
  'var(--sds-color-icon-neutral-default)': '#303030',
  'var(--sds-color-icon-neutral-secondary)': '#5a5a5a',
  'var(--sds-color-icon-neutral-tertiary)': '#767676',
  'var(--sds-color-icon-neutral-on-neutral)': '#f3f3f3',
  'var(--sds-color-icon-neutral-on-neutral-secondary)': '#303030',
  'var(--sds-color-icon-neutral-on-neutral-tertiary)': '#434343',
  'var(--sds-color-icon-positive-default)': '#02542d',
  'var(--sds-color-icon-positive-secondary)': '#009951',
  'var(--sds-color-icon-positive-tertiary)': '#14ae5c',
  'var(--sds-color-icon-positive-on-positive)': '#ebffee',
  'var(--sds-color-icon-positive-on-positive-secondary)': '#02542d',
  'var(--sds-color-icon-positive-on-positive-tertiary)': '#024023',
  'var(--sds-color-icon-warning-default)': '#522504',
  'var(--sds-color-icon-warning-secondary)': '#975102',
  'var(--sds-color-icon-warning-tertiary)': '#bf6a02',
  'var(--sds-color-icon-warning-on-warning)': '#401b01',
  'var(--sds-color-icon-warning-on-warning-tertiary)': '#522504',
  'var(--sds-color-icon-danger-default)': '#900b09',
  'var(--sds-color-icon-danger-secondary)': '#c00f0c',
  'var(--sds-color-icon-danger-tertiary)': '#ec221f',
  'var(--sds-color-icon-danger-on-danger)': '#fee9e7',
  'var(--sds-color-icon-danger-on-danger-secondary)': '#900b09',
  'var(--sds-color-icon-danger-on-danger-tertiary)': '#900b09',
  'var(--sds-typography-title-hero-size)': '72',
  'var(--sds-typography-title-hero-font-family)': 'Inter',
  'var(--sds-typography-title-hero-font-weight)': '700',
  'var(--sds-typography-title-page-size-base)': '48',
  'var(--sds-typography-title-page-font-family)': 'Inter',
  'var(--sds-typography-title-page-font-weight)': '700',
  'var(--sds-typography-subtitle-size-base)': '32',
  'var(--sds-typography-subtitle-font-family)': 'Inter',
  'var(--sds-typography-subtitle-font-weight)': '400',
  'var(--sds-typography-heading-size-base)': '24',
  'var(--sds-typography-heading-font-family)': 'Inter',
  'var(--sds-typography-heading-font-weight)': '600',
  'var(--sds-typography-subheading-size-medium)': '20',
  'var(--sds-typography-subheading-font-family)': 'Inter',
  'var(--sds-typography-subheading-font-weight)': '400',
  'var(--sds-typography-body-size-medium)': '16',
  'var(--sds-typography-body-font-family)': 'Inter',
  'var(--sds-typography-body-font-weight-regular)': '400',
  'var(--sds-typography-body-font-weight-strong)': '600',
  'var(--sds-typography-body-font-style-italic)': 'italic',
  'var(--sds-typography-body-size-small)': '14',
  'var(--sds-typography-code-size-base)': '16',
  'var(--sds-typography-code-font-family)': 'Roboto Mono',
  'var(--sds-typography-code-font-weight)': '400',
  'var(--sds-size-padding-xl)': '24',
  'var(--sds-size-space-800)': '32',
  'var(--sds-size-space-1600)': '64',
  'var(--sds-size-radius-100)': '4',
  'var(--sds-size-space-600)': '24',
  'var(--sds-color-background-utilities-measurement)': '#fae1fa',
  'var(--sds-size-space-negative-100)': '-4',
  'var(--sds-size-space-negative-200)': '-8',
  'var(--sds-size-space-negative-300)': '-12',
  'var(--sds-size-space-negative-400)': '-16',
  'var(--sds-size-space-negative-600)': '-24',
  'var(--sds-size-space-2400)': '96',
  'var(--sds-size-space-4000)': '160',
};

function varKey(k) {
  const m = /^var\((--[^)]+)\)$/.exec(k);
  return m ? m[1] : null;
}

function isColorValue(v) {
  return /^#[0-9a-f]{3,8}$/i.test(v);
}

function isNumberString(v) {
  return /^-?\d+(\.\d+)?$/.test(v);
}

function cssFontStack(name) {
  const parts = name.split(',').map((s) => s.trim());
  return parts.map((p) => (/\s/.test(p) ? `"${p}"` : p)).join(', ');
}

function resolveCssValue(name, raw) {
  if (name.includes('font-style')) {
    const s = String(raw).toLowerCase();
    return s === 'italic' ? 'italic' : s;
  }
  if (
    name.includes('font-weight') ||
    name.includes('typography-weight-') ||
    /-weight$/.test(name)
  ) {
    return String(raw);
  }
  if (name.includes('font-family') || name.endsWith('family-mono')) {
    return cssFontStack(raw);
  }
  if (name.startsWith('--sds-color-') && isColorValue(raw)) return raw;
  if (name.startsWith('--sds-color-')) return raw.startsWith('#') ? raw : `#${raw}`;
  if (isColorValue(raw)) return raw;
  if (isNumberString(raw)) {
    return `${raw}px`;
  }
  return raw;
}

/** Fix typo in source */
function sanitizeRaw(raw) {
  if (raw === '##5a5a5a') return '#5a5a5a';
  return raw;
}

const resolved = {};
for (const [k, v] of Object.entries(RAW)) {
  const name = varKey(k);
  if (!name) continue;
  resolved[name] = resolveCssValue(name, sanitizeRaw(v));
}

/** theme.css */
const cssBlocks = [
  '/**',
  ' * SDS(Figma 변수) — 색·숫자 원본은 이 파일에만 둡니다.',
  ' * Tailwind·theme.js·UI 코드는 var(--sds-*) 로 참조하세요.',
  ' * 재생성: npm run tokens',
  ' */',
  ':root {',
];
for (const name of Object.keys(resolved).sort()) {
  cssBlocks.push(`  ${name}: ${resolved[name]};`);
}
cssBlocks.push(`}`);
fs.writeFileSync(path.join(root, 'theme.css'), cssBlocks.join('\n') + '\n');

/** var() helper + grouped export for JS */
const v = (name) => `var(${name})`;

const colors = {};
const space = {};
const radius = {};
const fontSize = {};
const fontFamily = {};
const fontWeight = {};
const sizeMisc = {};

for (const name of Object.keys(resolved)) {
  const ref = v(name);
  if (name.startsWith('--sds-color-')) {
    colors[name.replace('--sds-color-', '').replace(/-/g, '-')] = ref;
    continue;
  }
  if (name.startsWith('--sds-size-space-')) {
    const key = name.replace('--sds-size-space-', '');
    space[key] = ref;
    continue;
  }
  if (name.startsWith('--sds-size-radius-')) {
    const key = name.replace('--sds-size-radius-', '');
    radius[key] = ref;
    continue;
  }
  if (
    name.startsWith('--sds-typography-') &&
    (name.includes('size') || name.includes('scale-'))
  ) {
    const key = name.replace('--sds-typography-', '');
    fontSize[key] = ref;
    continue;
  }
  if (
    name.includes('typography') &&
    (name.includes('font-family') || name.endsWith('family-mono'))
  ) {
    const key = name.replace('--sds-typography-', '');
    fontFamily[key] = ref;
    continue;
  }
  if (
    name.includes('typography') &&
    (name.includes('font-weight') || name.includes('typography-weight'))
  ) {
    const key = name.replace('--sds-typography-', '');
    fontWeight[key] = ref;
    continue;
  }
  if (
    name.startsWith('--sds-size-') ||
    name.startsWith('--sds-typography-')
  ) {
    const short = name.replace('--sds-', '').replace(/-/g, '-');
    sizeMisc[short] = ref;
  }
}

const themeJs = `/**
 * SDS 디자인 토큰 — 값은 theme.css의 CSS 변수와 동기화됩니다.
 * Tailwind에서는 tailwind.config.js가 var(--sds-*)를 참조합니다.
 */

/** @param {string} name CSS 변수 이름 (예: '--sds-color-text-default-default') */
export function cssVar(name) {
  return \`var(\${name})\`;
}

export const tokens = ${JSON.stringify(
  Object.fromEntries(Object.keys(resolved).map((n) => [n, v(n)])),
  null,
  2
)};

export const groups = {
  colors: ${JSON.stringify(colors, null, 2)},
  space: ${JSON.stringify(space, null, 2)},
  radius: ${JSON.stringify(radius, null, 2)},
  fontSize: ${JSON.stringify(fontSize, null, 2)},
  fontFamily: ${JSON.stringify(fontFamily, null, 2)},
  fontWeight: ${JSON.stringify(fontWeight, null, 2)},
  size: ${JSON.stringify(sizeMisc, null, 2)},
};
`;

fs.writeFileSync(path.join(root, 'theme.js'), themeJs);

function tailwindFontSizeMap() {
  const lh = { lineHeight: '1.2', letterSpacing: '0' };
  return {
    'title-hero': [v('--sds-typography-title-hero-size'), lh],
    'title-page': [v('--sds-typography-title-page-size-base'), lh],
    subtitle: [v('--sds-typography-subtitle-size-base'), lh],
    heading: [v('--sds-typography-heading-size-base'), lh],
    'subheading-medium': [v('--sds-typography-subheading-size-medium'), lh],
    'body-medium': [v('--sds-typography-body-size-medium'), lh],
    'body-small': [v('--sds-typography-body-size-small'), lh],
    code: [v('--sds-typography-code-size-base'), lh],
    'scale-03': [v('--sds-typography-scale-03'), lh],
  };
}

/** Tailwind: flatten color keys for valid identifiers */
function tailwindColorMap() {
  const out = {};
  for (const name of Object.keys(resolved)) {
    if (!name.startsWith('--sds-color-')) continue;
    const tail = name.slice('--sds-color-'.length);
    const key = tail.split('-').join('-');
    out[key] = v(name);
  }
  return out;
}

function tailwindSpaceMap() {
  const out = {};
  for (const name of Object.keys(resolved)) {
    if (!name.startsWith('--sds-size-space-')) continue;
    let key = name.slice('--sds-size-space-'.length);
    if (key.startsWith('negative-')) {
      key = `-${key.replace('negative-', '')}`;
    }
    out[key] = v(name);
  }
  if (resolved['--sds-size-padding-xl']) {
    out['padding-xl'] = v('--sds-size-padding-xl');
  }
  return out;
}

function tailwindRadiusMap() {
  const out = {};
  for (const name of Object.keys(resolved)) {
    if (!name.startsWith('--sds-size-radius-')) continue;
    const key = name.slice('--sds-size-radius-'.length);
    out[key] = v(name);
  }
  return out;
}

function tailwindFontFamilyMap() {
  const out = {};
  for (const name of Object.keys(resolved)) {
    if (!name.includes('font-family')) continue;
    const key = name
      .replace('--sds-typography-', '')
      .replace('-font-family', '')
      .replace('title-hero', 'title-hero')
      .replace('title-page', 'title-page')
      .replace('subtitle', 'subtitle')
      .replace('heading', 'heading')
      .replace('subheading', 'subheading')
      .replace('body', 'body')
      .replace('code', 'code');
    out[key.replace(/-+/g, '-').replace(/^-|-$/g, '')] = [v(name), {}];
  }
  if (resolved['--sds-typography-family-mono']) {
    out.mono = [v('--sds-typography-family-mono'), {}];
  }
  return out;
}

function tailwindFontWeightMap() {
  const out = {};
  for (const name of Object.keys(resolved)) {
    if (
      !(
        name.includes('font-weight') ||
        name.includes('--sds-typography-weight-')
      )
    )
      continue;
    const rawKey = name
      .replace('--sds-typography-', '')
      .replace(/-/g, '-');
    const key = rawKey
      .replace('body-font-weight-', 'body-')
      .replace('title-hero-font-weight', 'title-hero')
      .replace('title-page-font-weight', 'title-page')
      .replace('subtitle-font-weight', 'subtitle')
      .replace('heading-font-weight', 'heading')
      .replace('subheading-font-weight', 'subheading')
      .replace('code-font-weight', 'code')
      .replace('weight-bold', 'bold')
      .replace('weight-regular', 'regular');
    out[key.replace(/-+/g, '-').replace(/^-|-$/g, '')] = v(name);
  }
  return out;
}

const twConfig = `/**
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
`;

const preset = {
  colors: tailwindColorMap(),
  spacing: tailwindSpaceMap(),
  borderRadius: tailwindRadiusMap(),
  fontSize: tailwindFontSizeMap(),
  fontFamily: tailwindFontFamilyMap(),
  fontWeight: tailwindFontWeightMap(),
  borderWidth: {
    DEFAULT: v('--sds-size-stroke-border'),
    border: v('--sds-size-stroke-border'),
  },
  width: {
    'icon-sm': v('--sds-size-icon-small'),
  },
  height: {
    'icon-sm': v('--sds-size-icon-small'),
  },
};

const presetJs = `/** @type {import('tailwindcss').Config['theme']['extend']} */
export default ${JSON.stringify(preset, null, 2)};
`;

fs.writeFileSync(path.join(root, 'tailwind.config.js'), twConfig);
fs.writeFileSync(path.join(root, 'tailwind.theme-preset.js'), presetJs);

console.log('Wrote theme.css, theme.js, tailwind.config.js, tailwind.theme-preset.js');
