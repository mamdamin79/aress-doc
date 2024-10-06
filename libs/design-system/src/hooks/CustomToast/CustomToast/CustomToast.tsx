import { toast } from 'react-hot-toast';
import { icons, styleToasts } from '../CustomToast.constants';
import { cn } from '../../../utils';

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
          'transform-gpu p-4 rounded-xl scale-0 border relative transition-all duration-500 bg-green-100 border-green-200 text-green-600 -top-96 ease-in-out',
          t.visible ? 'top-0 scale-95 animate-toast' : 'opacity-0',
          styleToasts[type]
        )}
      >
        <div className="flex items-center gap-2">
          {icons[type]}
          <span>{message}</span>
        </div>
      </div>
    ));
  };
  return { showToast };
}
