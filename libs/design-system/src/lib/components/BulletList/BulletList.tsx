import { cn } from '../../../utils';
import { Icon } from '../Icon';

interface Props {
  items: {
    title: React.ReactNode;
    status?: 'normal' | 'error' | 'success';
  }[];
  textColor?: 'semi-dark' | 'dark';
  size?: 'sm' | 'md';
}

export function BulletList({ items, textColor = 'dark', size = 'md' }: Props) {
  return (
    <ul className="w-full">
      {items.map((item, index) => {
        const status = item.status ?? 'normal'; // Default to 'normal'
        return (
          <li
            className={cn(
              'flex items-start gap-2 text-sm font-medium',
              status === 'error' && 'text-text-accent-red-primary-600',
              status === 'success' && 'text-text-accent-green-primary-600',
              status === 'normal' &&
                (textColor === 'dark'
                  ? 'text-text-neutral-primary mr-2'
                  : 'text-text-neutral-secondary mr-2'),
              size == 'sm' && 'text-xs',
            )}
            key={index}
          >
            {/* Icon or bullet based on status */}
            {status === 'normal' && (
              <span className="bg-text-neutral-primary mt-2.5 h-1 w-1 shrink-0 rounded-full"></span>
            )}
            {status === 'success' && (
              <div className="mt-1">
                <Icon name="check" size="sm" />
              </div>
            )}
            {status === 'error' && (
              <div className="mt-1">
                <Icon name="x" size="sm" />
              </div>
            )}
            {item.title}
          </li>
        );
      })}
    </ul>
  );
}
