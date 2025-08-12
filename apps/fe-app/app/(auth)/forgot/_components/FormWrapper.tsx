import React from 'react';
import {
  NewPasswordForm,
  OTPForm,
  ResetPasswordForm,
} from '../../../components';
import { Toaster } from 'react-hot-toast';
import { useCustomToast } from 'design-system';
import {
  ApiError,
  useUsersServicePostUsersPasswordForgotOtp,
  useUsersServicePostUsersPasswordForgotReset,
} from '@openapi';
import { ResetPasswordFormValues } from '../../../components/ResetPasswordForm/ResetPasswordForm.types';

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
  const refetchCaptchaRef = React.useRef<() => void>(() => {});
  const { mutate: sendForgotOtp, isPending: isPendingSendForgotOtp } =
    useUsersServicePostUsersPasswordForgotOtp({});

  const { mutate: sendForgotReset, isPending: isPendingSendForgotReset } =
    useUsersServicePostUsersPasswordForgotReset({});

  const [enteredPhoneNumber, setEnteredPhoneNumber] =
    React.useState<string>('');
  const [nationalCode, setNationalCode] = React.useState<string>('');
  const [captchaValues, setCaptchaValues] = React.useState<{
    captchaValue: string;
    captchaUid: number;
  }>({
    captchaValue: '',
    captchaUid: 0,
  });

  const [newPassword, setNewPassword] = React.useState<string>('');

  const [userId, setUserId] = React.useState<number>(0);

  // Handle submit for ResetPasswordForm
  const handleForgotPassword = async (values: ResetPasswordFormValues) => {
    setEnteredPhoneNumber(values.phoneNumber);
    setNationalCode(values.nationalCode);
    setCaptchaValues({
      captchaValue: values.captcha ?? '',
      captchaUid: values.captchaUid ?? 0,
    });

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
          const apiError = error as ApiError;

          const body = apiError.body as { message?: string };

          showToast({
            message:
              body?.message || 'درخواست ناموفق بود. لطفاً دوباره تلاش کنید.',
            type: 'error',
          });

          if (refetchCaptchaRef.current) {
            refetchCaptchaRef.current();
          }
        },
      },
    );
  };

  // Handle resend OTP
  // This function is called when the user clicks the "Resend Code" button
  const handleResendOtp = () => {
    sendForgotOtp(
      {
        requestBody: {
          phoneNumber: enteredPhoneNumber,
          nationalCode: nationalCode,
          captchaValue: captchaValues.captchaValue,
          captchaUid: captchaValues.captchaUid,
        },
      },
      {
        onSuccess: () => {
          showToast({
            message: 'کد تأیید مجدداً ارسال شد.',
            type: 'success',
          });
        },
        onError: (error) => {
          const apiError = error as ApiError;
          const body = apiError.body as { message?: string };

          showToast({
            message: body?.message || 'ارسال مجدد کد با خطا مواجه شد.',
            type: 'error',
          });

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
        requestBody: {
          newPassword,
          otp: code,
          userId,
        },
      },
      {
        onSuccess: () => {
          setIsIconDialogOpen(true);
        },
        onError: (error) => {
          const apiError = error as ApiError;

          const body = apiError.body as { message?: string };

          showToast({
            message:
              body?.message || 'درخواست ناموفق بود. لطفاً دوباره تلاش کنید.',
            type: 'error',
          });

          if (refetchCaptchaRef.current) {
            refetchCaptchaRef.current();
          }
        },
      },
    );
  };

  return (
    <div className="flex w-[448px] flex-col gap-4 pt-8 xl:w-[528px]">
      {activeIndex === 0 && (
        <ResetPasswordForm
          isLoading={isPendingSendForgotOtp}
          onSubmit={handleForgotPassword}
          setRefetchCaptcha={(fn) => {
            refetchCaptchaRef.current = fn;
          }}
        />
      )}
      {activeIndex === 1 && (
        <NewPasswordForm
          onSubmit={(data) => {
            setNewPassword(data.password);
            setActiveIndex(2);
          }}
        />
      )}
      {activeIndex === 2 && (
        <div className="bg-surface-neutral-primary border-border-neutral-primary rounded-2xl border p-6">
          <OTPForm
            onSubmit={handleOtpSubmit}
            onResendCode={handleResendOtp}
            backBtnLabel="ویرایش رمز عبور"
            title="بازنشانی رمز عبور"
            onBackBtn={() => setActiveIndex(1)}
            isLoading={isPendingSendForgotReset}
            description={`جهت تغییر رمز عبور، ابتدا کد تایید ارسال شده به شماره ${enteredPhoneNumber} را وارد کنید.`}
          />
        </div>
      )}
      <Toaster position="top-center" />
    </div>
  );
};
