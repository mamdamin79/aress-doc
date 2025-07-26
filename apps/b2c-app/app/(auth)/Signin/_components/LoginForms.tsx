'use client';
import React, { useState } from 'react';
import { Button, TextField } from 'design-system';
import { Controller, useForm } from 'react-hook-form';
import { OTPForm } from './OTPForm';
import { validateNationalCode } from '@shared';
import Link from 'next/link';

interface LoginFormsProps {
  currentStep: number;
  onNextStep: () => void;
  onPrevStep: () => void;
}

interface NationalIdFormValues {
  nationalCode: string;
}

const SectionHeader = ({ title }: { title: string }) => (
  <span className="text-md text-text-neutral-primary text-center font-medium">
    {title}
  </span>
);

// National ID Form Component
const NationalIdForm = ({
  onSubmit,
}: {
  onSubmit: (data: NationalIdFormValues) => void;
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

  return (
    <form
      dir="rtl"
      className="bg-surface-neutral-primary border-border-neutral-primary flex w-full flex-col gap-4 rounded-3xl border p-6"
      onSubmit={handleSubmit(onSaveData)}
    >
      <SectionHeader title="ورود به آرسس اینوستور" />

      <span className="text-text-neutral-secondary text-center text-sm">
        با ارائه شماره ملی، پیامک تایید از آرسس اینوستور به موبایل‌تان ارسال
        می‌شود.
      </span>
      <div className="mt-12">
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

      <div className="flex flex-row justify-center gap-4">
        <Button
          align="center"
          mode="primary"
          isLoading={isSubmitting}
          size="md"
          type="submit"
        >
          ادامه
        </Button>

        <Link href={'/AuthLanding'} className="w-full">
          <Button
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

// Main LoginForms Component
export const LoginForms: React.FC<LoginFormsProps> = ({
  currentStep,
  onNextStep,
  onPrevStep,
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

      // Handle successful login
      console.log('Login successful with OTP:', code);
      // Redirect to dashboard or handle success
    } catch (error) {
      console.error('OTP verification failed:', error);
    } finally {
      setIsLoading(false);
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
        <NationalIdForm onSubmit={handleNationalIdSubmit} />
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
