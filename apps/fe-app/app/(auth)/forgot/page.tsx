'use client';
import {
  BulletList,
  IconDialog,
  NotesHeading,
  ProgressBar,
  SectionTitle,
} from 'design-system';

import React, { useState } from 'react';
import RESET_PASSWORD from '@aress-assets/icons/ResetPassword.svg';
import Image from 'next/image';
import { NewPasswordForm, OTPForm, ResetPasswordForm } from '../../components';
import Logo from '@aress-assets/icons/product_logo.svg';

const ForgotPasswordPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isIconDialogOpen, setIsIconDialogOpen] = useState(false);

  return (
    <div className="flex h-full justify-center">
      <div className="max-w-screen-3xl flex w-full flex-col items-start justify-center gap-10 pt-[46px]">
        <div className="relative flex w-full items-center justify-center">
          <div className="absolute right-0 top-0 mr-8">
            <div className="flex items-center gap-4">
              <Image alt="logo" src={Logo} width={38} height={38} />
              <h1 className="text-lg font-semibold">
                پردازش اطلاعات مالی آرسس
              </h1>
            </div>
          </div>
          <div>
            <div className="mx-auto w-[680px] pt-3">
              <ProgressBar
                activeIndex={activeIndex}
                progressBarItems={[
                  'کد ملی و شماره همراه',
                  'رمز یک‌بار مصرف',
                  'رمز عبور جدید',
                ]}
              />
            </div>
          </div>
        </div>
        <div className="flex w-full flex-row gap-20 px-[152px]">
          <div className="mt-10 w-[528px]">
            {activeIndex === 0 && (
              <ResetPasswordForm onSubmit={() => setActiveIndex(1)} />
            )}
            {activeIndex === 1 && (
              <div className="rounded-2xl border border-gray-300 p-6">
                <OTPForm
                  onSubmit={() => setActiveIndex(2)}
                  backBtnLabel="ویرایش شماره"
                  title="بازنشانی رمز عبور"
                  onBackBtn={() => setActiveIndex(0)}
                  description="جهت تغییر رمز عبور، ابتدا کد تایید ارسال شده به شماره 09339133225 را وارد کنید."
                />
              </div>
            )}
            {activeIndex === 2 && (
              <NewPasswordForm onSubmit={() => setIsIconDialogOpen(true)} />
            )}
          </div>
          <div className="flex w-1/2 flex-col gap-4 pt-10">
            <Image
              alt="vector"
              src={RESET_PASSWORD}
              width={468}
              height={360}
              className="w-full max-w-[468px] px-8"
            />
            {activeIndex !== 1 && (
              <div className="flex flex-col gap-4">
                <NotesHeading
                  icon={{ name: 'info', size: 'lg' }}
                  title={'فرایند بازنشانی رمز عبور'}
                />
                <BulletList
                  items={[
                    {
                      title: `کد ملی و شماره تماسی که هنگام ثبت نام از آن استفاده کرده‌اید را وارد کنید. ما کد بازیابی
                    رمز عبور را برای شما پیامک می‌کنیم تا از آن برای ساخت رمز عبور جدید استفاده کنید.`,
                    },
                  ]}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <IconDialog
        btnText="بازگشت به صفحه ورود"
        isOpen={isIconDialogOpen}
        mode="success"
        onClose={() => setIsIconDialogOpen(false)}
        title="رمز عبور جدید با موفقیت ذخیره شد!"
      />
    </div>
  );
};

export default ForgotPasswordPage;
