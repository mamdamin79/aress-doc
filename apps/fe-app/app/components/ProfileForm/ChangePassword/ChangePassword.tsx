import React, { useState } from 'react';
import { OTPForm } from '../OTPForm';
import { NewPasswordForm } from '../../NewPasswordForm';
enum ChangeNumberStage {
  OTP = 0,
  NEW_PASSWORD = 1,
}

export const ChangePassword = ({
  onClose,
}: {
  onClose?: (success?: boolean) => void;
}) => {
  const [stage, setStage] = useState<ChangeNumberStage | null>(0);

  return (
    <>
      {stage === ChangeNumberStage.OTP && (
        <OTPForm
          backButtonText="کد تایید را وارد کنید"
          description="جهت تغییر رمز عبور، ابتدا کد تایید ارسال شده به شماره 09339133227 را وارد کنید."
          onBackBtn={() => onClose?.(false)}
          title="کد تایید را وارد کنید"
          onSubmit={() => {
            setStage(ChangeNumberStage.NEW_PASSWORD);
          }}
        />
      )}
      {stage === ChangeNumberStage.NEW_PASSWORD && (
        <NewPasswordForm onClick={() => onClose?.(true)} />
      )}
    </>
  );
};
