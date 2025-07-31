'use client';

import React, { useState } from 'react';
import { Button, ImageCropper, ProfileImageAndUpload } from 'design-system';
import { FormWrapper } from '../FormWrapper/FormWrapper';
import { formSchema } from './ProflieForm.constants';

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

  return (
    <div className="flex w-full flex-col items-center gap-12">
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

        {/* <form className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
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
          </form> */}
        <FormWrapper formSchema={formSchema} />
      </div>
    </div>
  );
};
