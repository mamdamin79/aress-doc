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
          'transform-gpu p-3 text-gray-1000 border-[1.5px] font-medium rounded-xl scale-0 relative transition-all duration-500 -top-96 ease-in-out',
          t.visible ? 'top-0 scale-95 animate-toast' : 'opacity-0',
          styleToasts[type]
        )}
      >
        <div className="flex items-center gap-2">
          <div className={cn('p-1.5 text-white rounded-lg', bgIcon[type])}>
            {icons[type]}
          </div>
          <span className="text-sm">{message}</span>
        </div>
      </div>
    ));
  };
  return { showToast };
}
