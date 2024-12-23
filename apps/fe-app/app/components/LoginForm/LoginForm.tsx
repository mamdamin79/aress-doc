'use client';
import { useForm, Controller } from 'react-hook-form';
import { Button, Checkbox, TextField } from 'design-system';
import Link from 'next/link';

export const LoginForm = () => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (data: any) => {
    await new Promise((r) => setTimeout(r, 5000));
    console.log(data);
  };

  const validateNationalCode = (code: string): boolean => {
    if (code.length !== 10 || !/^\d+$/.test(code)) return false;

    const check = +code[9];
    const sum =
      code
        .split('')
        .slice(0, 9)
        .reduce((acc, num, idx) => acc + +num * (10 - idx), 0) % 11;

    return (sum < 2 && check === sum) || (sum >= 2 && check + sum === 11);
  };
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
                const isNationalCode =
                  /^[0-9]{10}$/.test(value) && validateNationalCode(value);
                const isPhoneNumber = /^09[0-9]{9}$/.test(value);
                // const isUsername = /^[a-zA-Z0-9_]{3,}$/.test(value);

                if (!isNationalCode && !isPhoneNumber) {
                  return 'لطفاً کد ملی، شماره تماس یا نام کاربری معتبر وارد کنید.';
                }

                return true;
              },
            }}
            render={({ field, fieldState }) => (
              <TextField
                mergeTitleAndPlaceholder={false}
                mode="outline"
                trailingIcons={['x']}
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
                trailingIcons={['x', 'eye']}
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
            <Checkbox onChange={() => console.log('checked')} />
            <span className="text-sm font-medium">مرا به خاطر بسپار</span>
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
