import React from 'react';
import {
  NewPasswordForm,
  OTPForm,
  ResetPasswordForm,
} from '../../../components';

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
  return (
    <div className="flex w-[448px] flex-col gap-4 pt-8 xl:w-[528px]">
      {activeIndex === 0 && (
        <ResetPasswordForm onSubmit={() => setActiveIndex(1)} />
      )}
      {activeIndex === 1 && (
        <div className="bg-baseBackground rounded-2xl border border-gray-300 p-6">
          <OTPForm
            onSubmit={() => setActiveIndex(2)}
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
    </div>
  );
};
