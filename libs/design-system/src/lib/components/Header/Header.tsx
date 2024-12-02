import { cn } from '../../../utils';

export function Header() {
  return (
    <header
      className={cn(
        'ss',
        'ff m-6 relative pb-10 top-0 text-right shadow-sm text-md'
      )}
    >
      This is header!
    </header>
  );
}
