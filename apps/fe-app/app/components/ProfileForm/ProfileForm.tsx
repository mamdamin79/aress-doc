'use client';

import React, { useState, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Button,
  Icon,
  IconDialog,
  ImageCropper,
  ProfileImageAndUpload,
  TextField,
} from 'design-system';
import { ProfileFormProps } from './ProfileForm.types';
import { Popup } from '../Popup';
import { ChangeNumber } from './ChangeNumber';
import { ChangeUsername } from './ChangeUsername';
import { ChangeMail } from './ChangeMail';

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
    defaultValues: { fnameAndLname, phoneNumber, nationalID, email, username },
  });

  const [editDialog, setEditDialog] = useState<
    null | 'username' | 'phoneNumber' | 'email' | 'success'
  >(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState(image);

  const handleImageUpload = useCallback(async (croppedImage: string) => {
    if (!croppedImage) return console.error('Cropped image is null');
    setSelectedImage(null);
    setIsLoading(true);

    try {
      const blob = await (await fetch(croppedImage)).blob();
      setProfileImage(URL.createObjectURL(blob));
    } catch (error) {
      console.error('Failed to convert Blob URL to Blob:', error);
    } finally {
      setTimeout(() => setIsLoading(false), 1000);
    }
  }, []);

  const onSubmit = async (data: any) => {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    console.log(data);
  };

  return (
    <form
      className="flex w-fit flex-col items-center gap-12"
      onSubmit={handleSubmit(onSubmit)}
    >
      <ProfileImageAndUpload
        loadingInitial={isLoading}
        maxSize={2e13}
        types={['jpg', 'png']}
        image={profileImage}
        onImageSelect={(image) => setSelectedImage(URL.createObjectURL(image))}
      />
      {selectedImage && (
        <ImageCropper
          image={selectedImage}
          isOpen
          onChange={handleImageUpload}
        />
      )}
      {editDialog &&
        (editDialog === 'success' ? (
          <IconDialog
            isOpen
            mode="success"
            onClose={() => setEditDialog(null)}
            title="نام کاربری جدید با موفقیت ذخیره شد!"
            message=""
          />
        ) : (
          <Popup
            isOpen
            onClose={() => setEditDialog(null)}
            className="w-[500px] p-6"
          >
            {editDialog === 'phoneNumber' && <ChangeNumber />}
            {editDialog === 'username' && (
              <ChangeUsername
                onClose={(success) => setEditDialog(success ? 'success' : null)}
              />
            )}
            {editDialog === 'email' && (
              <ChangeMail
                onClose={(success) => setEditDialog(success ? 'success' : null)}
              />
            )}
          </Popup>
        ))}
      <div className="grid w-[607px] grid-flow-row md:w-[800px] md:grid-cols-2 md:gap-6">
        {[
          { name: 'fnameAndLname', label: 'نام و نام خانوادگی' },
          { name: 'phoneNumber', label: 'شماره همراه', edit: 'phoneNumber' },
          { name: 'nationalID', label: 'کد ملی' },
          { name: 'email', label: 'ایمیل', edit: 'email' },
          { name: 'username', label: 'نام کاربری', edit: 'username' },
        ].map(({ name, label, edit }) => (
          <Controller
            key={name}
            name={
              name as
                | 'email'
                | 'fnameAndLname'
                | 'nationalID'
                | 'phoneNumber'
                | 'username'
            }
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                mergeTitleAndPlaceholder={false}
                mode="outline"
                type="text"
                trailingIcons={
                  edit
                    ? [
                        {
                          name: 'pencil',
                          onClick: () =>
                            setEditDialog(
                              edit as
                                | 'email'
                                | 'phoneNumber'
                                | 'username'
                                | 'success'
                                | null,
                            ),
                        },
                      ]
                    : []
                }
                label={label}
                placeholder=""
                readOnly
                isError={!!fieldState.error}
                supportText={fieldState.error?.message}
                {...field}
              />
            )}
          />
        ))}
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
