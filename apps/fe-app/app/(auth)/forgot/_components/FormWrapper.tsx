import React from 'react';
import {
  NewPasswordForm,
  OTPForm,
  ResetPasswordForm,
} from '../../../components';
import { Toaster } from 'react-hot-toast';
import { useCustomToast } from 'libs/design-system/src/hooks/CustomToast/CustomToast';
import { useUsersServicePostUsersPasswordForgotOtp } from '@openapi';
import { ResetPasswordFormValues } from 'apps/fe-app/app/components/ResetPasswordForm/ResetPasswordForm.types';

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
  const refetchCaptchaRef = React.useRef<() => void>();
  const { mutate: sendForgotOtp, isPending } =
    useUsersServicePostUsersPasswordForgotOtp({

    });

  // Handle submit for ResetPasswordForm
  const handleForgotPassword = (values:ResetPasswordFormValues) => {
    sendForgotOtp(
      {
        requestBody: {
          nationalCode: values.nationalCode,
          phoneNumber: values.phoneNumber,
          captchaValue: values.captcha,
          captchaUid: values.captchaUid,
        },
      },
      {
        onSuccess: (data) => {
          // You may want to check data for success
          setActiveIndex(1);
        },
        onError: (error) => {
          console.error('Error sending forgot password OTP:', error);
          showToast({
            message:
              error?.message || 'درخواست ناموفق بود. لطفاً دوباره تلاش کنید.',
            type: 'error',
          });
          // Refetch captcha on error
          if (refetchCaptchaRef.current) {
            refetchCaptchaRef.current();
          }
        },
      },
    );
  };

  // OTP step handler (unchanged)
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
          onSubmit={handleForgotPassword}
          setRefetchCaptcha={(fn) => {
            refetchCaptchaRef.current = fn;
          }}
        />
      )}
      {activeIndex === 1 && (
        <NewPasswordForm onSubmit={() => setIsIconDialogOpen(true)} />
      )}
      {activeIndex === 2 && (
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
      <Toaster position="top-center" />
    </div>
  );
};
