'use client';
import {
  Button,
  Icon,
  ImageCropper,
  ProfileImageAndUpload,
  TextField,
} from 'design-system';
import { useForm, Controller } from 'react-hook-form';

import React, { useState } from 'react';
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
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState(image);
  const handleImageUpload = async (croppedImage: string) => {
    setSelectedImage(null);
    setIsLoading(true);
    if (!croppedImage) {
      console.error('Cropped image is null');
      return;
    }
    try {
      const response = await fetch(croppedImage);
      const blob = await response.blob();
      console.log('Converted Blob:', blob);
      const objectUrl = URL.createObjectURL(blob);
      setProfileImage(objectUrl);
    } catch (error) {
      console.error('Failed to convert Blob URL to Blob:', error);
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };
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
        loadingInitial={isLoading}
        maxSize={20000000000000}
        types={['jpg', 'png']}
        image={profileImage}
        onImageSelect={(image) => setSelectedImage(URL.createObjectURL(image))}
      />
      {selectedImage && (
        <ImageCropper
          image={selectedImage}
          isOpen={!!selectedImage}
          onChange={(croppedImage) => {
            handleImageUpload(croppedImage);
          }}
        />
      )}

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
