import { type HTMLAttributes, type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/cn';

const heroVariants = cva(
  'w-full bg-background-default-default border-b border-border-default-default',
  {
    variants: {
      platform: {
        desktop: 'py-4000',
        mobile: 'py-1600',
      },
    },
    defaultVariants: { platform: 'desktop' },
  }
);

export type HeroImageProps = HTMLAttributes<HTMLElement> &
  VariantProps<typeof heroVariants> & {
    /** 메인 타이틀 */
    title: ReactNode;
    /** 서브타이틀 */
    subtitle?: ReactNode;
    /** 이미지 자리 또는 실제 이미지 노드 */
    image?: ReactNode;
    /** 액션 버튼 영역 */
    actions?: ReactNode;
  };

export function HeroImage({
  className,
  platform = 'desktop',
  title,
  subtitle,
  image,
  actions,
  ...rest
}: HeroImageProps) {
  const innerMax = platform === 'desktop' ? 'max-w-[1200px]' : 'max-w-[375px]';

  return (
    <section className={cn(heroVariants({ platform }), className)} {...rest}>
      <div className={cn('mx-auto flex flex-col items-center gap-800 px-400', innerMax)}>
        {/* Text content — center aligned (Figma: Text Content Title, Align=Center) */}
        <div className="flex max-w-[720px] flex-col items-center gap-400 text-center">
          <h1
            className={cn(
              'text-text-default-default',
              platform === 'desktop'
                ? 'font-title-hero text-title-hero'
                : 'font-title-page text-title-page'
            )}
          >
            {title}
          </h1>
          {subtitle ? (
            <p className="font-subtitle text-subtitle text-text-default-secondary">
              {subtitle}
            </p>
          ) : null}
        </div>

        {/* Button group (Figma: Button Group, Align=Center) */}
        {actions ? (
          <div className="flex flex-wrap items-center justify-center gap-300">
            {actions}
          </div>
        ) : null}

        {/* Image placeholder / actual image */}
        {image !== undefined ? (
          image
        ) : (
          <div
            className={cn(
              'w-full rounded-400 bg-background-default-secondary',
              platform === 'desktop' ? 'h-[480px]' : 'h-[240px]'
            )}
            aria-hidden
          />
        )}
      </div>
    </section>
  );
}

export { heroVariants };
