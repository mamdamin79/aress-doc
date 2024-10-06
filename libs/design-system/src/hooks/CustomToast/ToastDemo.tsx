import { Toaster } from 'react-hot-toast';
import { CustomToast } from './CustomToast/CustomToast';

interface Props {
  message: string;
  type: 'error' | 'success' | 'info' | 'warning';
}
export function ToastDemo({ message, type }: Props) {
  const { showToast } = CustomToast();
  return (
    <>
      <div
        className="cursor-pointer border p-2 rounded-md w-fit"
        onClick={() => showToast({ message, type })}
      >
        show toast
      </div>
      <Toaster />
    </>
  );
}
