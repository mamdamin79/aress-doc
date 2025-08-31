// imports
import React, { useState } from 'react';
import { Button, Icon, TextField } from 'design-system';
import { Controller, useForm } from 'react-hook-form';
import { OTPForm } from '../../OTPForm';
import {
  useUsersServicePostUsersProfilePasswordValidate,
  useUsersServicePostUsersProfilePhoneChange,
  useUsersServicePostUsersProfilePhoneChangeOtp,
} from '@openapi';
import { queryClient } from '../../../lib/react-query';
import { useCustomToast } from 'design-system';

const genericErrorText = 'خطایی رخ داد.';

const SectionHeader = ({ title }: { title: string }) => (
  <span className="text-md text-text-neutral-primary text-center font-medium">
    {title}
  </span>
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const extractErrorMessage = (error: any) =>
  error?.body?.message || error?.message || genericErrorText;

// Input Password Form
interface InputPasswordFormValues {
  password: string;
}

export const InputPasswordForm = ({
  onSubmit,
  title,
  subTitle,
}: {
  onSubmit?: (token: string) => void;
  title?: string;
  subTitle?: string;
}) => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    setError,
  } = useForm<InputPasswordFormValues>({ defaultValues: { password: '' } });

  const { mutate, isPending } =
    useUsersServicePostUsersProfilePasswordValidate();

  const onSaveData = async (data: InputPasswordFormValues) => {
    mutate(
      { requestBody: { password: data.password } },
      {
        onSuccess: (res) => onSubmit?.(res.passwordVerificationToken),
        onError: (error) =>
          setError('password', {
            type: 'manual',
            message: extractErrorMessage(error),
          }),
      },
    );
  };

  return (
    <form
      dir="rtl"
      className="flex w-full flex-col gap-6 text-right"
      onSubmit={handleSubmit(onSaveData)}
    >
      <SectionHeader title={title || ''} />
      <span className="text-text-neutral-primary mt-4 text-sm">{subTitle}</span>
      <Controller
        name="password"
        control={control}
        rules={{ required: 'این فیلد اجباری است.' }}
        render={({ field, fieldState }) => (
          <TextField
            type="password"
            mode="outline"
            label="رمز عبور"
            placeholder="رمز عبور فعلی خود را وارد کنید..."
            isError={!!fieldState.error}
            supportText={fieldState.error?.message || ' '}
            mergeTitleAndPlaceholder={false}
            trailingIcons={[
              { name: 'x', size: 'lg' },
              { name: 'eye', size: 'lg' },
            ]}
            {...field}
          />
        )}
      />
      <Button
        theme="brand"
        align="center"
        mode="primary"
        isLoading={isSubmitting || isPending}
        size="md"
        type="submit"
      >
        تایید
      </Button>
    </form>
  );
};

// New Number Form
interface NewNumberFormValues {
  phoneNumber: string;
}

const NewNumber = ({
  onSubmit,
  title,
  passwordVerificationToken,
}: {
  onSubmit?: (data: NewNumberFormValues) => void;
  title?: string;
  passwordVerificationToken: string;
}) => {
  const {
    control,
    handleSubmit,
    setError,
    formState: { isSubmitting },
  } = useForm<NewNumberFormValues>({ defaultValues: { phoneNumber: '' } });

  const { mutate, isPending } = useUsersServicePostUsersProfilePhoneChangeOtp();

  const onSaveData = async (data: NewNumberFormValues) => {
    mutate(
      {
        requestBody: {
          newPhoneNumber: data.phoneNumber,
          passwordVerificationToken,
        },
      },
      {
        onSuccess: (res) => onSubmit?.({ phoneNumber: res.phoneNumber }),
        onError: (error) =>
          setError('phoneNumber', {
            type: 'manual',
            message: extractErrorMessage(error),
          }),
      },
    );
  };

  return (
    <form
      dir="rtl"
      className="flex w-full flex-col gap-6 text-right"
      onSubmit={handleSubmit(onSaveData)}
    >
      <div className="flex w-full justify-between">
        <span className="w-1/3" />
        <SectionHeader title={title || ''} />
        <div className="text-text-brand-primary-600 flex w-1/3 justify-end text-sm font-medium" />
      </div>
      <div className="flex items-center gap-2">
        <div className="bg-surface-message-warning-100-soft text-icon-onmessage-colored-onwarning-on100 flex h-8 w-8 items-center justify-center rounded-full">
          <Icon name="triangle-alert" size="md" />
        </div>
        <span className="text-text-neutral-primary text-sm">
          دقت کنید که شماره وارد شده حتما باید به نام خودتان باشد.
        </span>
      </div>
      <Controller
        name="phoneNumber"
        control={control}
        rules={{
          required: 'این فیلد اجباری است.',
          validate: (val) =>
            /^09[0-9]{9}$/.test(val) || 'لطفا یک شماره همراه معتبر وارد کنید',
        }}
        render={({ field, fieldState }) => (
          <TextField
            type="text"
            mode="outline"
            label="شماره همراه جدید"
            placeholder="شماره همراه جدید را وارد کنید..."
            isError={!!fieldState.error}
            supportText={fieldState.error?.message || ' '}
            mergeTitleAndPlaceholder={false}
            trailingIcons={[]}
            {...field}
          />
        )}
      />
      <Button
        theme="brand"
        align="center"
        mode="primary"
        isLoading={isSubmitting || isPending}
        size="md"
        type="submit"
      >
        دریافت کد تایید
      </Button>
    </form>
  );
};

// Main ChangeNumber Component
enum ChangeNumberStage {
  PASSWORD,
  NEW_NUMBER,
  OTP,
}

export const ChangeNumber = ({
  onClose,
}: {
  onClose?: (success?: boolean) => void;
}) => {
  const [stage, setStage] = useState<ChangeNumberStage>(
    ChangeNumberStage.PASSWORD,
  );
  const [newNumber, setNewNumber] = useState<string | null>(null);
  const [passwordVerificationToken, setPasswordVerificationToken] =
    useState('');
  const [retrySeconds, setRetrySeconds] = useState(120);
  const { showToast } = useCustomToast();

  const { mutate, isPending } = useUsersServicePostUsersProfilePhoneChange();

  const verifyOtp = async (otp: string) => {
    mutate(
      { requestBody: { otp } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['UsersServiceGetUsersMe'],
          });
          onClose?.(true);
        },
        onError: (error) =>
          showToast({ message: extractErrorMessage(error), type: 'error' }),
      },
    );
  };

  const resendOTP = async () => {
    if (!newNumber || !passwordVerificationToken) return;
    const otpMutate = useUsersServicePostUsersProfilePhoneChangeOtp().mutate;
    otpMutate(
      {
        requestBody: {
          newPhoneNumber: newNumber,
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
      {stage === ChangeNumberStage.PASSWORD && (
        <InputPasswordForm
          title="شماره همراه جدید"
          subTitle="جهت تغییر شماره همراه، ابتدا رمز فعلی خود را وارد کنید."
          onSubmit={(token) => {
            setPasswordVerificationToken(token);
            setStage(ChangeNumberStage.NEW_NUMBER);
          }}
        />
      )}
      {stage === ChangeNumberStage.NEW_NUMBER && (
        <NewNumber
          title="شماره همراه جدید"
          passwordVerificationToken={passwordVerificationToken}
          onSubmit={(data) => {
            setNewNumber(data.phoneNumber);
            setStage(ChangeNumberStage.OTP);
            showToast({ message: 'کد تایید ارسال شد.', type: 'info' });
          }}
        />
      )}
      {stage === ChangeNumberStage.OTP && (
        <OTPForm
          title="شماره همراه جدید"
          description={`کد تایید ارسال شده به ${newNumber} را وارد کنید.`}
          backBtnLabel="ویرایش شماره"
          onBackBtn={() => setStage(ChangeNumberStage.NEW_NUMBER)}
          onSubmit={verifyOtp}
          onResendCode={resendOTP}
          isLoading={isPending}
          countdownSeconds={retrySeconds}
        />
      )}
    </>
  );
};
