import { BulletList, Button, NotesHeading, SectionTitle } from 'design-system';
import React from 'react';
import TERMINAL_LOGIN from '@aress-assets/icons/TerminalLogin.svg';
import Image from 'next/image';
import { FormWrapper } from './_components';
import Logo from '@aress-assets/icons/product_logo.svg';
const OurTermsOfServiceText: React.FC = () => (
  <div>
    <span>همچنین توصیه می‌کنیم که </span>
    <span className="text-brand-700 cursor-pointer underline-offset-4 hover:underline">
      شیوه‌نامه خدمات
    </span>
    <span> ما را به دقت مطالعه فرمایید.</span>
  </div>
);
const LoginPage = () => {
  return (
    <div className="flex h-full justify-center">
      <div className="max-w-screen-3xl flex w-full flex-col items-start justify-center gap-10 pt-[46px]">
        <div className="relative flex w-full items-center justify-center">
          <div className="absolute right-0 mr-8">
            <div className="flex items-center gap-4">
              <Image alt="logo" src={Logo} width={38} height={38} />
              <h1 className="text-lg font-semibold">
                پردازش اطلاعات مالی آرسس
              </h1>
            </div>
          </div>
          <div>
            <SectionTitle align="center" level={1} title={'خوش آمدید!'} />
          </div>
        </div>
        <div className="flex w-full gap-20 px-[152px]">
          <div className="mt-[72px] w-1/2">
            <FormWrapper />
          </div>
          <div className="flex w-1/2 flex-col gap-4 pt-10">
            <Image
              alt="vector"
              src={TERMINAL_LOGIN}
              width={468}
              height={360}
              className="w-full max-w-[468px] px-8"
            />
            <div className="flex flex-col gap-4">
              <NotesHeading
                icon={{ name: 'shield-alert', size: 'lg' }}
                title={'نکات امنیتی'}
              />
              <div className="text-sm">
                <BulletList
                  items={[
                    {
                      title: `کاربر گرامی، قبل از وارد کردن هرگونه اطلاعات در سایت، لطفاً آدرس مرورگر خود را با آدرس ایمن https://account.aressai.com مقایسه کنید. اگر تفاوتی مشاهده کردید، از ادامه فرآیند خودداری کنید و آن را به اطلاع ما برسانید.`,
                    },
                    {
                      title: `هیچ‌وقت اطلاعات حساب کاربری خود را با دیگران به اشتراک نگذارید.`,
                    },
                    {
                      title: <OurTermsOfServiceText />,
                    },
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
