import { type HTMLAttributes, type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/cn';

const footerVariants = cva(
  'w-full border-t border-border-default-default bg-background-default-secondary text-text-default-default',
  {
    variants: {
      platform: {
        desktop: 'py-800',
        mobile: 'py-600',
      },
    },
    defaultVariants: { platform: 'desktop' },
  }
);

export type FooterProps = HTMLAttributes<HTMLElement> &
  VariantProps<typeof footerVariants> & {
    /** 상단 요약/뉴스레터 등 */
    top?: ReactNode;
    /** 링크 컬럼들 */
    columns?: ReactNode;
    /** 하단 저작권/약관 한 줄 */
    bottom?: ReactNode;
  };

export function Footer({
  className,
  platform = 'desktop',
  top,
  columns,
  bottom,
  ...rest
}: FooterProps) {
  const innerMax = platform === 'desktop' ? 'max-w-[1200px]' : 'max-w-[375px]';

  return (
    <footer className={cn(footerVariants({ platform }), className)} {...rest}>
      <div className={cn('mx-auto flex flex-col gap-600 px-400', innerMax)}>
        {top ? <div className="border-b border-border-default-default pb-600">{top}</div> : null}
        {columns ? (
          <div
            className={cn(
              'grid gap-600',
              platform === 'desktop' ? 'grid-cols-4' : 'grid-cols-1'
            )}
          >
            {columns}
          </div>
        ) : null}
        {bottom ? (
          <div className="border-t border-border-default-default pt-400 font-body-small text-body-small text-text-default-secondary">
            {bottom}
          </div>
        ) : null}
      </div>
    </footer>
  );
}

export { footerVariants };
