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
  success: ['bg-vividGreen-100', 'bg-vividGreen-300', 'bg-vividGreen-600'],
  error: ['bg-red-100', 'bg-red-300', 'bg-red-600'],
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
      <div className="flex min-h-full items-center justify-center">
        <div className="flex flex-col items-center gap-6">
          <div
            className={cn(
              'absolute -top-9 flex items-center justify-center rounded-full',
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
                  'flex h-16 w-16 items-center justify-center rounded-full px-4 text-white',
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
            <p className="text-center text-xl font-semibold">{title}</p>
            {message && <p className="text-md text-center">{message}</p>}
          </div>

          <Button
            align="center"
            isLoading={false}
            mode="primary"
            size="md"
            onClick={onClose}
          >
            {btnText}
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
