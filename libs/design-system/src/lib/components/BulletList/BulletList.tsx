import { cn } from 'libs/design-system/src/utils';
import { Icon } from '../Icon';

interface Props {
  items: {
    title: string;
    status?: 'normal' | 'error' | 'success';
  }[];
  textColor?: 'semi-dark' | 'dark';
}

export function BulletList({ items, textColor = 'dark' }: Props) {
  return (
    <ul className="w-full">
      {items.map((item, index) => {
        const status = item.status ?? 'normal'; // Default to 'normal'
        return (
          <li
            className={cn(
              'flex items-start gap-2 font-medium',
              status === 'error' && 'text-red-600',
              status === 'success' && 'text-green-600',
              status === 'normal' &&
                (textColor === 'dark'
                  ? 'text-gray-1000 mr-2'
                  : 'mr-2 text-gray-600'),
            )}
            key={index}
          >
            {/* Icon or bullet based on status */}
            {status === 'normal' && (
              <span className="bg-gray-1000 mt-2.5 h-1 w-1 rounded-full"></span>
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
