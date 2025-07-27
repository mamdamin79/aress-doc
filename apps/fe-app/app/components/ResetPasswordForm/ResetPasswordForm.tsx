'use client';
import { useForm, Controller } from 'react-hook-form';
import { Button, TextField } from 'design-system';
import Link from 'next/link';
import { ResetPasswordFormValues } from './ResetPasswordForm.types';
import { validateNationalCode } from './ResetPasswordForm.utils';
import { validatePhoneNumber } from '../LoginForm/LoginForm.utils';
import { useEffect } from 'react';
import { useUsersServiceGetUsersPasswordForgotCaptcha } from '@openapi';
export interface ResetPasswordFormProps {
  onSubmit: (values: ResetPasswordFormValues) => void;
}
export const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({
  onSubmit,
}) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm<ResetPasswordFormValues>({
    defaultValues: {
      nationalCode: '',
      phoneNumber: '',
    },
  });

  // Use query for captcha
  const { data: captchaData, refetch: refetchCaptcha } =
    useUsersServiceGetUsersPasswordForgotCaptcha({});

  // Refresh captcha handler
  const handleRefreshCaptcha = () => {
    refetchCaptcha();
  };

  // Set captchaUid in form when captchaData changes
  useEffect(() => {
    if (captchaData?.uid !== undefined && captchaData?.uid !== null) {
      setValue('captchaUid', captchaData.uid);
      setValue('captcha', ''); // clear captcha input on new captcha
    } else {
      setValue('captchaUid', undefined);
    }
  }, [captchaData, setValue]);

  return (
    <form
      dir="rtl"
      className="bg-surface-neutral-primary border-border-neutral-primary flex w-full flex-col gap-6 rounded-3xl border p-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h3 className="text-text-neutral-primary text-center text-xl font-medium">
        بازنشانی رمز عبور
      </h3>
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
                supportText={fieldState.error?.message || ' '}
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
                supportText={fieldState.error?.message || ' '}
                {...field}
              />
            )}
          />

          {captchaData?.required && (
            <Controller
              name="captcha"
              control={control}
              rules={{
                required: 'کد کپچا الزامی است.',
              }}
              render={({ field, fieldState }) => (
                <TextField
                  mergeTitleAndPlaceholder={false}
                  mode="outline"
                  label="کد امنیتی"
                  placeholder="کد را وارد کنید"
                  isError={!!fieldState.error}
                  supportText={fieldState.error?.message || ' '}
                  captchaValue={captchaData?.value ?? undefined}
                  onRefreshCaptcha={handleRefreshCaptcha}
                  trailingIcons={[]}
                  {...field}
                />
              )}
            />
          )}
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
          <Button
            className="font-medium"
            align="center"
            isLoading={false}
            mode="underline"
            size="sm"
          >
            <Link href="/login">بازگشت به صفحه ورود</Link>
          </Button>
        </div>
      </div>
    </form>
  );
};
