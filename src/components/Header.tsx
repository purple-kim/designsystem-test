import { type HTMLAttributes, type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/cn';

const headerVariants = cva('w-full border-b border-border-default-default bg-background-default-default', {
  variants: {
    platform: {
      desktop: '',
      mobile: '',
    },
    open: {
      true: '',
      false: '',
    },
  },
  compoundVariants: [
    { platform: 'desktop', class: 'min-h-[99px]' },
    { platform: 'mobile', open: false, class: 'min-h-[84px]' },
  ],
  defaultVariants: {
    platform: 'desktop',
    open: false,
  },
});

export type HeaderProps = HTMLAttributes<HTMLElement> &
  VariantProps<typeof headerVariants> & {
    /** 로고/브랜드 영역 */
    logo?: ReactNode;
    /** 네비게이션 슬롯 (데스크톱 가로 / 모바일 메뉴 내용) */
    nav?: ReactNode;
    /** 모바일 햄버거 트리거 (State=Open일 때 메뉴 노출) */
    menuToggle?: ReactNode;
  };

export function Header({
  className,
  platform = 'desktop',
  open = false,
  logo,
  nav,
  menuToggle,
  ...rest
}: HeaderProps) {
  if (platform === 'mobile' && open) {
    return (
      <header
        className={cn(
          'flex w-full max-w-[375px] flex-col border-b border-border-default-default bg-background-default-default',
          'min-h-[812px]',
          className
        )}
        {...rest}
      >
        <div className="flex min-h-[84px] items-center justify-between gap-300 px-400 py-200">
          <div className="flex min-w-0 flex-1 items-center">{logo}</div>
          {menuToggle}
        </div>
        <nav className="flex flex-1 flex-col gap-200 border-t border-border-default-default p-400 font-body-medium text-body-medium text-text-default-default">
          {nav}
        </nav>
      </header>
    );
  }

  if (platform === 'mobile') {
    return (
      <header
        className={cn(headerVariants({ platform, open }), className)}
        {...rest}
      >
        <div className="mx-auto flex h-[84px] max-w-[375px] items-center justify-between gap-300 px-400">
          <div className="flex min-w-0 flex-1 items-center">{logo}</div>
          {menuToggle}
        </div>
      </header>
    );
  }

  return (
    <header
      className={cn(headerVariants({ platform }), className)}
      {...rest}
    >
      <div className="mx-auto flex h-[99px] max-w-[1200px] items-center justify-between gap-600 px-400">
        <div className="flex items-center gap-400">{logo}</div>
        <nav className="flex flex-1 items-center justify-end gap-600 font-body-medium text-body-medium text-text-default-default">
          {nav}
        </nav>
      </div>
    </header>
  );
}

export { headerVariants };
