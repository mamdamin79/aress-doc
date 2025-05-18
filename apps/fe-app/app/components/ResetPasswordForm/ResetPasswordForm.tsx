'use client';
import { useForm, Controller } from 'react-hook-form';
import { Button, TextField } from 'design-system';
import Link from 'next/link';
import { ResetPasswordFormValues } from './ResetPasswordForm.types';
import { validateNationalCode } from './ResetPasswordForm.utils';
import { validatePhoneNumber } from '../LoginForm/LoginForm.utils';
import { useState } from 'react';
export interface ResetPasswordFormProps {
  onSubmit: (values: ResetPasswordFormValues) => void;
}
export const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({
  onSubmit,
}) => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ResetPasswordFormValues>({
    defaultValues: {
      nationalCode: '',
      phoneNumber: '',
    },
  });
  return (
    <form
      dir="rtl"
      className="flex w-full flex-col gap-6 rounded-3xl border border-gray-300 p-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h3 className="text-center text-xl font-medium">بازنشانی رمز عبور</h3>
      <div className="flex flex-col gap-7">
        <div className="flex flex-col gap-4">
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
                label="کد ملی"
                placeholder=""
                isError={!!fieldState.error}
                supportText={fieldState.error?.message}
                {...field}
              />
            )}
          />

          <Controller
            name="phoneNumber"
            control={control}
            rules={{
              required: {
                value: true,
                message: 'این فیلد اجباری است.',
              },
              validate: (value) => {
                if (!validatePhoneNumber(value)) {
                  return 'لطفا یک  شماره همراه معتبر وارد کنید.';
                }
                return true;
              },
            }}
            render={({ field, fieldState }) => (
              <TextField
                mergeTitleAndPlaceholder={false}
                mode="outline"
                trailingIcons={[]}
                label="شماره همراه"
                placeholder=""
                isError={!!fieldState.error}
                supportText={fieldState.error?.message}
                {...field}
              />
            )}
          />
        </div>
        <div className="flex flex-col justify-center gap-4">
          <Button
            align="center"
            mode="primary"
            isLoading={isSubmitting}
            size="md"
            type="submit"
          >
            ادامه
          </Button>
          <Link
            href="/login"
            className="text-brand-600 text-md text-center font-medium"
          >
            بازگشت به صفحه ورود
          </Link>
        </div>
      </div>
    </form>
  );
};
