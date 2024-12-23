'use client';
import { BulletList, NotesHeading, ProgressBar } from 'design-system';
import React, { useState } from 'react';
import RESET_PASSWORD from '@aress-assets/icons/ResetPassword.svg';
import Image from 'next/image';
import { ResetPasswordForm } from '../../components/ResetPasswordForm';
import { OTPForm } from '../../components/OTPForm';
import { NewPasswordForm } from '../../components/NewPasswordForm';

const login = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div className="h-[100vh]">
      <div className="flex w-full flex-col items-center justify-center pt-10">
        <div className="-mt-9 w-[680px]">
          {' '}
          <ProgressBar
            activeIndex={activeIndex}
            progressBarItems={[
              'کد ملی و شماره همراه',
              'رمز یک‌بار مصرف',
              'رمز عبور جدید',
            ]}
          />
        </div>

        <div className="flex w-full flex-row gap-20 px-[152px]">
          <div className="mt-[72px] w-1/2">
            {activeIndex === 0 && (
              <ResetPasswordForm onClick={() => setActiveIndex(1)} />
            )}
            {activeIndex === 1 && (
              <OTPForm
                onClick={() => setActiveIndex(2)}
                phoneNumber="09339133225"
              />
            )}
            {activeIndex === 2 && (
              <NewPasswordForm onClick={() => alert('logged in')} />
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default login;
