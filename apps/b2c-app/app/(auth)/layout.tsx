'use client';
import { ReactComponent as LogoWithText } from '../../assets/images/logos/LogoWithText.svg';
import { IconProps, SquaredButton } from 'design-system';
import { useThemeToggle } from '@shared-hooks';
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
        <div className="text-surface-brand-600-primary flex h-14 w-14 items-center justify-center">
          <LogoWithText />
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
