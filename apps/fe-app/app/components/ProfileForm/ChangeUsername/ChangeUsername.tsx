import { Button, TextField } from 'design-system';
import React, { useState } from 'react';
import { InputPassword } from '../ChangeNumber';
import { Controller, useForm } from 'react-hook-form';
const SectionHeader = ({ title }: { title: string }) => (
  <span className="text-md text-center font-medium">{title}</span>
);
const NewUsername = ({
  username,
  onSubmit,
}: {
  username?: string;
  onSubmit?: () => void;
}) => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      username: '',
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
        <SectionHeader title="نام کاربری جدید" />
        <div className="text-brand-600 flex w-1/3 flex-row justify-end text-sm font-medium"></div>
      </div>
      <span className="mt-4 text-sm">
        <span className="font-medium">نام کاربری فعلی: </span> {username}
      </span>
      <Controller
        name="username"
        control={control}
        rules={{
          required: {
            value: true,
            message: 'این فیلد اجباری است.',
          },
        }}
        render={({ field, fieldState }) => (
          <TextField
            mergeTitleAndPlaceholder={false}
            mode="outline"
            type="text"
            label="نام کاربری جدید"
            placeholder="نام کاربری جدید را وارد کنید..."
            isError={!!fieldState.error}
            supportText={fieldState.error?.message}
            trailingIcons={[]}
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

enum ChangeUsernameStage {
  PASSWORD = 0,
  NEW_USERNAME = 1,
  SUCCESS = 'success',
}
export const ChangeUsername: React.FC<{
  onClose?: (success?: boolean) => void;
}> = ({ onClose }) => {
  const [stage, setStage] = useState<ChangeUsernameStage | null>(0);

  return (
    <>
      {stage === ChangeUsernameStage.PASSWORD && (
        <InputPassword
          title="نام کاربری جدید"
          subTitle="جهت تغییر نام کاربری، ابتدا رمز فعلی خود را وارد کنید."
          onSubmit={() => setStage(ChangeUsernameStage.NEW_USERNAME)}
        />
      )}
      {stage === ChangeUsernameStage.NEW_USERNAME && (
        <NewUsername username="sinapir" onSubmit={() => onClose?.(true)} />
      )}
    </>
  );
};
