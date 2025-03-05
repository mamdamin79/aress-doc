import { Button, Icon, IconDialog, TextField } from 'design-system';
import React, { useState } from 'react';
import { OTPForm } from '../OTPForm';
import { InputPassword } from '../ChangeNumber';
import { Controller, useForm } from 'react-hook-form';

const SectionHeader = ({ title }: { title: string }) => (
  <span className="text-md text-center font-medium">{title}</span>
);

const NewMail = ({
  email,
  onSubmit,
}: {
  email?: string;
  onSubmit?: () => void;
}) => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      password: '',
    },
  });

  const onSaveData = async (data: any) => {
    await new Promise((r) => setTimeout(r, 2000));
    console.log(data);
    onSubmit?.();
  };
  return (
    <form
      dir="rtl"
      className="flex w-full flex-col gap-6 text-right"
      onSubmit={handleSubmit(onSaveData)}
    >
      <div className="flex w-full flex-row justify-between">
        <span className="w-1/3"></span>
        <SectionHeader title="ایمیل جدید" />
        <div className="text-brand-600 flex w-1/3 flex-row justify-end text-sm font-medium"></div>
      </div>
      <span className="mt-4 text-sm">
        <span className="font-medium">ایمیل فعلی: </span> {email}
      </span>
      <Controller
        name="password"
        control={control}
        rules={{
          required: {
            value: true,
            message: 'این فیلد اجباری است.',
          },
          validate: (value) => {
            const isValidEmail = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/i.test(
              value,
            );

            if (!isValidEmail) {
              return 'لطفا یک ایمیل معتبر وارد کنید.';
            }

            return true;
          },
        }}
        render={({ field, fieldState }) => (
          <TextField
            mergeTitleAndPlaceholder={false}
            mode="outline"
            type="text"
            label="ایمیل جدید"
            placeholder="ایمیل جدید را وارد کنید..."
            trailingIcons={[]}
            isError={!!fieldState.error}
            supportText={fieldState.error?.message}
            {...field}
          />
        )}
      />
      <Button
        align="center"
        mode="primary"
        isLoading={isSubmitting}
        size="md"
        type="submit"
      >
        دریافت کد تایید
      </Button>
    </form>
  );
};

enum ChangeMailStage {
  PASSWORD = 0,
  NEW_MAIL = 1,
  OTP = 2,
}

export const ChangeMail = ({
  onClose,
}: {
  onClose?: (success?: boolean) => void;
}) => {
  const [stage, setStage] = useState<ChangeMailStage | null>(0);

  return (
    <>
      {stage === ChangeMailStage.PASSWORD && (
        <InputPassword
          onSubmit={() => setStage(ChangeMailStage.NEW_MAIL)}
          title="ایمیل جدید"
          subTitle="جهت تغییر ایمیل، ابتدا رمز فعلی خود را وارد کنید.
"
        />
      )}
      {stage === ChangeMailStage.NEW_MAIL && (
        <NewMail
          email="sinapir2@gmail.com"
          onSubmit={() => setStage(ChangeMailStage.OTP)}
        />
      )}
      {stage === ChangeMailStage.OTP && (
        <OTPForm
          backButtonText="ویرایش ایمیل"
          description="کد تایید ارسال شده به sinapir2@gmail.com را وارد کنید.
"
          onBackBtn={() => setStage(ChangeMailStage.NEW_MAIL)}
          title="ایمیل جدید"
          onSubmit={() => {
            onClose?.(true);
          }}
        />
      )}
    </>
  );
};
