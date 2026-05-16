import { useState, type ReactNode } from 'react';
import {
  Button,
  ButtonDanger,
  ButtonGroup,
  CardGridIcon,
  Footer,
  Header,
  IconButton,
  InputField,
  PlaceholderIcon,
} from './components';
import { LandingPage } from './pages/LandingPage';

// ─── Tab types ────────────────────────────────────────────────────
type Tab = 'landing' | 'components' | 'colors' | 'typography' | 'spacing';

// ─── Shared layout helpers ────────────────────────────────────────
function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="mb-400 border-b border-border-default-default pb-200 font-heading text-heading text-text-default-default">
      {children}
    </h2>
  );
}

function SubTitle({ children }: { children: ReactNode }) {
  return (
    <h3 className="mb-200 font-body-strong text-body-medium text-text-default-secondary">
      {children}
    </h3>
  );
}

function DemoBlock({ title, children, fullWidth }: { title: string; children: ReactNode; fullWidth?: boolean }) {
  return (
    <div className={`mb-600 rounded-200 border border-border-default-default bg-background-default-secondary p-400 ${fullWidth ? 'overflow-auto' : ''}`}>
      <p className="mb-300 font-body-small text-body-small text-text-default-secondary">{title}</p>
      {children}
    </div>
  );
}

// ─── Tab navigation ───────────────────────────────────────────────
function TabBar({ active, onChange }: { active: Tab; onChange: (t: Tab) => void }) {
  const tabs: { id: Tab; label: string }[] = [
    { id: 'landing', label: '🏠 Landing Page' },
    { id: 'components', label: 'Components' },
    { id: 'colors', label: 'Colors' },
    { id: 'typography', label: 'Typography' },
    { id: 'spacing', label: 'Spacing & Radius' },
  ];
  return (
    <nav className="flex gap-0 border-b border-border-default-default">
      {tabs.map((t) => (
        <button
          key={t.id}
          type="button"
          onClick={() => onChange(t.id)}
          className={[
            'px-400 py-300 font-body-medium text-body-medium transition-colors',
            active === t.id
              ? '-mb-px border-b-2 border-border-brand-default text-text-default-default'
              : 'text-text-default-secondary hover:text-text-default-default',
          ].join(' ')}
        >
          {t.label}
        </button>
      ))}
    </nav>
  );
}

// ═══════════════════════════════════════════════════════════════════
// COMPONENTS TAB
// ═══════════════════════════════════════════════════════════════════
function ComponentsTab({
  mobileOpen,
  setMobileOpen,
}: {
  mobileOpen: boolean;
  setMobileOpen: (v: boolean) => void;
}) {
  return (
    <div className="space-y-1600">
      {/* Button */}
      <section className="space-y-400">
        <SectionTitle>Button</SectionTitle>
        <DemoBlock title="variant: primary · neutral · subtle  ×  size: medium · small  ×  states">
          <div className="flex flex-col gap-400">
            {(['primary', 'neutral', 'subtle'] as const).map((v) => (
              <div key={v} className="flex flex-col gap-200">
                <span className="font-body-small text-body-small text-text-default-tertiary uppercase tracking-wide">
                  {v}
                </span>
                <div className="flex flex-wrap items-center gap-200">
                  <Button variant={v} size="medium" label="Medium" />
                  <Button variant={v} size="medium" disabled label="Disabled" />
                  <Button variant={v} size="medium" label="With Icon" icon={<PlaceholderIcon />} />
                  <Button variant={v} size="small" label="Small" />
                  <Button variant={v} size="small" disabled label="Off" />
                </div>
              </div>
            ))}
          </div>
        </DemoBlock>
        <DemoBlock title="Props interface">
          <table className="w-full border-collapse text-body-small">
            <thead>
              <tr className="border-b border-border-default-default text-left text-text-default-secondary">
                <th className="py-200 pr-400">Prop</th>
                <th className="py-200 pr-400">Type</th>
                <th className="py-200">Default</th>
              </tr>
            </thead>
            <tbody className="text-text-default-default">
              {[
                ['variant', "'primary' | 'neutral' | 'subtle'", "'primary'"],
                ['size', "'medium' | 'small'", "'medium'"],
                ['label', 'ReactNode', '—'],
                ['icon', 'ReactNode', '—'],
                ['disabled', 'boolean', 'false'],
              ].map(([prop, type, def]) => (
                <tr key={prop} className="border-b border-border-default-default last:border-0">
                  <td className="py-200 pr-400 font-mono text-[13px] text-text-brand-default">{prop}</td>
                  <td className="py-200 pr-400 font-mono text-[13px] text-text-default-secondary">{type}</td>
                  <td className="py-200 font-mono text-[13px]">{def}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </DemoBlock>
      </section>

      {/* Icon Button */}
      <section className="space-y-400">
        <SectionTitle>Icon Button</SectionTitle>
        <DemoBlock title="variant × size × disabled — label은 접근성 전용">
          <div className="flex flex-wrap items-center gap-400">
            {(['primary', 'neutral', 'subtle'] as const).map((v) => (
              <div key={v} className="flex flex-col items-center gap-200">
                <span className="font-body-small text-body-small text-text-default-tertiary">{v}</span>
                <div className="flex items-center gap-200">
                  <IconButton variant={v} size="medium" label={`${v} md`} icon={<PlaceholderIcon />} />
                  <IconButton variant={v} size="small" label={`${v} sm`} icon={<PlaceholderIcon />} />
                  <IconButton variant={v} size="medium" label={`${v} off`} icon={<PlaceholderIcon />} disabled />
                </div>
              </div>
            ))}
          </div>
        </DemoBlock>
      </section>

      {/* Button Danger */}
      <section className="space-y-400">
        <SectionTitle>Button Danger</SectionTitle>
        <DemoBlock title="variant: primary · subtle  ×  size · icon · disabled">
          <div className="flex flex-wrap gap-300">
            <ButtonDanger variant="primary" label="삭제" />
            <ButtonDanger variant="primary" size="small" label="삭제" />
            <ButtonDanger variant="subtle" label="취소" />
            <ButtonDanger variant="primary" disabled label="비활성" />
            <ButtonDanger variant="primary" label="경고" icon={<PlaceholderIcon />} />
          </div>
        </DemoBlock>
      </section>

      {/* Input Field */}
      <section className="space-y-400">
        <SectionTitle>Input Field</SectionTitle>
        <DemoBlock title="label · placeholder · icon · error · disabled">
          <div className="flex flex-col flex-wrap gap-400 md:flex-row">
            <InputField label="기본" placeholder="Placeholder" />
            <InputField label="값 있음" defaultValue="입력된 텍스트" />
            <InputField label="에러" placeholder="Error" error defaultValue="잘못된 입력" />
            <InputField label="비활성" placeholder="Disabled" disabled />
            <InputField label="아이콘" placeholder="검색어 입력" icon={<PlaceholderIcon />} />
          </div>
        </DemoBlock>
      </section>

      {/* Button Group */}
      <section className="space-y-400">
        <SectionTitle>Button Group</SectionTitle>
        <DemoBlock title="align: start · end · center · justify · stack">
          {(['start', 'end', 'center', 'justify', 'stack'] as const).map((align) => (
            <div key={align} className="mb-300 flex items-center gap-400">
              <span className="w-[60px] shrink-0 font-body-small text-body-small text-text-default-tertiary">
                {align}
              </span>
              <div className="flex-1">
                <ButtonGroup align={align}>
                  <Button variant="primary" label="A" />
                  <Button variant="neutral" label="B" />
                  <Button variant="subtle" label="C" />
                </ButtonGroup>
              </div>
            </div>
          ))}
        </DemoBlock>
      </section>

      {/* Header */}
      <section className="space-y-400">
        <SectionTitle>Header</SectionTitle>
        <DemoBlock title="platform=desktop">
          <Header
            platform="desktop"
            logo={
              <span className="font-body-strong text-body-medium text-text-brand-default">Logo</span>
            }
            nav={
              <>
                <a href="#a" className="font-body-medium text-body-medium text-text-default-secondary hover:text-text-brand-default">메뉴 A</a>
                <a href="#b" className="font-body-medium text-body-medium text-text-default-secondary hover:text-text-brand-default">메뉴 B</a>
              </>
            }
          />
        </DemoBlock>
        <DemoBlock title="platform=mobile · open 토글">
          <Header
            platform="mobile"
            open={mobileOpen}
            logo={<span className="font-body-strong text-body-medium">Logo</span>}
            menuToggle={
              <Button
                variant="subtle"
                size="small"
                label={mobileOpen ? '닫기' : '메뉴'}
                onClick={() => setMobileOpen(!mobileOpen)}
              />
            }
            nav={
              <>
                <a href="#m1" className="font-body-medium text-body-medium text-text-default-secondary">모바일 링크 1</a>
                <a href="#m2" className="font-body-medium text-body-medium text-text-default-secondary">모바일 링크 2</a>
              </>
            }
          />
        </DemoBlock>
      </section>

      {/* Footer */}
      <section className="space-y-400">
        <SectionTitle>Footer</SectionTitle>
        <DemoBlock title="platform=desktop">
          <Footer
            platform="desktop"
            top={<span className="font-body-medium text-body-medium">뉴스레터 배너 자리</span>}
            columns={
              <>
                {['Col 1', 'Col 2', 'Col 3', 'Col 4'].map((c) => (
                  <div key={c}>
                    <p className="font-body-strong text-body-medium">{c}</p>
                    <p className="font-body-small text-body-small text-text-default-secondary">링크들</p>
                  </div>
                ))}
              </>
            }
            bottom="© 2026 · 토큰 기반 푸터"
          />
        </DemoBlock>
      </section>

      {/* Card Grid Icon */}
      <section className="space-y-400">
        <SectionTitle>Card Grid Icon</SectionTitle>
        <DemoBlock title="platform=desktop">
          <CardGridIcon
            platform="desktop"
            items={[
              { title: '카드 1', description: '설명 텍스트입니다', icon: <PlaceholderIcon /> },
              { title: '카드 2', description: '아이콘 + 타이틀', icon: <PlaceholderIcon /> },
              { title: '카드 3', icon: <PlaceholderIcon /> },
            ]}
          />
        </DemoBlock>
      </section>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// COLORS TAB
// ═══════════════════════════════════════════════════════════════════
function ColorSwatch({ token, label }: { token: string; label?: string }) {
  return (
    <div className="flex flex-col gap-100">
      <div
        className="h-10 rounded-100 border border-border-utilities-swatch"
        style={{ backgroundColor: `var(--sds-color-${token})` }}
        title={`var(--sds-color-${token})`}
      />
      <span className="font-mono text-[10px] leading-snug text-text-default-tertiary break-all">
        {label ?? token.split('-').slice(2).join('-')}
      </span>
    </div>
  );
}

function ColorRow({ name, tokens }: { name: string; tokens: string[] }) {
  return (
    <div className="mb-400">
      <SubTitle>{name}</SubTitle>
      <div className="grid gap-200" style={{ gridTemplateColumns: `repeat(${Math.min(tokens.length, 6)}, minmax(0, 1fr))` }}>
        {tokens.map((t) => (
          <ColorSwatch key={t} token={t} />
        ))}
      </div>
    </div>
  );
}

const COLOR_PALETTE: { category: string; groups: { name: string; tokens: string[] }[] }[] = [
  {
    category: 'Background',
    groups: [
      { name: 'Brand', tokens: ['background-brand-default', 'background-brand-hover', 'background-brand-secondary', 'background-brand-secondary-hover'] },
      { name: 'Neutral', tokens: ['background-neutral-default', 'background-neutral-hover', 'background-neutral-secondary', 'background-neutral-secondary-hover', 'background-neutral-tertiary', 'background-neutral-tertiary-hover'] },
      { name: 'Default (Gray)', tokens: ['background-default-default', 'background-default-default-hover', 'background-default-secondary', 'background-default-secondary-hover', 'background-default-tertiary', 'background-default-tertiary-hover'] },
      { name: 'Danger', tokens: ['background-danger-default', 'background-danger-hover', 'background-danger-secondary', 'background-danger-secondary-hover', 'background-danger-tertiary', 'background-danger-tertiary-hover'] },
      { name: 'Positive', tokens: ['background-positive-default', 'background-positive-hover', 'background-positive-secondary', 'background-positive-secondary-hover', 'background-positive-tertiary', 'background-positive-tertiary-hover'] },
      { name: 'Warning', tokens: ['background-warning-default', 'background-warning-hover', 'background-warning-secondary', 'background-warning-tertiary', 'background-warning-tertiary-hover'] },
      { name: 'Disabled', tokens: ['background-disabled-default'] },
      { name: 'Utilities', tokens: ['background-utilities-blanket', 'background-utilities-overlay', 'background-utilities-scrim', 'background-utilities-measurement'] },
    ],
  },
  {
    category: 'Text',
    groups: [
      { name: 'Brand', tokens: ['text-brand-default', 'text-brand-secondary', 'text-brand-tertiary', 'text-brand-on-brand', 'text-brand-on-brand-secondary', 'text-brand-on-brand-tertiary'] },
      { name: 'Neutral', tokens: ['text-neutral-default', 'text-neutral-secondary', 'text-neutral-tertiary', 'text-neutral-on-neutral', 'text-neutral-on-neutral-secondary', 'text-neutral-on-neutral-tertiary'] },
      { name: 'Default (Gray)', tokens: ['text-default-default', 'text-default-secondary', 'text-default-tertiary'] },
      { name: 'Danger', tokens: ['text-danger-default', 'text-danger-secondary', 'text-danger-tertiary', 'text-danger-on-danger', 'text-danger-on-danger-secondary', 'text-danger-on-danger-tertiary'] },
      { name: 'Positive', tokens: ['text-positive-default', 'text-positive-secondary', 'text-positive-tertiary', 'text-positive-on-positive', 'text-positive-on-positive-secondary', 'text-positive-on-positive-tertiary'] },
      { name: 'Warning', tokens: ['text-warning-default', 'text-warning-secondary', 'text-warning-tertiary', 'text-warning-on-warning', 'text-warning-on-warning-secondary', 'text-warning-on-warning-tertiary'] },
      { name: 'Disabled', tokens: ['text-disabled-default', 'text-disabled-on-disabled'] },
    ],
  },
  {
    category: 'Border',
    groups: [
      { name: 'Brand', tokens: ['border-brand-default', 'border-brand-secondary', 'border-brand-tertiary'] },
      { name: 'Neutral', tokens: ['border-neutral-default', 'border-neutral-secondary', 'border-neutral-tertiary'] },
      { name: 'Default (Gray)', tokens: ['border-default-default', 'border-default-secondary', 'border-default-tertiary'] },
      { name: 'Danger', tokens: ['border-danger-default', 'border-danger-secondary', 'border-danger-tertiary'] },
      { name: 'Positive', tokens: ['border-positive-default', 'border-positive-secondary', 'border-positive-tertiary'] },
      { name: 'Warning', tokens: ['border-warning-default', 'border-warning-secondary', 'border-warning-tertiary'] },
      { name: 'Disabled', tokens: ['border-disabled-default'] },
    ],
  },
  {
    category: 'Icon',
    groups: [
      { name: 'Brand', tokens: ['icon-brand-default', 'icon-brand-secondary', 'icon-brand-on-brand', 'icon-brand-on-brand-secondary', 'icon-brand-on-brand-tertiary'] },
      { name: 'Neutral', tokens: ['icon-neutral-default', 'icon-neutral-secondary', 'icon-neutral-tertiary', 'icon-neutral-on-neutral', 'icon-neutral-on-neutral-secondary', 'icon-neutral-on-neutral-tertiary'] },
      { name: 'Default (Gray)', tokens: ['icon-default-default', 'icon-default-secondary', 'icon-default-tertiary'] },
      { name: 'Danger', tokens: ['icon-danger-default', 'icon-danger-secondary', 'icon-danger-tertiary', 'icon-danger-on-danger', 'icon-danger-on-danger-secondary', 'icon-danger-on-danger-tertiary'] },
      { name: 'Positive', tokens: ['icon-positive-default', 'icon-positive-secondary', 'icon-positive-tertiary', 'icon-positive-on-positive', 'icon-positive-on-positive-secondary', 'icon-positive-on-positive-tertiary'] },
      { name: 'Warning', tokens: ['icon-warning-default', 'icon-warning-secondary', 'icon-warning-tertiary', 'icon-warning-on-warning', 'icon-warning-on-warning-secondary', 'icon-warning-on-warning-tertiary'] },
      { name: 'Disabled', tokens: ['icon-disabled-default'] },
    ],
  },
];

type ColorTab = 'background' | 'text' | 'border' | 'icon';

function ColorsTab() {
  const [colorTab, setColorTab] = useState<ColorTab>('background');
  const palette = COLOR_PALETTE.find(
    (p) => p.category.toLowerCase() === colorTab
  )!;

  return (
    <div className="space-y-800">
      <div>
        <p className="mb-400 font-body-medium text-body-medium text-text-default-secondary">
          모든 색상은 <code className="rounded-100 bg-background-default-tertiary px-100 font-mono text-[13px]">var(--sds-color-*)</code> CSS 변수로 정의되어 있습니다.
          스워치에 마우스를 올리면 변수 이름을 확인할 수 있습니다.
        </p>
        {/* Category tabs */}
        <div className="flex gap-0 rounded-200 border border-border-default-default p-100 w-fit">
          {(['background', 'text', 'border', 'icon'] as ColorTab[]).map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setColorTab(c)}
              className={[
                'rounded-100 px-300 py-100 font-body-small text-body-small capitalize transition-colors',
                colorTab === c
                  ? 'bg-background-brand-default text-text-brand-on-brand'
                  : 'text-text-default-secondary hover:text-text-default-default',
              ].join(' ')}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <section>
        <SectionTitle>{palette.category}</SectionTitle>
        {palette.groups.map((g) => (
          <ColorRow key={g.name} name={g.name} tokens={g.tokens} />
        ))}
      </section>

      {/* Semantic overview */}
      <section>
        <SectionTitle>Semantic overview</SectionTitle>
        <p className="mb-400 font-body-small text-body-small text-text-default-secondary">
          각 시맨틱 그룹의 핵심 배경 색상을 한눈에 봅니다.
        </p>
        <div className="grid grid-cols-2 gap-300 sm:grid-cols-3 md:grid-cols-6">
          {[
            { name: 'Brand', bg: 'background-brand-default', text: 'text-brand-on-brand' },
            { name: 'Neutral', bg: 'background-neutral-default', text: 'text-neutral-on-neutral' },
            { name: 'Default', bg: 'background-default-secondary', text: 'text-default-default' },
            { name: 'Danger', bg: 'background-danger-default', text: 'text-danger-on-danger' },
            { name: 'Positive', bg: 'background-positive-default', text: 'text-positive-on-positive' },
            { name: 'Warning', bg: 'background-warning-default', text: 'text-warning-on-warning' },
          ].map(({ name, bg, text }) => (
            <div
              key={name}
              className="flex h-24 flex-col items-center justify-center rounded-200 border border-border-utilities-swatch"
              style={{ backgroundColor: `var(--sds-color-${bg})` }}
            >
              <span
                className="font-body-strong text-body-small"
                style={{ color: `var(--sds-color-${text})` }}
              >
                {name}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// TYPOGRAPHY TAB
// ═══════════════════════════════════════════════════════════════════
const TYPE_SCALE: { label: string; cssVar: string; size: string; weight: string; family: string; className: string; weightClass: string }[] = [
  { label: 'Title Hero', cssVar: '--sds-typography-title-hero-*', size: '72px', weight: '700', family: 'Inter', className: 'text-title-hero', weightClass: 'font-title-hero' },
  { label: 'Title Page', cssVar: '--sds-typography-title-page-*', size: '48px', weight: '700', family: 'Inter', className: 'text-title-page', weightClass: 'font-title-page' },
  { label: 'Subtitle', cssVar: '--sds-typography-subtitle-*', size: '32px', weight: '400', family: 'Inter', className: 'text-subtitle', weightClass: 'font-subtitle' },
  { label: 'Heading', cssVar: '--sds-typography-heading-*', size: '24px', weight: '600', family: 'Inter', className: 'text-heading', weightClass: 'font-heading' },
  { label: 'Subheading', cssVar: '--sds-typography-subheading-*', size: '20px', weight: '400', family: 'Inter', className: 'text-subheading-medium', weightClass: 'font-subheading' },
  { label: 'Body Medium', cssVar: '--sds-typography-body-size-medium', size: '16px', weight: '400', family: 'Inter', className: 'text-body-medium', weightClass: '' },
  { label: 'Body Small', cssVar: '--sds-typography-body-size-small', size: '14px', weight: '400', family: 'Inter', className: 'text-body-small', weightClass: '' },
  { label: 'Code', cssVar: '--sds-typography-code-*', size: '16px', weight: '400', family: 'Roboto Mono', className: 'text-code', weightClass: 'font-code' },
];

const FONT_WEIGHTS: { label: string; cssVar: string; value: string; tokenKey: string }[] = [
  { label: 'Regular', cssVar: '--sds-typography-weight-regular', value: '400', tokenKey: 'font-regular' },
  { label: 'Body Regular', cssVar: '--sds-typography-body-font-weight-regular', value: '400', tokenKey: 'font-body-regular' },
  { label: 'Body Strong', cssVar: '--sds-typography-body-font-weight-strong', value: '600', tokenKey: 'font-body-strong' },
  { label: 'Bold', cssVar: '--sds-typography-weight-bold', value: '700', tokenKey: 'font-bold' },
];

function TypographyTab() {
  return (
    <div className="space-y-1600">
      {/* Type scale */}
      <section>
        <SectionTitle>Type Scale</SectionTitle>
        <div className="divide-y divide-border-default-default">
          {TYPE_SCALE.map((t) => (
            <div key={t.label} className="flex flex-col gap-100 py-400 md:flex-row md:items-baseline md:gap-400">
              <div className="w-[140px] shrink-0">
                <p className="font-body-small text-body-small text-text-default-tertiary">{t.label}</p>
                <p className="font-mono text-[10px] text-text-default-tertiary">{t.size} · {t.weight}w</p>
              </div>
              <div className="flex-1 overflow-hidden">
                <span
                  className={`${t.className} ${t.weightClass} text-text-default-default leading-tight`}
                  style={{ fontFamily: t.family === 'Roboto Mono' ? 'var(--sds-typography-code-font-family)' : undefined }}
                >
                  The quick brown fox
                </span>
              </div>
              <div className="shrink-0 text-right">
                <code className="font-mono text-[11px] text-text-default-secondary">{t.className}</code>
                {t.weightClass && (
                  <code className="ml-200 font-mono text-[11px] text-text-default-tertiary">{t.weightClass}</code>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Font families */}
      <section>
        <SectionTitle>Font Families</SectionTitle>
        <div className="grid gap-300 sm:grid-cols-2">
          {[
            { name: 'Inter (Sans)', var: '--sds-typography-body-font-family', tw: 'font-body', sample: 'ABCDEFG abcdefg 0123456789' },
            { name: 'Roboto Mono', var: '--sds-typography-code-font-family', tw: 'font-code', sample: 'ABCDEFG abcdefg 0123456789' },
          ].map((f) => (
            <div key={f.name} className="rounded-200 border border-border-default-default p-400">
              <p className="mb-100 font-body-small text-body-small text-text-default-secondary">{f.name}</p>
              <p
                className="mb-200 text-heading text-text-default-default"
                style={{ fontFamily: `var(${f.var})` }}
              >
                {f.sample}
              </p>
              <div className="flex gap-200">
                <code className="rounded-100 bg-background-default-tertiary px-100 font-mono text-[11px]">{f.var}</code>
                <code className="rounded-100 bg-background-default-tertiary px-100 font-mono text-[11px]">{f.tw}</code>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Font weights */}
      <section>
        <SectionTitle>Font Weights</SectionTitle>
        <div className="divide-y divide-border-default-default">
          {FONT_WEIGHTS.map((w) => (
            <div key={w.label} className="flex items-center gap-400 py-300">
              <div className="w-[140px] shrink-0">
                <p className="font-body-small text-body-small text-text-default-tertiary">{w.label}</p>
                <code className="font-mono text-[10px] text-text-default-tertiary">{w.tokenKey}</code>
              </div>
              <p
                className="flex-1 text-body-medium text-text-default-default"
                style={{ fontWeight: w.value }}
              >
                The quick brown fox jumps
              </p>
              <code className="font-mono text-[11px] text-text-default-secondary">{w.value}</code>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// SPACING TAB
// ═══════════════════════════════════════════════════════════════════
const SPACING_TOKENS = [
  { name: '100', var: '--sds-size-space-100', px: '4px', tw: 'p-100 / gap-100' },
  { name: '200', var: '--sds-size-space-200', px: '8px', tw: 'p-200 / gap-200' },
  { name: '300', var: '--sds-size-space-300', px: '12px', tw: 'p-300 / gap-300' },
  { name: '400', var: '--sds-size-space-400', px: '16px', tw: 'p-400 / gap-400' },
  { name: '600', var: '--sds-size-space-600', px: '24px', tw: 'p-600 / gap-600' },
  { name: '800', var: '--sds-size-space-800', px: '32px', tw: 'p-800 / gap-800' },
  { name: '1600', var: '--sds-size-space-1600', px: '64px', tw: 'p-1600 / gap-1600' },
  { name: '2400', var: '--sds-size-space-2400', px: '96px', tw: 'p-2400' },
];

const RADIUS_TOKENS = [
  { name: '100', var: '--sds-size-radius-100', px: '4px', tw: 'rounded-100' },
  { name: '200', var: '--sds-size-radius-200', px: '8px', tw: 'rounded-200' },
  { name: '400', var: '--sds-size-radius-400', px: '16px', tw: 'rounded-400' },
  { name: 'xl', var: '--sds-size-radius-xl', px: '24px', tw: 'rounded-xl' },
  { name: 'full', var: '--sds-size-radius-full', px: '9999px', tw: 'rounded-full' },
];

const DEPTH_TOKENS = [
  { name: 'depth-0', var: '--sds-size-depth-0', px: '0px' },
  { name: 'depth-025', var: '--sds-size-depth-025', px: '1px' },
  { name: 'depth-100', var: '--sds-size-depth-100', px: '4px' },
];

function SpacingTab() {
  return (
    <div className="space-y-1600">
      {/* Spacing */}
      <section>
        <SectionTitle>Spacing</SectionTitle>
        <div className="space-y-200">
          {SPACING_TOKENS.map((s) => (
            <div key={s.name} className="flex items-center gap-400">
              <div className="w-[80px] shrink-0 text-right">
                <span className="font-mono text-[13px] text-text-default-secondary">{s.name}</span>
              </div>
              <div
                className="shrink-0 rounded-100 bg-background-brand-secondary"
                style={{ width: s.px, height: '24px' }}
              />
              <div className="flex gap-400 text-[11px] text-text-default-tertiary">
                <code className="font-mono">{s.px}</code>
                <code className="font-mono">{s.var}</code>
                <code className="font-mono text-text-default-secondary">{s.tw}</code>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Border radius */}
      <section>
        <SectionTitle>Border Radius</SectionTitle>
        <div className="flex flex-wrap gap-400">
          {RADIUS_TOKENS.map((r) => (
            <div key={r.name} className="flex flex-col items-center gap-200">
              <div
                className="flex h-20 w-20 items-center justify-center border-2 border-border-brand-default bg-background-brand-secondary"
                style={{ borderRadius: r.px }}
              >
                <span className="font-mono text-[11px] text-text-brand-default">{r.name}</span>
              </div>
              <div className="text-center">
                <p className="font-mono text-[11px] text-text-default-secondary">{r.px}</p>
                <p className="font-mono text-[10px] text-text-default-tertiary">{r.tw}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Depth / Shadow */}
      <section>
        <SectionTitle>Depth (Shadow)</SectionTitle>
        <div className="grid grid-cols-3 gap-400">
          {DEPTH_TOKENS.map((d) => (
            <div key={d.name} className="rounded-200 border border-border-default-default p-400">
              <p className="mb-100 font-body-small text-body-small text-text-default-secondary">{d.name}</p>
              <code className="font-mono text-[11px] text-text-default-tertiary">{d.px}</code>
              <code className="block font-mono text-[10px] text-text-default-tertiary">{d.var}</code>
            </div>
          ))}
        </div>
      </section>

      {/* Stroke */}
      <section>
        <SectionTitle>Stroke / Border Width</SectionTitle>
        <div className="flex items-center gap-400 rounded-200 border border-border-default-default p-400">
          <div className="h-12 w-12 rounded-100" style={{ border: '1px solid var(--sds-color-border-brand-default)' }} />
          <div>
            <p className="font-body-medium text-body-medium text-text-default-default">border: 1px</p>
            <code className="font-mono text-[11px] text-text-default-secondary">--sds-size-stroke-border: 1px</code>
            <code className="ml-200 font-mono text-[11px] text-text-default-secondary">border (Tailwind: border-DEFAULT)</code>
          </div>
        </div>
      </section>

      {/* Icon size */}
      <section>
        <SectionTitle>Icon Size</SectionTitle>
        <div className="flex items-center gap-400 rounded-200 border border-border-default-default p-400">
          <div
            className="rounded-100 bg-background-brand-secondary"
            style={{ width: '24px', height: '24px' }}
          />
          <div>
            <p className="font-body-medium text-body-medium text-text-default-default">icon-small: 24px</p>
            <code className="font-mono text-[11px] text-text-default-secondary">--sds-size-icon-small: 24px</code>
            <code className="ml-200 font-mono text-[11px] text-text-default-secondary">w-icon-sm h-icon-sm</code>
          </div>
        </div>
      </section>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// APP ROOT
// ═══════════════════════════════════════════════════════════════════
export default function App() {
  const [tab, setTab] = useState<Tab>('landing');
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background-default-default">
      {/* Page header */}
      <div className="border-b border-border-default-default bg-background-default-default">
        <div className="mx-auto max-w-[1200px] px-400">
          <div className="pt-800 pb-400">
            <h1 className="mb-100 font-title-page text-title-page text-text-default-default leading-tight">
              Design System
            </h1>
            <p className="font-body-medium text-body-medium text-text-default-secondary">
              SDS 토큰 기반 컴포넌트 & 변수 뷰어 ·{' '}
              <code className="rounded-100 bg-background-default-tertiary px-100 font-mono text-[13px] text-text-default-default">
                --sds-*
              </code>{' '}
              변수 →{' '}
              <code className="rounded-100 bg-background-default-tertiary px-100 font-mono text-[13px] text-text-default-default">
                tailwind.theme-preset.js
              </code>{' '}
              → Tailwind 유틸
            </p>
          </div>
          <TabBar active={tab} onChange={setTab} />
        </div>
      </div>

      {/* Content */}
      {tab === 'landing' ? (
        <LandingPage />
      ) : (
        <div className="mx-auto max-w-[1200px] px-400 py-800">
          {tab === 'components' && (
            <ComponentsTab mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
          )}
          {tab === 'colors' && <ColorsTab />}
          {tab === 'typography' && <TypographyTab />}
          {tab === 'spacing' && <SpacingTab />}
        </div>
      )}
    </div>
  );
}
