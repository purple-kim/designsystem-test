import { type HTMLAttributes, type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/cn';

const gridVariants = cva('grid w-full gap-400', {
  variants: {
    platform: {
      desktop: 'grid-cols-3 md:grid-cols-4',
      mobile: 'grid-cols-1',
    },
  },
  defaultVariants: { platform: 'desktop' },
});

export type CardGridItem = {
  title: string;
  description?: string;
  icon?: ReactNode;
};

export type CardGridIconProps = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof gridVariants> & {
    items: CardGridItem[];
  };

export function CardGridIcon({
  className,
  platform = 'desktop',
  items,
  ...rest
}: CardGridIconProps) {
  const wrap = platform === 'desktop' ? 'max-w-[1200px]' : 'max-w-[375px]';

  return (
    <div className={cn('mx-auto w-full px-400', wrap)} {...rest}>
      <div className={cn(gridVariants({ platform }), className)}>
        {items.map((item) => (
          <article
            key={item.title}
            className={cn(
              'flex flex-col gap-300 rounded-400 border border-border-default-default bg-background-default-default p-400'
            )}
          >
            <div className="flex size-11 items-center justify-center rounded-200 bg-background-default-secondary text-icon-default-default [&>svg]:size-6">
              {item.icon}
            </div>
            <h3 className="font-body-medium text-body-medium font-body-strong text-text-default-default">
              {item.title}
            </h3>
            {item.description ? (
              <p className="font-body-small text-body-small text-text-default-secondary">
                {item.description}
              </p>
            ) : null}
          </article>
        ))}
      </div>
    </div>
  );
}

export { gridVariants };
