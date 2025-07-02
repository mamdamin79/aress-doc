import React, { useState } from 'react';
import { NewPasswordForm } from '../../NewPasswordForm';
import { OTPForm } from '../../OTPForm';
import { fetchToken } from '../../../(auth)/auth.utils';
import {
  OpenAPI,
  useUsersServiceGetUsersProfilePasswordChangeOtp,
} from '@openapi';
import { useCustomToast } from 'libs/design-system/src/hooks/CustomToast/CustomToast';
enum ChangeNumberStage {
  OTP = 0,
  NEW_PASSWORD = 1,
}
interface ChangePasswordProps {
  onClose?: (success?: boolean) => void;
  phone: string;
}
export const ChangePassword: React.FC<ChangePasswordProps> = ({
  phone,
  onClose,
}) => {
  const [stage, setStage] = useState<ChangeNumberStage | null>(0);
  useUsersServiceGetUsersProfilePasswordChangeOtp();
  const { showToast } = useCustomToast();
  const { mutate, isPending } = useusers();
  const onSaveData = async (code: string) => {
    const token = await fetchToken();
    if (!token) {
      throw new Error('Failed to fetch access token');
    }
    OpenAPI.HEADERS = {
      Authorization: `Bearer ${token}`,
    };
    mutate(
      {
        requestBody: {
          otp: code,
        },
      },
      {
        onSuccess: (response) => {
          onClose?.(true);
          queryClient.invalidateQueries({
            queryKey: ['UsersServiceGetUsersMe'],
          });
        },
        onError: (error: any) => {
          let errorText;
          if (error?.body?.message) {
            errorText = error.body.message;
          } else if (error?.message) {
            errorText = error.message;
          }
          showToast({ message: errorText, type: 'error' });
        },
      },
    );
  };
  return (
    <>
      {stage === ChangeNumberStage.OTP && (
        <OTPForm
          description={`جهت تغییر رمز عبور، ابتدا کد تایید ارسال شده به شماره ${phone} را وارد کنید.`}
          title="کد تایید را وارد کنید"
          onSubmit={() => {}}
          isLoading={false}
        />
      )}
      {stage === ChangeNumberStage.NEW_PASSWORD && (
        <NewPasswordForm
          onSubmit={(values) => onClose?.(true)}
          isStandAlone={false}
        />
      )}
    </>
  );
};
