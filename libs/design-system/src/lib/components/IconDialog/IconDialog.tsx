import { Button, Dialog, DialogPanel, Transition } from '@headlessui/react';
import { cn } from '../../../utils';
import { Fragment } from 'react';
import { Icon } from '../IconComponent';

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
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <DialogPanel
              transition
              className="w-96 h-60 relative flex flex-col items-center shadow-lg rounded-3xl pt-16 px-6 pb-6"
            >
              <div
                className={cn(
                  'absolute -top-12 w-24 h-24 flex items-center justify-center rounded-full',
                  colors[mode][0]
                )}
              >
                <div
                  className={cn(
                    'rounded-full flex items-center justify-center w-20 h-20',
                    colors[mode][1]
                  )}
                >
                  <div
                    className={cn(
                      'rounded-full text-white px-4 w-16 flex justify-center items-center h-16',
                      colors[mode][2]
                    )}
                  >
                    {mode === 'error' ? (
                      <Icon name="x" size="lg" />
                    ) : (
                      <Icon name="check" size="lg" />
                    )}
                  </div>
                </div>
              </div>
              <p className="text-xl text-center font-semibold">{title}</p>
              <p className="mt-4 text-center text-md">{message}</p>
              <Button
                onClick={onClose}
                className="w-full mt-6 text-white py-2 rounded-lg font-semibold transition-colors duration-300 hover:bg-brand-700 bg-brand-600"
              >
                بستن
              </Button>
            </DialogPanel>
          </Transition.Child>
        </div>
      </div>
    </Dialog>
  );
}
