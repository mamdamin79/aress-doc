import { Button, TextField } from 'design-system';
import React, { useState } from 'react';
import { InputPasswordForm } from '../ChangeNumber';
import { Controller, useForm } from 'react-hook-form';
import { OTPForm } from '../../OTPForm';

const SectionHeader = ({ title }: { title: string }) => (
  <span className="text-md text-center font-medium">{title}</span>
);
interface NewMailFormValues {
  email: string;
}
const NewMailForm = ({
  email,
  onSubmit,
}: {
  email?: string;
  onSubmit?: (email: NewMailFormValues) => void;
}) => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<NewMailFormValues>({
    defaultValues: {
      email: '',
    },
  });

  const onSaveData = async (data: NewMailFormValues) => {
    await new Promise((r) => setTimeout(r, 2000));
    console.log(data);
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
        <SectionHeader title="ایمیل جدید" />
        <div className="text-brand-600 flex w-1/3 flex-row justify-end text-sm font-medium"></div>
      </div>
      <span className="mt-4 text-sm">
        <span className="font-medium">ایمیل فعلی: </span> {email}
      </span>
      <Controller
        name="email"
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
  const [newMail, setNewMail] = useState<string | null>(null);

  return (
    <>
      {stage === ChangeMailStage.PASSWORD && (
        <InputPasswordForm
          onSubmit={() => setStage(ChangeMailStage.NEW_MAIL)}
          title="ایمیل جدید"
          subTitle="جهت تغییر ایمیل، ابتدا رمز فعلی خود را وارد کنید.
          
"
        />
      )}
      {stage === ChangeMailStage.NEW_MAIL && (
        <NewMailForm
          email="sinapir2@gmail.com"
          onSubmit={(data) => {
            setNewMail(data.email);
            setStage(ChangeMailStage.OTP);
          }}
        />
      )}
      {stage === ChangeMailStage.OTP && (
        <OTPForm
          description={`کد تایید ارسال شده به ${newMail} را وارد کنید.`}
          backBtnLabel='ویرایش ایمیل'
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
