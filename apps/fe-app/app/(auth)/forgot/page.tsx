'use client';
import { IconDialog, ProgressBar } from 'design-system';

import React, { useState } from 'react';
import { ReactComponent as RESET_PASSWORD } from '@aress-assets/icons/ResetPassword.svg';
import { ReactComponent as Logo } from '@aress-assets/icons/fullLogo.svg';
import { ReactComponent as LogoWithText } from '@aress-assets/icons/LogoWithText.svg';
import { Notice } from './_components/Notice';
import { FormWrapper } from './_components';
import { useRouter } from 'next/navigation';

const ForgotPasswordPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isIconDialogOpen, setIsIconDialogOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="flex h-full justify-center">
      <div className="max-w-screen-3xl flex w-full flex-col items-start justify-center gap-6 pt-[46px]">
        <div className="flex w-full items-center justify-center">
          <div className="absolute left-1/2 top-[34px] flex -translate-x-1/2 justify-center md:left-auto md:right-0 md:mr-8 md:translate-x-0">
            <div className="hidden h-[38px] w-[38px] items-center gap-4 py-3 xl:flex">
              <Logo />
              <h1 className="text-text-neutral-primary text-lg font-semibold">
                پردازش اطلاعات مالی آرسس
              </h1>
            </div>
            <div className="flex h-14 w-14 xl:hidden">
              <LogoWithText />
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
            <div className="h-[360px] w-full max-w-[468px] px-8">
              <RESET_PASSWORD />
            </div>
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
        onClose={() => {
          router.push('/login');
        }}
        title="رمز عبور جدید با موفقیت ذخیره شد!"
      />
    </div>
  );
};

export default ForgotPasswordPage;
