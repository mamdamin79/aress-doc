import { Button, Dialog, DialogPanel } from '@headlessui/react';
import { cn } from '../../../utils';
import { Icon } from '../Icon';

// type data prop for modal
interface Props {
  title: string;
  message: string;
  onClose: () => void;
  isOpen: boolean;
  mode: 'error' | 'success';
}

// color variable for bg icon modal
const colors = {
  success: ['bg-vividGreen-100', 'bg-vividGreen-300', 'bg-vividGreen-600'],
  error: ['bg-red-100', 'bg-red-300', 'bg-red-600'],
};

export function IconDialog({ title, message, onClose, isOpen, mode }: Props) {
  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={onClose}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="data-[closed]:transform-[scale(1)] bg-baseBackground relative flex h-60 w-96 flex-col items-center rounded-3xl px-6 pb-6 pt-16 shadow-lg duration-300 ease-out data-[closed]:scale-50 data-[closed]:opacity-0"
          >
            <div
              className={cn(
                'absolute -top-12 flex h-24 w-24 items-center justify-center rounded-full',
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
            <p className="text-center text-xl font-semibold">{title}</p>
            <p className="text-md mt-4 text-center">{message}</p>
            <Button
              onClick={onClose}
              className="hover:bg-brand-700 bg-brand-600 mt-6 w-full rounded-lg py-2 font-semibold text-white transition-colors duration-300"
            >
              بستن
            </Button>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
