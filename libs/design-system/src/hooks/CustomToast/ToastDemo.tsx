import { Toaster } from 'react-hot-toast';
import { CustomToast } from './CustomToast';

interface Props {
  message: string;
  type: 'error' | 'success' | 'info' | 'warning';
}
export function ToastDemo({ message, type }: Props) {
  const { showToast } = CustomToast();
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
