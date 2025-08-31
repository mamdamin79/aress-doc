'use client';
import { useForm, Controller } from 'react-hook-form';
import { Button, Checkbox, TextField } from 'design-system';
import Link from 'next/link';
import { validateUsername } from './LoginForm.utils';
import { LoginFormValues } from './LoginForm.types';
import { useUsersServiceGetUsersLoginCaptcha } from '@openapi';
import { useEffect } from 'react';
export interface LoginFormProps {
  onSubmit: (values: LoginFormValues) => void;
  setRefetchCaptcha?: (fn: () => void) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  setRefetchCaptcha,
}) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm<LoginFormValues>({
    defaultValues: {
      username: '',
      password: '',
      remember: false,
      captcha: '',
      captchaUid: undefined,
    },
  });

  // Fetch captcha
  const {
    data: captchaData,
    refetch: refetchCaptcha,
    isFetching: isCaptchaLoading,
  } = useUsersServiceGetUsersLoginCaptcha({ captchaType: 'image' });

  // Expose refetchCaptcha to parent if needed
  useEffect(() => {
    if (setRefetchCaptcha) {
      setRefetchCaptcha(refetchCaptcha);
    }
  }, [refetchCaptcha]);

  // Set captchaUid in form when captchaData changes
  useEffect(() => {
    if (captchaData?.uid !== undefined) {
      setValue('captchaUid', captchaData.uid ?? 0);
      setValue('captcha', ''); // clear captcha input on new captcha
    }
  }, [captchaData, setValue]);

  return (
    <form
      dir="rtl"
      className="bg-surface-neutral-primary border-border-neutral-primary flex w-full flex-col gap-6 rounded-3xl border p-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h3 className="text-text-neutral-primary text-center text-xl font-medium">
        ورود به آرسس ترمینال
      </h3>
      <div className="flex flex-col gap-7">
        <div className="flex flex-col gap-4">
          <Controller
            name="username"
            control={control}
            rules={{
              required: {
                value: true,
                message: 'این فیلد اجباری است.',
              },
              validate: (value) => {
                if (!validateUsername(value)) {
                  return 'لطفاً کد ملی، شماره تماس یا نام کاربری معتبر وارد کنید.';
                }
                return true;
              },
            }}
            render={({ field, fieldState }) => (
              <TextField
                mergeTitleAndPlaceholder={false}
                mode="outline"
                trailingIcons={[{ name: 'x', size: 'lg' }]}
                label="شماره همراه / کدملی / نام کاربری"
                placeholder=""
                isError={!!fieldState.error}
                supportText={
                  fieldState.error?.message ||
                  'یکی از موارد خواسته شده را وارد کنید.'
                }
                {...field}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            rules={{
              required: 'این فیلد اجباری است.',
            }}
            render={({ field, fieldState }) => (
              <TextField
                mergeTitleAndPlaceholder={false}
                mode="outline"
                type="password"
                trailingIcons={[
                  { name: 'x', size: 'lg' },
                  { name: 'eye', size: 'lg' },
                ]}
                label="رمز عبور"
                placeholder=""
                isError={!!fieldState.error}
                supportText={fieldState.error?.message || ' '}
                {...field}
              />
            )}
          />

          {/* Captcha Field */}
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
                  captchaValue={captchaData.value ?? undefined}
                  onRefreshCaptcha={refetchCaptcha}
                  trailingIcons={[]}
                  {...field}
                />
              )}
            />
          )}
        </div>
        <div className="flex flex-col justify-center gap-4">
          <div className="flex flex-row">
            <Controller
              name="remember"
              control={control}
              render={({ field }) => (
                <Checkbox
                  checked={field.value}
                  onChange={field.onChange}
                  content="مرا به خاطر بسپار"
                />
              )}
            />
          </div>
          <Button
            theme="brand"
            align="center"
            mode="primary"
            isLoading={isSubmitting}
            size="md"
            type="submit"
            disabled={isCaptchaLoading}
          >
            ورود به ترمینال
          </Button>
          <Button
            theme="brand"
            className="font-medium"
            align="center"
            isLoading={false}
            mode="underline"
            size="sm"
          >
            <Link href="/forgot">رمز عبور را فراموش کرده‌اید؟</Link>
          </Button>
        </div>
      </div>
    </form>
  );
};
