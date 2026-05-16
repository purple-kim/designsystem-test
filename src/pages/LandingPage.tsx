import {
  Button,
  CardGridIcon,
  Footer,
  Header,
  HeroImage,
  PanelImageDouble,
  ZapIcon,
  PenToolIcon,
  SaveIcon,
  LayersIcon,
  LoaderIcon,
  UsersIcon,
} from '../components';

// ─── Nav links (from Figma Navigation Pill List) ──────────────────
const NAV_LINKS = [
  { label: '커리큘럼', href: '#curriculum' },
  { label: '강사진', href: '#instructor' },
  { label: '커뮤니티', href: '#community' },
  { label: '후기', href: '#review' },
  { label: '요금제', href: '#pricing' },
  { label: '문의', href: '#contact' },
];

// ─── Card Grid items (Figma: Zap, Pen tool, Save, Layers, Loader, Users) ─
const FEATURE_CARDS = [
  {
    icon: <ZapIcon />,
    title: '빠른 실력 향상',
    description: '실무 프로젝트 중심의 커리큘럼으로 단기간에 현업 수준의 역량을 갖춥니다.',
  },
  {
    icon: <PenToolIcon />,
    title: '실습 중심 학습',
    description: '강의만 듣는 수업이 아니라 매 세션마다 직접 만들며 배우는 핸즈온 방식입니다.',
  },
  {
    icon: <SaveIcon />,
    title: '학습 자료 제공',
    description: '수업 자료, 코드 예제, 참고 문서를 언제든지 다운로드하고 복습할 수 있습니다.',
  },
  {
    icon: <LayersIcon />,
    title: '체계적 커리큘럼',
    description: '입문부터 심화까지 단계별로 설계된 로드맵으로 빈틈없이 학습할 수 있습니다.',
  },
  {
    icon: <LoaderIcon />,
    title: '지속적 업데이트',
    description: '빠르게 변하는 기술 트렌드에 맞춰 커리큘럼과 자료를 주기적으로 갱신합니다.',
  },
  {
    icon: <UsersIcon />,
    title: '활발한 커뮤니티',
    description: '같은 목표를 가진 동료들과 함께 성장하는 스터디 그룹과 네트워크를 제공합니다.',
  },
];

// ─── Panel items (Figma: Panel Image Double, Platform=Desktop) ────
const PANEL_ITEMS: [
  { title: string; body: string; primaryLabel: string; secondaryLabel: string },
  { title: string; body: string; primaryLabel: string; secondaryLabel: string }
] = [
  {
    title: '프론트엔드 개발',
    body: 'React, TypeScript, Next.js 등 최신 프론트엔드 기술 스택을 실습 중심으로 학습합니다. 포트폴리오 프로젝트를 통해 실무 역량을 갖춥니다.',
    primaryLabel: '커리큘럼 보기',
    secondaryLabel: '수강신청',
  },
  {
    title: 'UX/UI 디자인',
    body: '사용자 리서치부터 와이어프레임, 프로토타이핑까지 UX 디자인의 전 과정을 Figma와 함께 체계적으로 배웁니다.',
    primaryLabel: '커리큘럼 보기',
    secondaryLabel: '수강신청',
  },
];

// ─── Footer columns ───────────────────────────────────────────────
const FOOTER_COLS = [
  { heading: '교육 과정', links: ['프론트엔드 개발', 'UX/UI 디자인', '데이터 분석', '프로덕트 매니지먼트'] },
  { heading: '회사', links: ['소개', '채용', '블로그', '파트너십'] },
  { heading: '지원', links: ['FAQ', '문의하기', '환불 정책', '이용약관'] },
  { heading: '팔로우', links: ['인스타그램', '링크드인', '유튜브', '뉴스레터'] },
];

// ─── LandingPage ─────────────────────────────────────────────────
export function LandingPage() {
  return (
    <div className="min-h-screen bg-background-default-default">

      {/* ── Header (Figma: Header, Platform=Desktop, State=Default) ── */}
      <Header
        platform="desktop"
        logo={
          <span className="font-heading text-heading text-text-default-default">
            EduPath
          </span>
        }
        nav={
          <>
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="font-body-medium text-body-medium text-text-default-secondary transition-colors hover:text-text-default-default"
              >
                {label}
              </a>
            ))}
            <Button variant="primary" size="small" label="무료체험 하기" />
          </>
        }
      />

      {/* ── Hero Image (Figma: Hero Image, Platform=Desktop) ─────── */}
      <HeroImage
        id="hero"
        platform="desktop"
        title="미래를 설계하는 교육"
        subtitle="실무 중심 커리큘럼으로 성장하세요"
        actions={
          <>
            <Button variant="neutral" size="medium" label="커리큘럼 보기" />
            <Button variant="primary" size="medium" label="수강신청" />
          </>
        }
      />

      {/* ── Panel Image Double (Figma: Panel Image Double, Platform=Desktop) */}
      <PanelImageDouble
        id="curriculum"
        platform="desktop"
        heading="커리큘럼 소개"
        subheading="당신의 목표에 맞는 과정을 선택하세요"
        items={PANEL_ITEMS.map((item) => ({
          title: item.title,
          body: item.body,
          actions: (
            <>
              <Button variant="subtle" size="small" label={item.primaryLabel} />
              <Button variant="primary" size="small" label={item.secondaryLabel} />
            </>
          ),
        })) as [Parameters<typeof PanelImageDouble>[0]['items'][0], Parameters<typeof PanelImageDouble>[0]['items'][1]]}
      />

      {/* ── Card Grid Icon (Figma: Card Grid Icon, Platform=Desktop) ── */}
      <section id="features" className="w-full border-b border-border-default-default bg-background-default-default py-1600">
        <div className="mx-auto max-w-[1200px] flex flex-col gap-800 px-400">
          {/* Text Content Heading (Figma: Text Content Heading, Align=Start) */}
          <div className="flex flex-col gap-200">
            <h2 className="font-heading text-heading text-text-default-default">
              왜 EduPath인가요?
            </h2>
            <p className="font-subheading text-subheading-medium text-text-default-secondary">
              실무에서 바로 쓸 수 있는 역량을 키우는 6가지 이유
            </p>
          </div>
          <CardGridIcon platform="desktop" items={FEATURE_CARDS} />
        </div>
      </section>

      {/* ── Footer (Figma: Footer, Platform=Desktop) ──────────────── */}
      <Footer
        platform="desktop"
        columns={
          <>
            {FOOTER_COLS.map(({ heading, links }) => (
              <div key={heading} className="flex flex-col gap-200">
                <p className="font-heading text-body-medium text-text-default-default" style={{ fontWeight: 'var(--sds-typography-heading-font-weight)' }}>
                  {heading}
                </p>
                {links.map((link) => (
                  <a
                    key={link}
                    href="#"
                    className="font-body-medium text-body-small text-text-default-secondary transition-colors hover:text-text-default-default"
                  >
                    {link}
                  </a>
                ))}
              </div>
            ))}
          </>
        }
        bottom="© 2026 EduPath. 모든 권리 보유."
      />
    </div>
  );
}
