import { cva, type VariantProps } from 'class-variance-authority';
import {
  type ButtonHTMLAttributes,
  type ReactNode,
  forwardRef,
} from 'react';
import { cn } from '../lib/cn';

const iconButtonVariants = cva(
  [
    'inline-flex shrink-0 items-center justify-center rounded-200 border transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-brand-default focus-visible:ring-offset-2 focus-visible:ring-offset-background-default-default',
    'disabled:cursor-not-allowed disabled:border-border-disabled-default disabled:bg-background-disabled-default disabled:text-icon-disabled-default',
  ],
  {
    variants: {
      variant: {
        primary: [
          'border-transparent bg-background-brand-default text-icon-brand-on-brand',
          'hover:enabled:bg-background-brand-hover',
        ],
        neutral: [
          'border-transparent bg-background-neutral-default text-icon-neutral-on-neutral',
          'hover:enabled:bg-background-neutral-hover',
        ],
        subtle: [
          'border-border-default-default bg-background-default-secondary text-icon-default-default',
          'hover:enabled:bg-background-default-secondary-hover',
        ],
      },
      size: {
        medium:
          'size-11 min-h-11 min-w-11 rounded-200 p-300 [&>svg]:size-6',
        small: 'size-9 rounded-200 p-200 [&>svg]:size-[18px]',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'medium',
    },
    compoundVariants: [
      {
        variant: 'subtle',
        size: 'medium',
        class: '!size-10 !min-h-10 !min-w-10',
      },
    ],
  }
);

export type IconButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'children'
> &
  VariantProps<typeof iconButtonVariants> & {
    /** 접근 가능한 이름 (라벨) */
    label: string;
    icon: ReactNode;
  };

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(
    { className, variant, size, icon, label, disabled, type = 'button', ...rest },
    ref
  ) {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        aria-label={label}
        title={label}
        className={cn(iconButtonVariants({ variant, size }), className)}
        {...rest}
      >
        {icon}
      </button>
    );
  }
);

export { iconButtonVariants };
