'use client';
import { useForm, Controller } from 'react-hook-form';
import { BulletList, Button, TextField } from 'design-system';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { NewPasswordFormValues } from './NewPasswordForm.types';
import {
  LOWERCASE_UPPERCASE_REGEX,
  MIN_PASSWORD_LENGTH,
  NUMBER_SPECIAL_CHAR_REGEX,
} from './NewPasswordForm.constants';
export interface NewPasswordFormProps {
  onSubmit: (values: NewPasswordFormValues) => void;
}
export const NewPasswordForm: React.FC<NewPasswordFormProps> = ({
  onSubmit,
}) => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = useForm<NewPasswordFormValues>({
    defaultValues: {
      password: '',
      passwordRepeated: '',
    },
    mode: 'onChange',
  });
  const passwordValue = watch('password');
  const validations = useMemo(
    () => ({
      minLength: passwordValue.length >= MIN_PASSWORD_LENGTH,
      lowerAndUpperCase: LOWERCASE_UPPERCASE_REGEX.test(passwordValue),
      numberOrSpecialChar: NUMBER_SPECIAL_CHAR_REGEX.test(passwordValue),
    }),
    [passwordValue],
  );
  return (
    <form
      dir="rtl"
      className="flex w-full flex-col gap-6 rounded-3xl border border-gray-300 p-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h3 className="text-center text-xl font-medium">بازنشانی رمز عبور</h3>
      <div className="flex flex-col gap-7">
        <div className="flex flex-col gap-4">
          <div>
            <Controller
              name="password"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'این فیلد اجباری است.',
                },

                validate: () => {
                  return Object.values(validations).every(Boolean);
                },
              }}
              render={({ field, fieldState }) => (
                <TextField
                  mergeTitleAndPlaceholder={false}
                  mode="outline"
                  type="password"
                  trailingIcons={[
                    {
                      name: 'x',
                      size: 'lg',
                    },
                    { name: 'eye', size: 'lg' },
                  ]}
                  label="رمز عبور"
                  placeholder=""
                  isError={!!fieldState.error}
                  {...field}
                />
              )}
            />
            <div className="-mt-3 text-xs">
              <BulletList
                items={[
                  {
                    title: 'شامل حروف بزرگ و کوچک',
                    status: !passwordValue
                      ? 'normal'
                      : validations.lowerAndUpperCase
                        ? 'success'
                        : 'error',
                  },
                  {
                    title: 'شامل اعداد یا علائم ویژه',
                    status: !passwordValue
                      ? 'normal'
                      : validations.numberOrSpecialChar
                        ? 'success'
                        : 'error',
                  },
                  {
                    title: 'حداقل 8 کاراکتر',
                    status: !passwordValue
                      ? 'normal'
                      : validations.minLength
                        ? 'success'
                        : 'error',
                  },
                ]}
              />
            </div>
          </div>
          <Controller
            name="passwordRepeated"
            control={control}
            rules={{
              required: {
                value: true,
                message: 'این فیلد اجباری است.',
              },
              validate: (value) => {
                if (value !== watch('password')) {
                  return 'تکرار رمز صحیح نمی‌باشد.';
                }
                return true;
              },
            }}
            render={({ field, fieldState }) => (
              <TextField
                mergeTitleAndPlaceholder={false}
                mode="outline"
                type="password"
                trailingIcons={[
                  {
                    name: 'x',
                    size: 'lg',
                  },
                  { name: 'eye', size: 'lg' },
                ]}
                label="تکرار رمز عبور"
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
            تایید
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
