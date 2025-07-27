'use client';
import { IconDialog, ProgressBar } from 'design-system';

import React, { useState } from 'react';
import RESET_PASSWORD from '@aress-assets/icons/ResetPassword.svg';
import Image from 'next/image';
import Logo from '@aress-assets/icons/fullLogo.svg';
import LogoWithText from '@aress-assets/icons/LogoWithText.svg';
import { Notice } from './_components/Notice';
import { FormWrapper } from './_components';

const ForgotPasswordPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isIconDialogOpen, setIsIconDialogOpen] = useState(false);

  return (
    <div className="flex h-full justify-center">
      <div className="max-w-screen-3xl flex w-full flex-col items-start justify-center gap-6 pt-[46px]">
        <div className="flex w-full items-center justify-center">
          <div className="absolute left-1/2 top-[34px] flex -translate-x-1/2 justify-center md:left-auto md:right-0 md:mr-8 md:translate-x-0">
            <div className="hidden items-center gap-4 py-3 xl:flex">
              <Image alt="logo" src={Logo} width={38} height={38} />
              <h1 className="text-text-neutral-primary text-lg font-semibold">
                پردازش اطلاعات مالی آرسس
              </h1>
            </div>
            <div className="flex xl:hidden">
              <Image alt="logo" src={LogoWithText} width={56} height={56} />
            </div>
          </div>
          <div>
            <div className="mx-auto w-[534px] pt-20 md:pt-3 xl:w-[680px]">
              <ProgressBar
                activeIndex={activeIndex}
                progressBarItems={[
                  'کد ملی و شماره همراه',
                  'رمز عبور جدید',
                  'رمز یک‌بار مصرف',
                ]}
              />
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col items-center justify-center gap-8 lg:flex-row">
          <FormWrapper
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            setIsIconDialogOpen={setIsIconDialogOpen}
          />
          <div className="hidden w-[448px] flex-col gap-4 lg:flex xl:w-[528px]">
            <Image
              alt="vector"
              src={RESET_PASSWORD}
              width={468}
              height={360}
              className="w-full max-w-[468px] px-8"
            />
            {activeIndex !== 1 && <Notice />}
          </div>
          <div className="block w-[448px] pb-20 lg:hidden xl:w-[528px]">
            {activeIndex !== 1 && <Notice />}
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
