import React, { useState } from 'react';
import { NewPasswordForm } from '../../NewPasswordForm';
import { OTPForm } from '../../OTPForm';
import { fetchToken } from '../../../(auth)/auth.utils';
import {
  OpenAPI,
  useUsersServiceGetUsersProfilePasswordChangeOtp,
  useUsersServicePostUsersProfilePasswordChange,
} from '@openapi';
import { useCustomToast } from 'design-system';
enum ChangeNumberStage {
  OTP = 0,
  NEW_PASSWORD = 1,
}
interface ChangePasswordProps {
  onClose?: (success?: boolean) => void;
  phone: string;
}
const genericErrorText = 'خطایی رخ داد.';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const extractErrorMessage = (error: any) =>
  error?.body?.message || error?.message || genericErrorText;
export const ChangePassword: React.FC<ChangePasswordProps> = ({
  phone,
  onClose,
}) => {
  const [stage, setStage] = useState<ChangeNumberStage | null>(1);
  const [newPassword, setNewPassword] = useState('');
  const { data, refetch } = useUsersServiceGetUsersProfilePasswordChangeOtp();
  const { mutate } = useUsersServicePostUsersProfilePasswordChange();
  const { showToast } = useCustomToast();
  const passwordMutate = (password: string, otpCode: string) => {
    mutate(
      {
        requestBody: {
          newPassword: password,
          otp: otpCode,
        },
      },
      {
        onError: (error) =>
          showToast({ message: extractErrorMessage(error), type: 'error' }),
        onSuccess() {
          onClose?.(true);
        },
      },
    );
  };
  const onSaveData = async (password: string, otpCode: string) => {
    const token = await fetchToken();
    if (!token) {
      throw new Error('Failed to fetch access token');
    }
    OpenAPI.HEADERS = {
      Authorization: `Bearer ${token}`,
    };
    passwordMutate(password, otpCode);
  };
  return (
    <>
      {stage === ChangeNumberStage.NEW_PASSWORD && (
        <NewPasswordForm
          onSubmit={(data) => {
            setNewPassword(data.password);
            setStage(ChangeNumberStage.OTP);
          }}
          isStandAlone={false}
        />
      )}
      {stage === ChangeNumberStage.OTP && (
        <OTPForm
          description={`جهت تغییر رمز عبور، ابتدا کد تایید ارسال شده به شماره ${phone} را وارد کنید.`}
          title="کد تایید را وارد کنید"
          onSubmit={(code) => {
            onSaveData(newPassword, code);
          }}
          isLoading={false}
          countdownSeconds={data?.retrySeconds ?? 120}
          onResendCode={refetch}
        />
      )}
    </>
  );
};
