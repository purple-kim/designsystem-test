import { type HTMLAttributes, type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/cn';

const panelVariants = cva(
  'w-full bg-background-default-secondary border-b border-border-default-default',
  {
    variants: {
      platform: {
        desktop: 'py-1600',
        mobile: 'py-800',
      },
    },
    defaultVariants: { platform: 'desktop' },
  }
);

export type PanelItem = {
  /** 패널 제목 */
  title: ReactNode;
  /** 패널 본문 */
  body?: ReactNode;
  /** 이미지 노드 또는 undefined 시 placeholder */
  image?: ReactNode;
  /** 액션 버튼 영역 */
  actions?: ReactNode;
};

export type PanelImageDoubleProps = HTMLAttributes<HTMLElement> &
  VariantProps<typeof panelVariants> & {
    /** 섹션 heading 텍스트 */
    heading?: ReactNode;
    /** 섹션 subheading 텍스트 */
    subheading?: ReactNode;
    /** 두 패널 데이터 */
    items: [PanelItem, PanelItem];
  };

export function PanelImageDouble({
  className,
  platform = 'desktop',
  heading,
  subheading,
  items,
  ...rest
}: PanelImageDoubleProps) {
  const innerMax = platform === 'desktop' ? 'max-w-[1200px]' : 'max-w-[375px]';
  const isDesktop = platform === 'desktop';

  return (
    <section className={cn(panelVariants({ platform }), className)} {...rest}>
      <div className={cn('mx-auto flex flex-col gap-800 px-400', innerMax)}>
        {/* Section heading (Figma: Text Content Heading, Align=Start) */}
        {(heading || subheading) && (
          <div className="flex flex-col gap-200">
            {heading && (
              <h2 className="font-heading text-heading text-text-default-default">
                {heading}
              </h2>
            )}
            {subheading && (
              <p className="font-subheading text-subheading-medium text-text-default-secondary">
                {subheading}
              </p>
            )}
          </div>
        )}

        {/* Two panels (Figma: Panel Image Double) */}
        <div
          className={cn(
            'grid gap-600',
            isDesktop ? 'grid-cols-2' : 'grid-cols-1'
          )}
        >
          {items.map((item, i) => (
            <article
              key={i}
              className="flex flex-col gap-400 rounded-400 border border-border-default-default bg-background-default-default overflow-hidden"
            >
              {/* Image area */}
              {item.image !== undefined ? (
                item.image
              ) : (
                <div
                  className="h-[240px] w-full bg-background-default-tertiary"
                  aria-hidden
                />
              )}

              {/* Text + actions */}
              <div className="flex flex-col gap-300 p-600">
                <h3 className="font-heading text-heading text-text-default-default">
                  {item.title}
                </h3>
                {item.body && (
                  <p className="font-body-medium text-body-medium text-text-default-secondary">
                    {item.body}
                  </p>
                )}
                {item.actions && (
                  <div className="flex flex-wrap gap-200 pt-100">
                    {item.actions}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export { panelVariants };
