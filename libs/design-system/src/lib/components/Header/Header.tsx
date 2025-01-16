import { cn } from '../../../utils';

export function Header() {
  document.documentElement.classList.add('dark');

  return (
    <header
      className={cn(
        'ss',
        'ff bg-surface-message-info-100-soft text-button-brand-label-plain-hover',
      )}
    >
      This is header!
    </header>
  );
}
