import { cn } from './../../../utils';
import { Icon } from '../Icon';

interface Props {
  haveIcon: boolean;
  theme: 'disabled' | 'green' | 'blue' | 'pruple' | 'yellow' | 'red';
  title: string;
}

export function TradableBadge({ title, theme, haveIcon }: Props) {
  return (
    <div
      className={cn(
        'flex w-fit items-center gap-1 rounded-sm border px-1.5 text-xs font-medium',
        {
          'border-border-accent-gray-400 text-text-neutral-secondary bg-surface-accent-gray-100':
            theme === 'disabled',
          'border-border-accent-vividgreen-200 text-text-onaccent-colored-onvividgreen-on200_100_50 bg-surface-accent-vividgreen-100':
            theme === 'green',
          'border-border-accent-blue-200 text-text-onaccent-colored-onblue-on200_100_50 bg-surface-accent-blue-100':
            theme === 'blue',
          'border-border-accent-purple-200 text-text-onaccent-colored-onpurple-on200_100_50 bg-surface-accent-purple-100':
            theme === 'pruple',
          'border-border-accent-yellow-200 text-text-onaccent-colored-onyellow-on200_100_50 bg-surface-accent-yellow-100':
            theme === 'yellow',
          'border-border-accent-red-200 text-text-onaccent-colored-onred-on200_100_50 bg-surface-accent-red-100':
            theme === 'red',
        },
      )}
    >
      {title}
      {haveIcon && <Icon name="check" size="sm" />}
    </div>
  );
}
