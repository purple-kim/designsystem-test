import { type HTMLAttributes, type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/cn';

const groupVariants = cva('flex w-full gap-200', {
  variants: {
    align: {
      start: 'justify-start',
      end: 'justify-end',
      center: 'justify-center',
      justify: 'justify-between',
      stack: 'flex-col items-stretch',
    },
  },
  defaultVariants: {
    align: 'start',
  },
});

export type ButtonGroupProps = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof groupVariants> & {
    children: ReactNode;
  };

export function ButtonGroup({
  className,
  align,
  children,
  ...rest
}: ButtonGroupProps) {
  return (
    <div
      role="group"
      className={cn(groupVariants({ align }), className)}
      {...rest}
    >
      {children}
    </div>
  );
}

export { groupVariants };
