import { Button, TextField, useCustomToast } from 'design-system';
import React, { useState } from 'react';
import { InputPasswordForm } from '../ChangeNumber';
import { Controller, useForm } from 'react-hook-form';
import { OTPForm } from '../../OTPForm';
import {
  useUsersServicePostUsersProfileEmailChange,
  useUsersServicePostUsersProfileEmailChangeOtp,
} from '@openapi';

const SectionHeader = ({ title }: { title: string }) => (
  <span className="text-md text-text-neutral-primary text-center font-medium">
    {title}
  </span>
);
const genericErrorText = 'خطایی رخ داد.';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const extractErrorMessage = (error: any) =>
  error?.body?.message || error?.message || genericErrorText;
interface NewMailFormValues {
  email: string;
}
const NewMailForm = ({
  email,
  onSubmit,
}: {
  email?: string;
  onSubmit?: (email: NewMailFormValues) => void;
}) => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<NewMailFormValues>({
    defaultValues: {
      email: '',
    },
  });

  const onSaveData = async (data: NewMailFormValues) => {
    await new Promise((r) => setTimeout(r, 2000));
    onSubmit?.(data);
  };
  return (
    <form
      dir="rtl"
      className="flex w-full flex-col gap-6 text-right"
      onSubmit={handleSubmit(onSaveData)}
    >
      <div className="flex w-full flex-row justify-between">
        <span className="w-1/3"></span>
        <SectionHeader title="ایمیل جدید" />
        <div className="text-text-brand-primary-600 flex w-1/3 flex-row justify-end text-sm font-medium"></div>
      </div>
      <span className="mt-4 text-sm">
        <span className="text-text-neutral-primary font-medium">
          ایمیل فعلی:
        </span>
        {email}
      </span>
      <Controller
        name="email"
        control={control}
        rules={{
          required: {
            value: true,
            message: 'این فیلد اجباری است.',
          },
          validate: (value) => {
            const isValidEmail = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/i.test(
              value,
            );

            if (!isValidEmail) {
              return 'لطفا یک ایمیل معتبر وارد کنید.';
            }

            return true;
          },
        }}
        render={({ field, fieldState }) => (
          <TextField
            mergeTitleAndPlaceholder={false}
            mode="outline"
            type="text"
            label="ایمیل جدید"
            placeholder="ایمیل جدید را وارد کنید..."
            trailingIcons={[]}
            isError={!!fieldState.error}
            supportText={fieldState.error?.message}
            {...field}
          />
        )}
      />
      <Button
        theme="brand"
        align="center"
        mode="primary"
        isLoading={isSubmitting}
        size="md"
        type="submit"
      >
        دریافت کد تایید
      </Button>
    </form>
  );
};

enum ChangeMailStage {
  PASSWORD = 0,
  NEW_MAIL = 1,
  OTP = 2,
}

export const ChangeMail = ({
  onClose,
  currentMail,
}: {
  onClose?: (success?: boolean) => void;
  currentMail: string;
}) => {
  const [stage, setStage] = useState<ChangeMailStage | null>(0);
  const [newMail, setNewMail] = useState<string | null>(null);
  const [passwordVerificationToken, setPasswordVerificationToken] =
    useState('');
  const [retrySeconds, setRetrySeconds] = useState(120);

  const { showToast } = useCustomToast();

  const { mutate, isPending } = useUsersServicePostUsersProfileEmailChange();

  const verifyOtp = async (otp: string) => {
    mutate(
      { requestBody: { otp } },
      {
        onSuccess: () => {
          onClose?.(true);
        },
        onError: (error) =>
          showToast({ message: extractErrorMessage(error), type: 'error' }),
      },
    );
  };

  const { mutate: otpMutate } = useUsersServicePostUsersProfileEmailChangeOtp();

  // accepts optional email param
  const resendOTP = async (emailParam?: string) => {
    const emailToUse = emailParam || newMail;
    if (!emailToUse || !passwordVerificationToken) return;

    otpMutate(
      {
        requestBody: {
          newEmail: emailToUse,
          passwordVerificationToken,
        },
      },
      {
        onError: (error) =>
          showToast({ message: extractErrorMessage(error), type: 'error' }),
        onSuccess(response) {
          setRetrySeconds(response.retrySeconds);
        },
      },
    );
  };

  return (
    <>
      {stage === ChangeMailStage.PASSWORD && (
        <InputPasswordForm
          onSubmit={(token) => {
            setPasswordVerificationToken(token);
            setStage(ChangeMailStage.NEW_MAIL);
          }}
          title="ایمیل جدید"
          subTitle="جهت تغییر ایمیل، ابتدا رمز فعلی خود را وارد کنید."
        />
      )}

      {stage === ChangeMailStage.NEW_MAIL && (
        <NewMailForm
          email={currentMail}
          onSubmit={(data) => {
            setNewMail(data.email);
            resendOTP(data.email);
            setStage(ChangeMailStage.OTP);
          }}
        />
      )}

      {stage === ChangeMailStage.OTP && (
        <OTPForm
          description={`کد تایید ارسال شده به ${newMail} را وارد کنید.`}
          backBtnLabel="ویرایش ایمیل"
          onBackBtn={() => setStage(ChangeMailStage.NEW_MAIL)}
          title="ایمیل جدید"
          onSubmit={verifyOtp}
          onResendCode={resendOTP}
          isLoading={isPending}
          countdownSeconds={retrySeconds}
        />
      )}
    </>
  );
};
