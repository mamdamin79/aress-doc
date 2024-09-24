import { Button, Dialog, DialogPanel, Transition } from '@headlessui/react';
import { Fragment } from 'react';

// type data prop for modal
interface IconDialogItem {
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

export function IconDialog({
  title,
  message,
  onClose,
  isOpen,
  mode,
}: IconDialogItem) {
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
              className="w-96 h-60 relative flex flex-col items-center shadow rounded-[20px] pt-16 px-6 pb-6"
            >
              <div
                className={`absolute -top-12 w-24 h-24 flex items-center justify-center rounded-full ${colors[mode][0]}`}
              >
                <div
                  className={`rounded-full flex items-center justify-center w-20 h-20 ${colors[mode][1]}`}
                >
                  <div
                    className={`rounded-full px-4 w-16 flex justify-center items-center h-16 ${colors[mode][2]}`}
                  >
                    <img
                      src={`${
                        mode === 'error'
                          ? 'icons/vectors/error.svg'
                          : 'icons/vectors/success.svg'
                      }`}
                      alt="vector icon"
                    />
                  </div>
                </div>
              </div>
              <p className="text-xl text-center leading-9 font-semibold">
                {title}
              </p>
              <p className="mt-4 text-center leading-[30px]">{message}</p>
              <Button
                onClick={onClose}
                className="w-full mt-6 py-2 text-white rounded-lg font-semibold transition-colors duration-300 h-12 hover:bg-brand-700 bg-[#009695]"
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
