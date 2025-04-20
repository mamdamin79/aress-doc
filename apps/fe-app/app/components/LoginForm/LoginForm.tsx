'use client';
import { useForm, Controller } from 'react-hook-form';
import { Button, Checkbox, TextField } from 'design-system';
import Link from 'next/link';
import { validateNationalCode, validatePhoneNumber } from './LoginForm.utils';
import { LoginFormValues } from './LoginForm.types';
export interface LoginFormProps {
  onSubmit: (values: LoginFormValues) => void;
}
export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginFormValues>({
    defaultValues: {
      username: '',
      password: '',
      remember: false,
    },
  });

  return (
    <form
      dir="rtl"
      className="flex w-full flex-col gap-6 rounded-3xl border border-gray-300 p-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h3 className="text-center text-xl font-medium">ورود به آرسس ترمینال</h3>
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
                if (
                  !validateNationalCode(value) &&
                  !validatePhoneNumber(value)
                ) {
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
                supportText={fieldState.error?.message}
                {...field}
              />
            )}
          />
        </div>
        <div className="flex flex-col justify-center gap-4">
          <div className="flex flex-row">
            <Controller
              name="remember"
              control={control}
              render={({ field }) => (
                <Checkbox checked={field.value} onChange={field.onChange} />
              )}
            />

            <label className="text-sm font-medium" htmlFor="remember">
              مرا به خاطر بسپار
            </label>
          </div>
          <Button
            align="center"
            mode="primary"
            isLoading={isSubmitting}
            size="md"
            type="submit"
          >
            ورود به ترمینال
          </Button>
          <Link
            href="/forgot"
            className="text-brand-600 text-md text-center font-medium"
          >
            رمز عبور را فراموش کرده‌اید؟
          </Link>
        </div>
      </div>
    </form>
  );
};
