import { cn } from '../../../utils';
import { Icon, IconProps } from '../Icon';

export interface BadgeProps {
  theme: 'disabled' | 'green' | 'blue' | 'purple' | 'yellow' | 'red';
  icon?: IconProps;
  title: string;
}

export function Badge({ title, theme, icon }: BadgeProps) {
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
            theme === 'purple',
          'border-border-accent-yellow-200 text-text-onaccent-colored-onyellow-on200_100_50 bg-surface-accent-yellow-100':
            theme === 'yellow',
          'border-border-accent-red-200 text-text-onaccent-colored-onred-on200_100_50 bg-surface-accent-red-100':
            theme === 'red',
        },
      )}
    >
      {title}
      {icon && <Icon {...icon} />}
    </div>
  );
}
