import { cn } from 'libs/design-system/src/utils';
import { Icon } from '../Icon';

interface Props {
  items: {
    title: string;
    status?: 'normal' | 'error' | 'success';
  }[];
  textColor?: 'gray' | 'black';
}

export function BulletList({ items, textColor = 'black' }: Props) {
  return (
    <div className="w-full">
      {items.map((item, index) => {
        const status = item.status ?? 'normal'; // Default to 'normal'
        return (
          <div
            className={cn(
              'flex items-start gap-2 text-sm font-medium',
              status === 'error' && 'text-red-600',
              status === 'success' && 'text-green-600',
              status === 'normal' &&
                (textColor === 'black'
                  ? 'text-gray-1000 mr-2'
                  : 'mr-2 text-gray-600'),
            )}
            key={index}
          >
            {/* Icon or bullet based on status */}
            {status === 'normal' && (
              <span className="mt-2.5 rounded-full bg-black p-[2px]"></span>
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
            )}{' '}
            {/* Item title */}
            {item.title}
          </div>
        );
      })}
    </div>
  );
}
