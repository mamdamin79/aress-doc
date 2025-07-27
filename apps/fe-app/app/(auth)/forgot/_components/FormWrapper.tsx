import React from 'react';
import {
  NewPasswordForm,
  OTPForm,
  ResetPasswordForm,
} from '../../../components';
import { Toaster } from 'react-hot-toast';
import { useCustomToast } from 'libs/design-system/src/hooks/CustomToast/CustomToast';
import {
  useUsersServicePostUsersPasswordForgotOtp,
  useUsersServicePostUsersPasswordForgotReset,
} from '@openapi';
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
    useUsersServicePostUsersPasswordForgotOtp({});

  const { mutate: sendForgotReset } =
    useUsersServicePostUsersPasswordForgotReset({});

  const [enteredPhoneNumber, setEnteredPhoneNumber] =
    React.useState<string>('');

    const [newPassword, setNewPassword] =
    React.useState<string>('');

    const [userId, setUserId] =
    React.useState<number>(0);

  // Handle submit for ResetPasswordForm
  const handleForgotPassword = (values: ResetPasswordFormValues) => {
    setEnteredPhoneNumber(values.phoneNumber);
    sendForgotOtp(
      {
        requestBody: {
          nationalCode: values.nationalCode,
          phoneNumber: values.phoneNumber,
          captchaValue: values.captcha ?? '',
          captchaUid: values.captchaUid ?? 0,
        },
      },
      {
        onSuccess: (data) => {
          setActiveIndex(1);
          setUserId(data.userId);
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
    sendForgotReset(
      {
        requestBody:{
          newPassword,
          otp:code,
          userId
        }
      },
      {
        onSuccess: () => {
          setIsIconDialogOpen(true);
        },
        onError: (error) => {
          console.error('Error submitting OTP:', error);
          showToast({
            message:
              error?.message || 'کد تایید نامعتبر است. لطفاً دوباره تلاش کنید.',
            type: 'error',
          });
        },
      },
    );
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
        <NewPasswordForm onSubmit={(data) => {
          console.log('New Password Data:', data);
          setNewPassword(data.password);
          setActiveIndex(2);
        }} />
      )}
      {activeIndex === 2 && (
        <div className="bg-surface-neutral-primary border-border-neutral-primary rounded-2xl border p-6">
          <OTPForm
            onSubmit={handleOtpSubmit}
            backBtnLabel="ویرایش شماره"
            title="بازنشانی رمز عبور"
            onBackBtn={() => setActiveIndex(0)}
            description={`جهت تغییر رمز عبور، ابتدا کد تایید ارسال شده به شماره ${enteredPhoneNumber} را وارد کنید.`}
          />
        </div>
      )}
      <Toaster position="top-center" />
    </div>
  );
};
