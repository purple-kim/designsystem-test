import { cva, type VariantProps } from 'class-variance-authority';
import {
  type InputHTMLAttributes,
  type ReactNode,
  forwardRef,
  useId,
} from 'react';
import { cn } from '../lib/cn';

/** Figma `State=Default | Error` (+ `disabled` prop → Disabled) */
const shellVariants = cva(
  'flex min-h-[40px] w-full max-w-[320px] items-center gap-200 rounded-200 border bg-background-default-default px-300 transition-colors',
  {
    variants: {
      state: {
        default:
          'border-border-default-default hover:border-border-default-secondary focus-within:ring-2 focus-within:ring-border-brand-default',
        error:
          'border-border-danger-default focus-within:ring-2 focus-within:ring-border-danger-default',
      },
    },
    defaultVariants: { state: 'default' },
  }
);

export type InputFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> &
  VariantProps<typeof shellVariants> & {
    /** 라벨 텍스트 */
    label: string;
    /** 선행 아이콘 (유무는 undefined 여부로) */
    icon?: ReactNode;
    /** 비활성화 */
    disabled?: boolean;
    /** Figma State=Error */
    error?: boolean;
  };

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  function InputField(
    { className, label, icon, error, disabled, state, id, ...rest },
    ref
  ) {
    const uid = useId();
    const inputId = id ?? `input-${uid}`;
    const shellState = error ? 'error' : state ?? 'default';

    return (
      <div className="flex w-full max-w-[320px] flex-col gap-100">
        <label
          htmlFor={inputId}
          className="font-body-small text-body-small text-text-default-secondary"
        >
          {label}
        </label>
        <div
          className={cn(
            shellVariants({ state: shellState }),
            disabled &&
              'border-border-disabled-default bg-background-disabled-default focus-within:ring-0',
            className
          )}
        >
          {icon ? (
            <span className="pointer-events-none flex size-5 shrink-0 text-icon-default-secondary [&>svg]:size-full">
              {icon}
            </span>
          ) : null}
          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            className={cn(
              'min-w-0 flex-1 border-0 bg-transparent py-100 font-body-medium text-body-medium text-text-default-default outline-none placeholder:text-text-default-tertiary',
              disabled &&
                'cursor-not-allowed text-text-disabled-default placeholder:text-text-disabled-default'
            )}
            aria-invalid={error || undefined}
            {...rest}
          />
        </div>
      </div>
    );
  }
);

export { shellVariants };
