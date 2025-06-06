import { Button, TextField } from 'design-system';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { OTPForm } from '../../OTPForm';

const SectionHeader = ({ title }: { title: string }) => (
  <span className="text-md text-text-neutral-primary text-center font-medium">
    {title}
  </span>
);
interface InputPasswordFormValues {
  password: string;
}
export const InputPasswordForm = ({
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
  } = useForm<InputPasswordFormValues>({
    defaultValues: {
      password: '',
    },
  });

  const onSaveData = async (data: InputPasswordFormValues) => {
    await new Promise((r) => setTimeout(r, 2000));
    onSubmit?.();
  };
  return (
    <form
      dir="rtl"
      className="flex w-full flex-col gap-6 text-right"
      onSubmit={handleSubmit(onSaveData)}
    >
      <SectionHeader title={title || ''} />
      <span className="text-text-neutral-primary mt-4 text-sm">{subTitle}</span>
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

interface NewNumberFormValues {
  phoneNumber: string;
}
const NewNumber = ({
  phone,
  onSubmit,
  title,
}: {
  phone?: string;
  onSubmit?: (phoneNumber: NewNumberFormValues) => void;
  title?: string;
}) => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<NewNumberFormValues>({
    defaultValues: {
      phoneNumber: '',
    },
  });

  const onSaveData = async (data: NewNumberFormValues) => {
    await new Promise((r) => setTimeout(r, 2000));
    onSubmit?.(data);
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
        <div className="text-text-brand-primary-600 flex w-1/3 flex-row justify-end text-sm font-medium"></div>
      </div>
      <span className="mt-4 text-sm">
        <span className="text-right font-medium">شماره همراه فعلی: </span>
        <span className="text-left" dir="ltr">
          {phone}
        </span>
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
  NEW_NUMBER = 1,
  OTP = 2,
}

export const ChangeNumber = ({
  onClose,
}: {
  onClose?: (success?: boolean) => void;
}) => {
  const [stage, setStage] = useState<ChangeNumberStage | null>(0);
  const [newNumber, setNewNumber] = useState<null | string>(null);
  const onSaveData = async (code: string) => {
    // Send data to server
  };
  return (
    <>
      {stage === ChangeNumberStage.PASSWORD && (
        <InputPasswordForm
          onSubmit={() => setStage(ChangeNumberStage.NEW_NUMBER)}
          title="شماره همراه جدید"
          subTitle="جهت تغییر شماره همراه، ابتدا رمز فعلی خود را وارد کنید.
"
        />
      )}
      {stage === ChangeNumberStage.NEW_NUMBER && (
        <NewNumber
          title="شماره همراه جدید"
          phone="+989339123456"
          onSubmit={(data) => {
            setStage(ChangeNumberStage.OTP);
            setNewNumber(data.phoneNumber);
          }}
        />
      )}
      {stage === ChangeNumberStage.OTP && (
        <OTPForm
          description={`کد تایید ارسال شده به ${newNumber} را وارد کنید.`}
          onBackBtn={() => setStage(ChangeNumberStage.NEW_NUMBER)}
          backBtnLabel="ویرایش شماره"
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
