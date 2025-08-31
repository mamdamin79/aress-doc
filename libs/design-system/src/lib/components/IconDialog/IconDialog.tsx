import { cn } from '../../../utils';
import { Icon } from '../Icon';
import { Button } from '../Button';
import { Dialog } from '../Dialog';

// type data prop for modal
interface Props {
  title: string;
  message?: string;
  onClose: () => void;
  isOpen: boolean;
  mode: 'error' | 'success';
  btnText?: string;
}

// color variable for bg icon modal
const colors = {
  success: [
    'bg-surface-accent-vividgreen-100',
    'bg-surface-accent-vividgreen-300',
    'bg-surface-accent-vividgreen-600',
  ],
  error: [
    'bg-surface-message-error-100-soft',
    'bg-surface-message-error-300-disable',
    'bg-surface-message-error-600-primary',
  ],
};

export function IconDialog({
  title,
  message,
  onClose,
  isOpen,
  mode,
  btnText = 'بستن',
}: Props) {
  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      className="relative p-6 pt-16"
      showCloseBtn={false}
    >
      <div className="flex flex-col items-center gap-6">
        <div
          className={cn(
            'absolute -top-12 flex h-[100px] w-[100px] items-center justify-center rounded-full',
            colors[mode][0],
          )}
        >
          <div
            className={cn(
              'flex h-20 w-20 items-center justify-center rounded-full',
              colors[mode][1],
            )}
          >
            <div
              className={cn(
                'text-icon-onaccent-neutral-on600 flex h-16 w-16 items-center justify-center rounded-full',
                colors[mode][2],
              )}
            >
              {mode === 'error' ? (
                <Icon name="x" size="xl" />
              ) : (
                <Icon name="check" size="xl" />
              )}
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col gap-4">
          <p className="text-center text-xl font-medium">{title}</p>
          {message && (
            <p className="text-md text-center font-normal">{message}</p>
          )}
        </div>

        <Button
          theme="brand"
          align="center"
          isLoading={false}
          mode="primary"
          size="md"
          onClick={onClose}
          className="w-[348px]"
        >
          {btnText}
        </Button>
      </div>
    </Dialog>
  );
}
