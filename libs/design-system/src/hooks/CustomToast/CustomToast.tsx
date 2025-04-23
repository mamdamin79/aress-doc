import { toast } from 'react-hot-toast';
import {
  bgIcon,
  icons,
  styleToasts,
  DEFAULT_TOAST_TIMEOUT,
} from './CustomToast.constants';
import { cn } from '../../utils';
import { ProgressToast, ProgressToastProps } from './ProgressToast';
import { CustomToastTypes } from './CustomToast.types';

interface Props {
  message: string;
  type: CustomToastTypes;
}

// Add keyboard accessibility
const showToast = ({ message, type }: Props) => {
  return toast.custom((t) => (
    <div
      onClick={() => toast.dismiss(t.id)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          toast.dismiss(t.id);
        }
      }}
      tabIndex={0}
      role="alert"
      aria-live="assertive"
      className={cn(
        'text-gray-1000 relative -top-96 scale-0 transform-gpu cursor-pointer rounded-xl border-[1.5px] p-3 font-medium transition-all duration-500 ease-in-out',
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

const showProgressToast = ({
  title,
  trailingAction,
  leadingAction,
  timeout = DEFAULT_TOAST_TIMEOUT,
}: ProgressToastProps): ReturnType<typeof toast.custom> => {
  const id = toast.custom(
    (t) => (
      <ProgressToast
        title={title}
        trailingAction={trailingAction}
        leadingAction={leadingAction}
        timeout={timeout}
      />
    ),
    { duration: timeout },
  );

  return id;
};

export const useCustomToast = (): {
  showToast: typeof showToast;
  showProgressToast: typeof showProgressToast;
} => {
  return { showToast, showProgressToast };
};
