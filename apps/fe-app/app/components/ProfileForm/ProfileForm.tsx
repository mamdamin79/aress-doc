'use client';

import React, { useState, useCallback } from 'react';
import {
  Button,
  Icon,
  IconDialog,
  ImageCropper,
  ProfileImageAndUpload,
  TextField,
  Dialog,
} from 'design-system';
import {
  editDialogStatus,
  editDialogVerbs,
  FormSchemaType,
  ProfileFormProps,
} from './ProfileForm.types';
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
  const [editDialog, setEditDialog] = useState<editDialogStatus>(null);
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

  const [iconDialogText, setIconDialogText] = useState<editDialogVerbs>(
    editDialogVerbs.phoneNumber,
  );

  const formSchema: FormSchemaType[] = [
    {
      name: 'fnameAndLname',
      label: 'نام و نام خانوادگی',
      value: fnameAndLname,
      icon: 'user',
    },
    {
      name: 'phoneNumber',
      label: 'شماره همراه',
      value: phoneNumber,
      edit: 'phoneNumber',
      icon: 'phone',
    },
    { name: 'nationalID', label: 'کد ملی', value: nationalID, icon: 'id-card' },
    {
      name: 'email',
      label: 'ایمیل',
      value: email,
      edit: 'email',
      icon: 'mail',
    },
    {
      name: 'username',
      label: 'نام کاربری',
      value: username,
      edit: 'username',
      icon: 'at-sign',
    },
  ];

  return (
    <div className="flex w-full max-w-[1032px] flex-col items-center gap-12">
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
          onClose={() => setSelectedImage(null)}
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
          <Dialog
            isOpen
            onClose={() => setEditDialog(null)}
            className="w-[500px] p-4 sm:p-6"
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
            {editDialog === 'password' && (
              <ChangePassword phone={phoneNumber} />
            )}
          </Dialog>
        ))}

      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
        {formSchema.map(({ name, label, value, edit, icon }) => (
          <TextField
            key={name}
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
                          editDialogVerbs[edit as keyof typeof editDialogVerbs]
                        ) {
                          setIconDialogText(
                            editDialogVerbs[
                              edit as keyof typeof editDialogVerbs
                            ],
                          );
                        }
                        setEditDialog(edit);
                      },
                    },
                  ]
                : []
            }
            leadingIcon={{
              name: icon,
              size: 'lg',
            }}
            label={label}
            placeholder=""
            readOnly
            value={value}
          />
        ))}
      </div>

      <div className="flex w-full justify-start">
        <div className="w-full max-w-[160px]">
          <Button
            onClick={() => setEditDialog('password')}
            align="center"
            isLoading={false}
            mode="primary"
            size="md"
            type="button"
          >
            <div className="flex flex-row gap-2">
              <Icon name="key-round" size="lg" />
              <span>تغییر رمز عبور</span>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};
