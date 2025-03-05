import { Button, Icon, IconDialog, TextField } from 'design-system';
import React, { useState } from 'react';
import { OTPForm } from '../OTPForm';
import { Controller, useForm } from 'react-hook-form';

const SectionHeader = ({ title }: { title: string }) => (
  <span className="text-md text-center font-medium">{title}</span>
);
export const InputPassword = ({
  onSubmit,
  title,
  subTitle,
}: {
  onSubmit?: () => void;
  title?: string;
  subTitle?: string;
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
      <SectionHeader title={title || ''} />
      <span className="mt-4 text-sm">{subTitle}</span>
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
            placeholder="رمز عبور فعلی خود را وارد کنید..."
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
        تایید
      </Button>
    </form>
  );
};

const NewNumber = ({
  phone,
  onSubmit,
  title,
}: {
  phone?: string;
  onSubmit?: () => void;
  title?: string;
}) => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      phoneNumber: '',
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
        <SectionHeader title={title || ''} />
        <div className="text-brand-600 flex w-1/3 flex-row justify-end text-sm font-medium"></div>
      </div>
      <span className="mt-4 text-sm">
        <span className="font-medium">شماره همراه فعلی: </span> {phone}
      </span>
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
              return 'لطفا یک شماره همراه معتبر وارد کنید';
            }

            return true;
          },
        }}
        render={({ field, fieldState }) => (
          <TextField
            mergeTitleAndPlaceholder={false}
            mode="outline"
            type="text"
            trailingIcons={[]}
            label="شماره همراه جدید"
            placeholder="شماره همراه جدید را وارد کنید..."
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

enum ChangeNumberStage {
  PASSWORD = 0,
  NEW_MAIL = 1,
  OTP = 2,
}

export const ChangeNumber = ({
  onClose,
}: {
  onClose?: (success?: boolean) => void;
}) => {
  const [stage, setStage] = useState<ChangeNumberStage | null>(0);
  const onSaveData = async (code: string) => {
    await new Promise((r) => setTimeout(r, 2000));
    console.log(code);
    onClose?.();
  };
  return (
    <>
      {stage === ChangeNumberStage.PASSWORD && (
        <InputPassword
          onSubmit={() => setStage(ChangeNumberStage.NEW_MAIL)}
          title="شماره همراه جدید"
          subTitle="جهت تغییر شماره همراه، ابتدا رمز فعلی خود را وارد کنید.
"
        />
      )}
      {stage === ChangeNumberStage.NEW_MAIL && (
        <NewNumber
          title="شماره همراه جدید"
          phone="+989339123456"
          onSubmit={() => setStage(ChangeNumberStage.OTP)}
        />
      )}
      {stage === ChangeNumberStage.OTP && (
        <OTPForm
          backButtonText="ویرایش شماره همراه"
          description="کد تایید ارسال شده به +989339123456 را وارد کنید.
"
          onBackBtn={() => setStage(ChangeNumberStage.NEW_MAIL)}
          title="شماره همراه جدید"
          onSubmit={(code) => {
            onSaveData(code);
            onClose?.(true);
          }}
        />
      )}
    </>
  );
};
