'use client';

import React, { useState } from 'react';
import {
  Button,
  ImageCropper,
  ProfileImageAndUpload,
  TextField,
} from 'design-system';
import { FormSchemaType } from '../AddressForm/AddressForm';

export const ProfileForm: React.FC = (
  {
    //   email,
    //   fnameAndLname,
    //   nationalID,
    //   phoneNumber,
    //   username,
    //   image,
    //   onImageChange,
    //   refetch,
  },
) => {
  const [selectedImage, setSelectedImage] = useState<string | null>();
  const [profileImage] = useState('');
  const formSchema: FormSchemaType[] = [
    {
      name: 'fnameAndLname',
      label: 'نام و نام خانوادگی',
      value: 'محمد امین صاحب',
      icon: 'user',
    },
    {
      name: 'phoneNumber',
      label: 'شماره همراه',
      value: '09392892633',
      icon: 'phone',
    },
    {
      name: 'nationalID',
      label: 'کد ملی',
      value: '1234567890',
      icon: 'id-card',
    },
    {
      name: 'email',
      label: 'ایمیل',
      value: 'mohammadaminsaheb@gmail.com',
      icon: 'mail',
    },
  ];

  return (
    <div className="flex w-full max-w-[1032px] flex-col items-center gap-12">
      <ProfileImageAndUpload
        loadingInitial={false}
        maxSize={2e13}
        types={['jpg', 'png']}
        image={profileImage}
        onImageSelect={(image) => setSelectedImage(URL.createObjectURL(image))}
      />

      {selectedImage && (
        <ImageCropper
          image={selectedImage}
          isOpen
          //   onChange={handleImageUpload}
          onClose={() => setSelectedImage(null)}
        />
      )}

      <div className="flex w-full flex-col items-center gap-6">
        <div className="flex w-full items-center justify-between">
          <div className="text-xl font-semibold">اطلاعات حساب کاربری</div>
          <Button
            iconRight={{ name: 'refresh-cw', size: 'md' }}
            size="sm"
            className="w-[180px]"
            isLoading={false}
            align="center"
            mode="secondary"
          >
            بروز رسانی از سجام
          </Button>
        </div>

        <div className="bg-surface-neutral-primary border-border-neutral-primary flex w-full flex-col gap-6 rounded-3xl border p-6">
          <form className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
            {formSchema.map(({ name, label, value, icon }) => (
              <TextField
                key={name}
                mergeTitleAndPlaceholder={false}
                mode="filled"
                type="text"
                leadingIcon={
                  icon && {
                    name: icon,
                    size: 'lg',
                    color: 'secondary',
                  }
                }
                trailingIcons={[]}
                label={label}
                placeholder=""
                readOnly
                value={value}
              />
            ))}
          </form>
        </div>
      </div>
    </div>
  );
};
