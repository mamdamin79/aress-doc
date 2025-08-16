'use client';

import React, { useState } from 'react';
import {
  Button,
  Dialog,
  ImageCropper,
  ProfileImageAndUpload,
  useCustomToast,
} from 'design-system';
import { FormWrapper } from '../FormWrapper/FormWrapper';
import { formSchema } from './ProflieForm.constants';
import { OTPForm } from '../OtpForm/OtpForm';
import { ChangeNationalCode } from '../ChangeNationalCode/ChangeNationalCode';

export const ProfileForm: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>();
  const [otpFormOpen, setOtpFormOpen] = useState(false);
  const [changeNationalCodeOpen, setChangeNationalCodeOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [profileImage] = useState('');
  const { showToast } = useCustomToast();

  return (
    <div className="mb-6 flex w-full flex-col items-center gap-12">
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
            onClick={() => setOtpFormOpen(true)}
          >
            بروز رسانی از سجام
          </Button>
          <Dialog
            className="max-w-[476px]"
            onClose={() => setOtpFormOpen(false)}
            showCloseBtn
            isOpen={otpFormOpen}
          >
            <OTPForm
              isLoading={isLoading}
              onSubmit={async (otpCode) => {
                setIsLoading(true);

                await new Promise((r) => setTimeout(r, 2000));

                if (otpCode === '111111') {
                  showToast({
                    message: 'بروزرسانی با موفقیت انجام شد.',
                    type: 'success',
                  });
                  setOtpFormOpen(false);
                } else {
                  showToast({
                    message: 'کد وارد شده اشتباه است.',
                    type: 'error',
                  });
                }

                setIsLoading(false);
              }}
              title="کد تایید را وارد نمایید"
              description="۰۹۱*******۸۹ کد تایید برای شماره ارسال شد."
              backBtnLabel="تغییر کد ملی"
              onBackBtn={() => {
                setOtpFormOpen(false);
                setChangeNationalCodeOpen(true);
              }}
            />
          </Dialog>

          <Dialog
            className="min-w-[472px] max-w-[472px]"
            onClose={() => setChangeNationalCodeOpen(false)}
            showCloseBtn
            isOpen={changeNationalCodeOpen}
          >
            <ChangeNationalCode />
          </Dialog>
        </div>

        <FormWrapper title="شخص حقیقی" formSchema={formSchema} />
      </div>
    </div>
  );
};
