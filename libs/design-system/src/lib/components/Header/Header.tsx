import { cn } from '../../../utils';
import { useCustomToast } from '../../../hooks/CustomToast';
import { Toaster } from 'react-hot-toast';

export function Header() {
  const { info, success, error, warning } = useCustomToast();

  return (
    <header dir="rtl" className={cn('ss', 'ff flex flex-col w-fit')}>
      <button onClick={() => info('حالت اطلاع رسانی')}>info</button>
      <button onClick={() => success('رمز یک‌بار مصرف برای شما ارسال شد.')}>
        success
      </button>
      <button onClick={() => error('شماره همراه یا رمز عبور نادرست است.')}>
        error
      </button>
      <button
        onClick={() =>
          warning(
            'بعد از اتمام زمان‌بندی میتوانید برای ارسال مجدد رمز یک‌بار مصرف اقدام کنید.'
          )
        }
      >
        warning
      </button>
      <Toaster />
    </header>
  );
}
