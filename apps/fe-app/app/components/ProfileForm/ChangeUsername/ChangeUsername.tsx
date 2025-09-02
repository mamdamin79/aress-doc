import { Button, TextField } from 'design-system';
import React, { useState } from 'react';
import { InputPasswordForm } from '../ChangeNumber';
import { Controller, useForm } from 'react-hook-form';
import { useUsersServicePostUsersProfileUsernameChange } from '@openapi';
import { queryClient } from '../../../lib/react-query';
const SectionHeader = ({ title }: { title: string }) => (
  <span className="text-md text-text-neutral-primary text-center font-medium">
    {title}
  </span>
);
interface NewUsernameFormValues {
  username: string;
}
const NewUsernameForm = ({
  username,
  onSubmit,
  passwordVerificationToken,
}: {
  username?: string;
  onSubmit?: () => void;
  passwordVerificationToken: string;
}) => {
  const {
    control,
    handleSubmit,
    setError,
    formState: { isSubmitting },
  } = useForm<NewUsernameFormValues>({
    defaultValues: {
      username: '',
    },
  });
  const { mutate, isPending } = useUsersServicePostUsersProfileUsernameChange();

  const onSaveData = async (data: NewUsernameFormValues) => {
    mutate(
      {
        requestBody: {
          newUsername: data.username,
          passwordVerificationToken: passwordVerificationToken,
        },
      },
      {
        onSuccess: () => {
          onSubmit?.();
          queryClient.invalidateQueries({
            queryKey: ['UsersServiceGetUsersMe'],
          });
        },
        onError: () => {
          setError('username', {
            type: 'manual',
            message:
              'این نام کاربری قبلا انتخاب شده است. لطفا یک نام دیگر وارد کنید.',
          });
        },
      },
    );
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
        <div className="text-text-brand-primary-600 flex w-1/3 flex-row justify-end text-sm font-medium"></div>
      </div>
      <span className="mt-4 text-sm">
        <span className="text-text-neutral-primary font-medium">
          نام کاربری فعلی:{' '}
        </span>
        {username}
      </span>
      <Controller
        name="username"
        control={control}
        rules={{
          required: {
            value: true,
            message: 'این فیلد اجباری است.',
          },
          pattern: {
            value: /^[A-Za-z0-9_.]+$/,
            message:
              'نام‌کاربری باید فقط شامل حروف انگلیسی، اعداد و کاراکترهای (_) و (.) باشد و فاصله نداشته باشد.',
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
            supportText={fieldState.error?.message || ' '}
            trailingIcons={[]}
            {...field}
          />
        )}
      />
      <Button
        theme="brand"
        align="center"
        mode="primary"
        isLoading={isSubmitting || isPending}
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
  username?: string;
}> = ({ onClose, username }) => {
  const [stage, setStage] = useState<ChangeUsernameStage | null>(0);
  const [passwordVerificationToken, setPasswordVerificationToken] =
    useState('');

  return (
    <>
      {stage === ChangeUsernameStage.PASSWORD && (
        <InputPasswordForm
          title="نام کاربری جدید"
          subTitle="جهت تغییر نام کاربری، ابتدا رمز فعلی خود را وارد کنید."
          onSubmit={(passwordToken) => {
            setStage(ChangeUsernameStage.NEW_USERNAME);
            setPasswordVerificationToken(passwordToken);
          }}
        />
      )}
      {stage === ChangeUsernameStage.NEW_USERNAME && (
        <NewUsernameForm
          onSubmit={() => onClose?.(true)}
          passwordVerificationToken={passwordVerificationToken}
          username={username}
        />
      )}
    </>
  );
};
