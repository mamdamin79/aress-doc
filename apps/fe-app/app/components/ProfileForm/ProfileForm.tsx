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
import { ChangePassword } from './ChangePassword';

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
    null | 'username' | 'phoneNumber' | 'email' | 'password' | 'success'
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

  enum editDialogVerbs {
    phoneNumber = 'شماره همراه',
    username = 'نام کاربری',
    email = 'ایمیل',
  }
  const [iconDialogText, setIconDialogText] = useState<editDialogVerbs>(
    editDialogVerbs.phoneNumber,
  );
  return (
    <form className="flex w-fit flex-col items-center gap-12">
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
            title={`${iconDialogText} جدید با موفقیت ذخیره شد!`}
            message=""
          />
        ) : (
          <Popup
            isOpen
            onClose={() => setEditDialog(null)}
            className="w-[500px] p-6"
          >
            {editDialog === 'phoneNumber' && (
              <ChangeNumber
                onClose={(success) => setEditDialog(success ? 'success' : null)}
              />
            )}
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
            {editDialog === 'password' && <ChangePassword />}
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
                mode="filled"
                type="text"
                trailingIcons={
                  edit
                    ? [
                        {
                          name: 'pencil',
                          onClick: () => {
                            if (
                              edit &&
                              editDialogVerbs[
                                edit as keyof typeof editDialogVerbs
                              ]
                            ) {
                              setIconDialogText(
                                editDialogVerbs[
                                  edit as keyof typeof editDialogVerbs
                                ],
                              );
                            }
                            setEditDialog(
                              edit as
                                | 'email'
                                | 'phoneNumber'
                                | 'username'
                                | 'success'
                                | null,
                            );
                          },
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
            onClick={() => setEditDialog('password')}
            align="center"
            isLoading={false}
            mode="primary"
            size="md"
            type="button"
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
