'use client';
import { ReactComponent as LogoMinimal } from '../../assets/images/logos/LogoWithText.svg';
import { ReactComponent as LogoFull } from '../../assets/images/logos/Logo.svg';

import { IconProps, SquaredButton } from 'design-system';
import { useThemeToggle } from '@shared';
import Link from 'next/link';
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { toggleTheme, theme } = useThemeToggle();
  const themeIcons: [IconProps, IconProps] | [IconProps] =
    theme === 'light'
      ? [{ name: 'sun' }, { name: 'moon' }]
      : [{ name: 'moon' }, { name: 'sun' }];
  return (
    <>
      <header className="flex h-[90px] justify-between px-8 pt-8">
        <div className="text-surface-brand-600-primary flex items-center justify-center">
          <div className="flex h-14 w-14 items-center justify-center">
            <LogoMinimal className="lg:hidden" />
          </div>
          <div className="hidden flex-row items-center gap-4 text-lg font-semibold lg:flex">
            <Link href={'/'}>
              <LogoFull width={48} height={48} />
            </Link>
            <div>پردازش اطلاعات مالی آرسس</div>
          </div>
        </div>
        <div className="flex h-14 w-14 items-start justify-end">
          <SquaredButton
            icons={themeIcons}
            badge={{ enabled: false }}
            onClick={toggleTheme}
          />
        </div>
      </header>
      <main>{children}</main>
    </>
  );
}
