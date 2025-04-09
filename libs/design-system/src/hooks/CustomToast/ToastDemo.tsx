import { Toaster } from 'react-hot-toast';
import { useCustomToast } from './CustomToast';
import { CustomToastTypes } from './CustomToast.types';

interface Props {
  message: string;
  type: CustomToastTypes;
}
export function ToastDemo({ message, type }: Props) {
  const { showToast } = useCustomToast();
  return (
    <>
      <div
        className="w-fit cursor-pointer rounded-md border p-2"
        onClick={() => showToast({ message, type })}
      >
        show toast
      </div>
      <Toaster />
    </>
  );
}
