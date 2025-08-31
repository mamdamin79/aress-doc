'use client';
import React, { useState } from 'react';
import { Button, Checkbox, TextField } from 'design-system';
import { Controller, useForm } from 'react-hook-form';
import { OTPForm } from './OTPForm';
import { validateNationalCode } from '@shared';
import Link from 'next/link';

type AuthType = 'login' | 'signup';

interface AuthFormProps {
  currentStep: number;
  onNextStep: () => void;
  onPrevStep: () => void;
  type: AuthType;
}

interface NationalIdFormValues {
  nationalCode: string;
}

const SectionHeader = ({ title }: { title: string }) => (
  <span className="text-md text-text-neutral-primary text-center font-medium">
    {title}
  </span>
);

const authConfig = {
  login: {
    title: 'ورود به آرسس اینوستور',
    description:
      'با ارائه شماره ملی، پیامک تایید از آرسس اینوستور به موبایل‌تان ارسال می‌شود.',
  },
  signup: {
    title: 'ورود به آرسس اینوستور',
    description:
      'با ارائه شماره ملی، پیامک تایید از سجام به موبایل‌تان ارسال می‌شود.',
  },
};

// National ID Form Component
const NationalIdForm = ({
  onSubmit,
  type,
}: {
  onSubmit: (data: NationalIdFormValues) => void;
  type: AuthType;
}) => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    setError,
  } = useForm<NationalIdFormValues>({
    defaultValues: { nationalCode: '' },
  });

  const onSaveData = async (data: NationalIdFormValues) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      onSubmit(data);
    } catch {
      setError('nationalCode', {
        type: 'manual',
        message: 'خطا در ارسال اطلاعات',
      });
    }
  };

  const config = authConfig[type];
  const [confirmedRules, setConfirmedRules] = useState(false);
  return (
    <form
      dir="rtl"
      className="bg-surface-neutral-primary border-border-neutral-primary flex w-full flex-col gap-4 rounded-3xl border p-6"
      onSubmit={handleSubmit(onSaveData)}
    >
      <SectionHeader title={config.title} />

      <span className="text-text-neutral-secondary text-center text-sm">
        {config.description}
      </span>
      <div className="text-text-neutral-secondary mt-12">
        <Controller
          name="nationalCode"
          control={control}
          rules={{
            required: {
              value: true,
              message: 'این فیلد اجباری است.',
            },
            validate: (value) => {
              if (!validateNationalCode(value)) {
                return 'لطفا یک کد ملی معتبر وارد کنید.';
              }
              return true;
            },
          }}
          render={({ field, fieldState }) => (
            <TextField
              mergeTitleAndPlaceholder={false}
              mode="outline"
              trailingIcons={[]}
              label="کد ملی / شناسه ملی"
              placeholder="1234567890"
              isError={!!fieldState.error}
              supportText={fieldState.error?.message || ' '}
              maxLength={10}
              type="text"
              {...field}
            />
          )}
        />
      </div>
      <Checkbox
        onChange={() => setConfirmedRules((prev) => !prev)}
        checked={confirmedRules}
        reactcontent={
          <div className="flex flex-row gap-2 font-medium">
            <span className="text-text-brand-primary-600">قوانین و مقررات</span>
            <span className="text-text-neutral-primary">
              آرسس اینوستور را می‌پذیرم
            </span>
          </div>
        }
      />
      <div className="flex flex-row justify-center gap-4">
        <Button
          theme="brand"
          align="center"
          mode="primary"
          isLoading={isSubmitting}
          size="md"
          type="submit"
          disabled={!confirmedRules}
        >
          ادامه
        </Button>

        <Link href={'/AuthLanding'} className="w-full">
          <Button
            theme="brand"
            className="font-medium"
            align="center"
            isLoading={false}
            mode="secondary"
            size="md"
            type="button"
          >
            بازگشت
          </Button>
        </Link>
      </div>
    </form>
  );
};

// Main AuthForm Component
export const AuthForm: React.FC<AuthFormProps> = ({
  currentStep,
  onNextStep,
  onPrevStep,
  type,
}) => {
  const [nationalId, setNationalId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [retrySeconds, setRetrySeconds] = useState(120);

  const handleNationalIdSubmit = (data: NationalIdFormValues) => {
    setNationalId(data.nationalCode);
    onNextStep();
  };

  const handleOTPSubmit = async (code: string) => {
    setIsLoading(true);

    try {
      // Simulate API call for OTP verification
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Handle successful login/signup
      console.log(`${type} successful with OTP:`, code);
      // Redirect to dashboard or handle success
    } catch (error) {
      console.error('OTP verification failed:', error);
    } finally {
      setIsLoading(false);
      onNextStep();
    }
  };

  const handleResendCode = async () => {
    try {
      // Simulate resend OTP API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      console.log('OTP resent');
      setRetrySeconds(120); // Reset countdown
    } catch (error) {
      console.error('Failed to resend OTP:', error);
    }
  };

  if (currentStep === 0) {
    return (
      <div className="mx-auto h-[355px] w-[528px]">
        <NationalIdForm onSubmit={handleNationalIdSubmit} type={type} />
      </div>
    );
  }

  if (currentStep === 1) {
    return (
      <div className="mx-auto h-[355px] w-[528px]">
        <div className="bg-surface-neutral-primary border-border-neutral-primary flex w-full flex-col gap-6 rounded-3xl border p-6">
          <OTPForm
            title="کد تایید را وارد نمایید"
            description={`کد تایید ارسال شده به شماره ${nationalId} را وارد کنید`}
            onSubmit={handleOTPSubmit}
            onBackBtn={onPrevStep}
            backBtnLabel="ویرایش کد ملی"
            isLoading={isLoading}
            onResendCode={handleResendCode}
            countdownSeconds={retrySeconds}
          />
        </div>
      </div>
    );
  }

  return null;
};
