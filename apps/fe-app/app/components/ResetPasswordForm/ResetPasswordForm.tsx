'use client';
import { useForm, Controller } from 'react-hook-form';
import { Button, TextField } from 'design-system';
import Link from 'next/link';

export const ResetPasswordForm = () => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      nationalCode: '',
      phoneNumber: '',
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
                const isNationalCode =
                  /^[0-9]{10}$/.test(value) && validateNationalCode(value);

                if (!isNationalCode) {
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
                const isPhoneNumber = /^09[0-9]{9}$/.test(value);

                if (!isPhoneNumber) {
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
            href="/forgot"
            className="text-brand-600 text-md text-center font-medium"
          >
            بازگشت به صفحه ورود
          </Link>
        </div>
      </div>
    </form>
  );
};
