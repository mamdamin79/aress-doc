import { Button, Icon, TextField } from 'design-system';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { OTPForm } from '../../OTPForm';
import {
  OpenAPI,
  useUsersServicePostUsersProfilePasswordValidate,
  useUsersServicePostUsersProfilePhoneChange,
  useUsersServicePostUsersProfilePhoneChangeOtp,
} from '@openapi';
import { fetchToken } from '../../../(auth)/auth.utils';
import { queryClient } from '../../../lib/react-query';
import { useCustomToast } from 'libs/design-system/src/hooks/CustomToast/CustomToast';
const genericErrorText = 'خطایی رخ داد.';
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
  onSubmit?: (passwordVerificationToken: string) => void;
  title?: string;
  subTitle?: string;
}) => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    setError,
  } = useForm<InputPasswordFormValues>({
    defaultValues: {
      password: '',
    },
  });

  const { mutate, isPending } =
    useUsersServicePostUsersProfilePasswordValidate();
  const onSaveData = async (data: InputPasswordFormValues) => {
    const token = await fetchToken();
    if (!token) {
      throw new Error('Failed to fetch access token');
    }
    OpenAPI.HEADERS = {
      Authorization: `Bearer ${token}`,
    };
    mutate(
      {
        requestBody: {
          password: data.password,
        },
      },
      {
        onSuccess: (response) => {
          onSubmit?.(response.passwordVerificationToken);
        },
        onError: (error: any) => {
          let errorText;
          if (error?.body?.message) {
            errorText = error.body.message;
          } else if (error?.message) {
            errorText = error.message;
          }

          setError('password', {
            type: 'manual',
            message: errorText ?? genericErrorText,
          });
        },
      },
    );
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
            supportText={fieldState.error?.message || ' '}
            {...field}
          />
        )}
      />
      <Button
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

interface NewNumberFormValues {
  phoneNumber: string;
}
const NewNumber = ({
  onSubmit,
  title,
  passwordVerificationToken,
}: {
  onSubmit?: (phoneNumber: NewNumberFormValues) => void;
  title?: string;
  passwordVerificationToken: string;
}) => {
  const {
    control,
    handleSubmit,
    setError,
    formState: { isSubmitting },
  } = useForm<NewNumberFormValues>({
    defaultValues: {
      phoneNumber: '',
    },
  });

  const { mutate, isPending } = useUsersServicePostUsersProfilePhoneChangeOtp();
  const onSaveData = async (data: NewNumberFormValues) => {
    const token = await fetchToken();
    if (!token) {
      throw new Error('Failed to fetch access token');
    }
    OpenAPI.HEADERS = {
      Authorization: `Bearer ${token}`,
    };
    mutate(
      {
        requestBody: {
          newPhoneNumber: data.phoneNumber,
          passwordVerificationToken: passwordVerificationToken,
        },
      },
      {
        onSuccess: (response) => {
          onSubmit?.({ phoneNumber: response.phoneNumber });
          console.log(response);
        },
        onError: (error: any) => {
          let errorText;
          if (error?.body?.message) {
            errorText = error.body.message;
          } else if (error?.message) {
            errorText = error.message;
          }

          setError('phoneNumber', {
            type: 'manual',
            message: errorText ?? genericErrorText,
          });
        },
      },
    );
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
      <div className="flex flex-row items-center gap-2 text-right">
        <div className="bg-surface-message-warning-100-soft text-icon-onmessage-colored-onwarning-on100 flex h-8 w-8 items-center justify-center rounded-full">
          <Icon name="triangle-alert" size="md" />
        </div>
        <span className="text-text-neutral-primary text-sm">
          دقت کنید که شماره وارد شده حتما باید به نام خودتان باشد.
        </span>
      </div>
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
            supportText={fieldState.error?.message || ' '}
            {...field}
          />
        )}
      />
      <Button
        align="center"
        mode="primary"
        isLoading={isSubmitting || isPending}
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
  const [passwordVerificationToken, setPasswordVerificationToken] =
    useState('');

  const { mutate, isPending } = useUsersServicePostUsersProfilePhoneChange();
  const { showToast } = useCustomToast();
  const onSaveData = async (code: string) => {
    const token = await fetchToken();
    if (!token) {
      throw new Error('Failed to fetch access token');
    }
    OpenAPI.HEADERS = {
      Authorization: `Bearer ${token}`,
    };
    mutate(
      {
        requestBody: {
          otp: code,
        },
      },
      {
        onSuccess: (response) => {
          onClose?.(true);
          queryClient.invalidateQueries({
            queryKey: ['UsersServiceGetUsersMe'],
          });
        },
        onError: (error: any) => {
          let errorText;
          if (error?.body?.message) {
            errorText = error.body.message;
          } else if (error?.message) {
            errorText = error.message;
          }
          showToast({ message: errorText, type: 'error' });
        },
      },
    );
  };
  return (
    <>
      {stage === ChangeNumberStage.PASSWORD && (
        <InputPasswordForm
          onSubmit={(passwordToken) => {
            setPasswordVerificationToken(passwordToken);
            setStage(ChangeNumberStage.NEW_NUMBER);
          }}
          title="شماره همراه جدید"
          subTitle="جهت تغییر شماره همراه، ابتدا رمز فعلی خود را وارد کنید.
"
        />
      )}
      {stage === ChangeNumberStage.NEW_NUMBER && (
        <NewNumber
          title="شماره همراه جدید"
          onSubmit={(data) => {
            setStage(ChangeNumberStage.OTP);
            setNewNumber(data.phoneNumber);
          }}
          passwordVerificationToken={passwordVerificationToken}
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
          }}
          isLoading={isPending}
        />
      )}
    </>
  );
};
