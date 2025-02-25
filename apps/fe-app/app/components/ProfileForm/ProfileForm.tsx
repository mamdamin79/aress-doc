'use client';
import { Button, Icon, ProfileImageAndUpload, TextField } from 'design-system';
import { useForm, Controller } from 'react-hook-form';

import React from 'react';
import { ProfileFormProps } from './ProfileForm.types';

export const ProfileForm: React.FC<ProfileFormProps> = ({
  email,
  fnameAndLname,
  nationalID,
  phoneNumber,
  username,
  image,
}) => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      fnameAndLname: fnameAndLname,
      phoneNumber: phoneNumber,
      nationalID: nationalID,
      email: email,
      username: username,
    },
  });

  const onSubmit = async (data: any) => {
    await new Promise((r) => setTimeout(r, 5000));
    console.log(data);
  };
  return (
    <form
      className="flex w-fit flex-col items-center gap-12"
      onSubmit={handleSubmit(onSubmit)}
    >
      <ProfileImageAndUpload
        maxSize={20000000000000}
        types={['jpg', 'png']}
        image={image}
      />
      <div className="grid w-[607px] grid-flow-row md:w-[800px] md:grid-cols-2 md:gap-6">
        <Controller
          name="fnameAndLname"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              mergeTitleAndPlaceholder={false}
              mode="outline"
              type="text"
              trailingIcons={[]}
              label="نام و نام خانوادگی"
              placeholder=""
              isError={!!fieldState.error}
              supportText={fieldState.error?.message}
              readOnly={true}
              {...field}
            />
          )}
        />
        <Controller
          name="phoneNumber"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              mergeTitleAndPlaceholder={false}
              mode="outline"
              type="text"
              trailingIcons={[{ name: 'pencil' }]}
              label="شماره همراه"
              placeholder=""
              isError={!!fieldState.error}
              readOnly={true}
              supportText={fieldState.error?.message}
              {...field}
            />
          )}
        />
        <Controller
          name="nationalID"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              mergeTitleAndPlaceholder={false}
              mode="outline"
              type="text"
              trailingIcons={[]}
              label="کد ملی"
              placeholder=""
              isError={!!fieldState.error}
              supportText={fieldState.error?.message}
              readOnly={true}
              {...field}
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              mergeTitleAndPlaceholder={false}
              mode="outline"
              type="text"
              trailingIcons={[{ name: 'pencil' }]}
              label="ایمیل"
              placeholder=""
              readOnly={true}
              isError={!!fieldState.error}
              supportText={fieldState.error?.message}
              {...field}
            />
          )}
        />
        <Controller
          name="username"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              mergeTitleAndPlaceholder={false}
              mode="outline"
              type="text"
              trailingIcons={[{ name: 'pencil' }]}
              label="نام کاربری"
              placeholder=""
              readOnly={true}
              isError={!!fieldState.error}
              supportText={fieldState.error?.message}
              {...field}
            />
          )}
        />
      </div>
      <div className="-mt-6 flex w-full justify-start">
        <div className="w-40">
          <Button
            align="center"
            isLoading={isSubmitting}
            mode="primary"
            size="md"
            type="submit"
          >
            <div className="flex flex-row gap-2">
              <span>تغییر رمز عبور</span>
              <Icon name="key-round" size="lg" />
            </div>
          </Button>
        </div>
      </div>
    </form>
  );
};
