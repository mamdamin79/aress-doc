'use client';
import { useForm, Controller } from 'react-hook-form';
import { Button, TextField } from 'design-system';

export const LoginForm = () => {
  const {
    control,
    handleSubmit,
    formState:{isSubmitting}
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const  onSubmit = async(data: any) => {
    await new Promise(r => setTimeout(r, 5000));
    console.log(data);
  };

  const validateNationalCode = (code: string): boolean => {
    if (code.length !== 10 || !/^\d+$/.test(code)) return false;
  
    const check = +code[9];
    const sum =
      code
        .split("")
        .slice(0, 9)
        .reduce((acc, num, idx) => acc + +num * (10 - idx), 0) % 11;
  
    return (sum < 2 && check === sum) || (sum >= 2 && check + sum === 11);
  };
  

  return (
    <form dir='rtl' className='rounded-3xl border border-gray-300 p-6 w-[480px]' onSubmit={handleSubmit(onSubmit)}>
      <h3 className='text-center text-xl font-medium pb-6'>ورود به آرسس</h3>
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
      <Button align='center' mode='primary' isLoading={isSubmitting} size='md'  type="submit">ورود به ترمینال</Button>
    </form>
  );
};
