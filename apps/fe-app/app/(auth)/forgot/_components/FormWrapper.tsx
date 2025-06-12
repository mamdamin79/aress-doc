import React from 'react';
import {
  NewPasswordForm,
  OTPForm,
  ResetPasswordForm,
} from '../../../components';
import { Toaster } from 'react-hot-toast';
import { useCustomToast } from 'libs/design-system/src/hooks/CustomToast/CustomToast';

interface FormWrapperProps {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  setIsIconDialogOpen: (open: boolean) => void;
}

export const FormWrapper: React.FC<FormWrapperProps> = ({
  activeIndex,
  setActiveIndex,
  setIsIconDialogOpen,
}) => {
  const { showToast } = useCustomToast();
  const handleOtpSubmit = (code: string) => {
    if (code === '111111') setActiveIndex(2);
    else
      showToast({
        message:
          'کد وارد شده اشتباه است. پس از پایان زمان‌بندی، می‌توانید مجددا درخواست کد کنید.',
        type: 'error',
      });
  };
  return (
    <div className="flex w-[448px] flex-col gap-4 pt-8 xl:w-[528px]">
      {activeIndex === 0 && (
        <ResetPasswordForm
          onSubmit={() => {
            setActiveIndex(1);
            showToast({
              message: 'کد تایید برای شما ارسال شد.',
              type: 'success',
            });
          }}
        />
      )}
      {activeIndex === 1 && (
        <div className="bg-surface-neutral-primary border-border-neutral-primary rounded-2xl border p-6">
          <OTPForm
            onSubmit={handleOtpSubmit}
            backBtnLabel="ویرایش شماره"
            title="بازنشانی رمز عبور"
            onBackBtn={() => setActiveIndex(0)}
            description="جهت تغییر رمز عبور، ابتدا کد تایید ارسال شده به شماره 09339133225 را وارد کنید."
          />
        </div>
      )}
      {activeIndex === 2 && (
        <NewPasswordForm onSubmit={() => setIsIconDialogOpen(true)} />
      )}
      <Toaster position="top-center" />
    </div>
  );
};
