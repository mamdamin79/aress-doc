'use client';
import React, { useState } from 'react';
import { Button, Icon, TextField } from 'design-system';
import Link from 'next/link';
import { useForm, Controller } from 'react-hook-form';
interface OTPFormProps {
  phoneNumber: string;
  onClick: () => void;
}
export const OTPForm: React.FC<OTPFormProps> = ({ phoneNumber, onClick }) => {
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
    onClick();
  };

  const [showTimer, setShowTimer] = useState(true);
  return (
    <form
      dir="rtl"
      className="flex w-full flex-col gap-6 rounded-3xl border border-gray-300 p-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex w-full flex-row items-center justify-between">
        <div className="w-[101px]"></div>
        <h3 className="text-center text-xl font-medium">بازنشانی رمز عبور</h3>

        <div className="text-brand-600 flex flex-row items-center justify-center text-sm">
          <span className="text-sm font-medium">ویرایش شماره</span>
          <Icon name="chevron-left" size="lg" />
        </div>
      </div>
      <div className="flex flex-col gap-7">
        <div className="flex flex-row gap-2">
          <Controller
            name="nationalCode"
            control={control}
            rules={{
              required: {
                value: true,
                message: 'این فیلد اجباری است.',
              },
              min: {
                value: 5,
                message: 'کد یکبار مصرف 5 رقمی را وارد کنید.',
              },
            }}
            render={({ field, fieldState }) => (
              <TextField
                mergeTitleAndPlaceholder={false}
                mode="outline"
                trailingIcons={[]}
                label={`لطفا رمز یکبار مصرف ارسال شده به شماره ${phoneNumber} را وارد کنید.`}
                placeholder="- - - - - -"
                isError={!!fieldState.error}
                supportText={fieldState.error?.message}
                {...field}
              />
            )}
          />
          <div
            className="border-brand-600 text-md text-brand-600 mt-[26px] flex h-[50px] min-w-fit flex-row items-center gap-2 rounded-xl border px-4 font-medium"
            onClick={() => setShowTimer(!showTimer)}
          >
            {showTimer ? (
              <span className="text-md flex w-fit break-keep">درخواست رمز</span>
            ) : (
              <>
                <Icon name="clock" size="md" />
                <span>1:56</span>
              </>
            )}
          </div>
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
        </div>
      </div>
    </form>
  );
};
