import { cva, type VariantProps } from 'class-variance-authority';
import {
  type ButtonHTMLAttributes,
  type ReactNode,
  forwardRef,
} from 'react';
import { cn } from '../lib/cn';

const buttonDangerVariants = cva(
  [
    'inline-flex shrink-0 items-center justify-center gap-200 rounded-200 border',
    'font-body-medium text-body-medium leading-none transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-danger-default focus-visible:ring-offset-2 focus-visible:ring-offset-background-default-default',
    'disabled:cursor-not-allowed disabled:border-border-disabled-default disabled:bg-background-disabled-default disabled:text-text-disabled-default',
  ],
  {
    variants: {
      variant: {
        primary: [
          'border-transparent bg-background-danger-default text-text-danger-on-danger',
          'hover:enabled:bg-background-danger-hover',
        ],
        subtle: [
          'border-border-danger-default bg-background-danger-tertiary text-text-danger-default',
          'hover:enabled:bg-background-danger-tertiary-hover',
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

export type ButtonDangerProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonDangerVariants> & {
    label?: ReactNode;
    icon?: ReactNode;
  };

export const ButtonDanger = forwardRef<HTMLButtonElement, ButtonDangerProps>(
  function ButtonDanger(
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
        className={cn(buttonDangerVariants({ variant, size }), className)}
        {...rest}
      >
        {icon ? (
          <span className="inline-flex size-[1em] shrink-0 text-current [&>svg]:size-full">
            {icon}
          </span>
        ) : null}
        {content ? <span className="truncate">{content}</span> : null}
      </button>
    );
  }
);

export { buttonDangerVariants };
