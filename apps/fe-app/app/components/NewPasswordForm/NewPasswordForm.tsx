'use client';
import { useForm, Controller } from 'react-hook-form';
import { BulletList, Button, TextField } from 'design-system';
import Link from 'next/link';
import { useState } from 'react';

export const NewPasswordForm = ({ onClick }: { onClick: () => void }) => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      password: '',
      passwordRepeated: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (data: any) => {
    await new Promise((r) => setTimeout(r, 5000));
  };
  const [formValidations, setFormValidations] = useState({
    lowerAndUpperCase: false,
    numberOrSpecialChar: false,
    minLength: false,
  });
  const [inputChangeStart, setInputChangeStart] = useState(false);
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

                validate: (value) => {
                  setInputChangeStart(true);
                  if (value.length > 8) {
                    setFormValidations((prev) => ({
                      ...prev,
                      minLength: true,
                    }));
                  } else {
                    setFormValidations((prev) => ({
                      ...prev,
                      minLength: false,
                    }));
                  }
                  if (/(?=.*[a-z])(?=.*[A-Z])/.test(value)) {
                    setFormValidations((prev) => ({
                      ...prev,
                      lowerAndUpperCase: true,
                    }));
                  } else {
                    setFormValidations((prev) => ({
                      ...prev,
                      lowerAndUpperCase: false,
                    }));
                  }
                  if (
                    /^(?=.*[0-9])|(?=.*[@#$%^&*()_+=[$${};':"\\|,.<>/?])/.test(
                      value,
                    )
                  ) {
                    setFormValidations((prev) => ({
                      ...prev,
                      numberOrSpecialChar: true,
                    }));
                  } else {
                    setFormValidations((prev) => ({
                      ...prev,
                      numberOrSpecialChar: false,
                    }));
                  }
                  return true;
                },
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
                  {...field}
                />
              )}
            />
            <div className="-mt-3 text-xs">
              <BulletList
                items={[
                  {
                    title: 'شامل حروف بزرگ و کوچک',
                    status: !inputChangeStart
                      ? 'normal'
                      : formValidations.lowerAndUpperCase
                        ? 'success'
                        : 'error',
                  },
                  {
                    title: 'شامل اعداد یا علائم ویژه',
                    status: !inputChangeStart
                      ? 'normal'
                      : formValidations.numberOrSpecialChar
                        ? 'success'
                        : 'error',
                  },
                  {
                    title: 'حداقل 8 کاراکتر',
                    status: !inputChangeStart
                      ? 'normal'
                      : formValidations.minLength
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
                trailingIcons={['x', 'eye']}
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
