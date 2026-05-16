import { cva, type VariantProps } from 'class-variance-authority';
import {
  type ButtonHTMLAttributes,
  type ReactNode,
  forwardRef,
} from 'react';
import { cn } from '../lib/cn';

const buttonVariants = cva(
  [
    'inline-flex shrink-0 items-center justify-center gap-200 rounded-200 border',
    'font-body-medium text-body-medium leading-none transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-brand-default focus-visible:ring-offset-2 focus-visible:ring-offset-background-default-default',
    'disabled:cursor-not-allowed disabled:border-border-disabled-default disabled:bg-background-disabled-default disabled:text-text-disabled-default',
  ],
  {
    variants: {
      variant: {
        primary: [
          'border-transparent bg-background-brand-default text-text-brand-on-brand',
          'hover:enabled:bg-background-brand-hover',
        ],
        neutral: [
          'border-transparent bg-background-neutral-default text-text-neutral-on-neutral',
          'hover:enabled:bg-background-neutral-hover',
        ],
        subtle: [
          'border-border-default-default bg-background-default-secondary text-text-default-default',
          'hover:enabled:bg-background-default-secondary-hover',
        ],
      },
      size: {
        medium: 'min-h-[40px] min-w-[75px] px-400 py-200',
        small: 'min-h-8 min-w-[67px] px-300 py-100 text-body-small',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'medium',
    },
  }
);

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    /** 버튼 라벨 (텍스트) */
    label?: ReactNode;
    /** 아이콘을 앞에 표시 */
    icon?: ReactNode;
  };

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      className,
      variant,
      size,
      label,
      icon,
      disabled,
      children,
      type = 'button',
      ...rest
    },
    ref
  ) {
    const content = label ?? children;
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        className={cn(buttonVariants({ variant, size }), className)}
        {...rest}
      >
        {icon ? <span className="inline-flex size-[1em] shrink-0 [&>svg]:size-full">{icon}</span> : null}
        {content ? <span className="truncate">{content}</span> : null}
      </button>
    );
  }
);

export { buttonVariants };
