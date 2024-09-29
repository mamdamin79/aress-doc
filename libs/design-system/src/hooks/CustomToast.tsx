import { toast } from 'react-hot-toast';
import { cn } from '../utils';
import { Icon } from '../lib/components';

export const useCustomToast = () => {
  const baseStyle = 'p-4 rounded-xl border';

  const info = (message: string) => {
    toast.custom((t) => (
      <div
        onClick={() => toast.dismiss(t.id)}
        className={cn(
          'transform-gpu relative text-blue-900 transition-all  duration-300 bg-blue-100 border-blue-200 -top-96 ease-in-out',
          t.visible ? 'top-0' : '-top-96 opacity-0',
          baseStyle
        )}
      >
        <div className="flex items-center gap-2">
          <Icon name="info" size="lg" />
          <span>{message}</span>
        </div>
      </div>
    ));
  };

  const success = (message: string) => {
    toast.custom((t) => (
      <div
        onClick={() => toast.dismiss(t.id)}
        className={cn(
          'transform-gpu translate-y-0 relative transition-all duration-300 bg-green-100 border-green-200 text-green-600 -top-96 ease-in-out',
          t.visible ? 'top-0' : '-top-96 opacity-0',
          baseStyle
        )}
      >
        <div className="flex items-center gap-2">
          <Icon name="check" size="lg" />
          <span>{message}</span>
        </div>
      </div>
    ));
  };

  const warning = (message: string) => {
    toast.custom((t) => (
      <div
        onClick={() => toast.dismiss(t.id)}
        className={cn(
          'transform-gpu translate-y-0  relative transition-all duration-300 bg-yellow-100 border-yellow-200 text-yellow-900 -top-96 ease-in-out',
          t.visible ? 'top-0' : '-top-96 opacity-0',
          baseStyle
        )}
      >
        <div className="flex items-center gap-2">
          <Icon name="triangle-alert" size="lg" />
          <span>{message}</span>
        </div>
      </div>
    ));
  };

  const error = (message: string) => {
    toast.custom((t) => (
      <div
        onClick={() => toast.dismiss(t.id)}
        className={cn(
          'transform-gpu translate-y-0  relative transition-all duration-300 bg-red-100 border-red-200 text-red-600 -top-96 ease-in-out',
          t.visible ? 'top-0' : '-top-96 opacity-0',
          baseStyle
        )}
      >
        <div className="flex items-center gap-2">
          <Icon name="ban" size="lg" />
          <span>{message}</span>
        </div>
      </div>
    ));
  };

  return { info, success, warning, error };
};
