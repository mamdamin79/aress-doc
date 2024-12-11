import { toast } from 'react-hot-toast';
import { bgIcon, icons, styleToasts } from './CustomToast.constants';
import { cn } from '../../utils';

interface Props {
  message: string;
  type: 'error' | 'success' | 'info' | 'warning';
}

export function CustomToast() {
  const showToast = ({ message, type }: Props) => {
    toast.custom((t) => (
      <div
        onClick={() => toast.dismiss(t.id)}
        className={cn(
          'text-gray-1000 relative -top-96 scale-0 transform-gpu rounded-xl border-[1.5px] p-3 font-medium transition-all duration-500 ease-in-out',
          t.visible ? 'animate-toast top-0 scale-95' : 'opacity-0',
          styleToasts[type],
        )}
      >
        <div className="flex items-center gap-2">
          <div className={cn('rounded-lg p-1.5 text-white', bgIcon[type])}>
            {icons[type]}
          </div>
          <span className="text-sm">{message}</span>
        </div>
      </div>
    ));
  };
  return { showToast };
}
