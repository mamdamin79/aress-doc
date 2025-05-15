import { BulletList, NotesHeading, SectionTitle } from 'design-system';
import React from 'react';
import TERMINAL_LOGIN from '@aress-assets/icons/TerminalLogin.svg';
import Image from 'next/image';
import { FormWrapper } from './_components';
import Logo from '@aress-assets/icons/product_logo.svg';
const LoginPage = () => {
  return (
    <div className="relative flex h-full justify-center">
      <svg
        className="fixed left-0 top-0 -z-10 z-0 h-screen w-auto"
        width="408"
        viewBox="0 0 408 1024"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          opacity="0.6"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M105.62 714.862C102.551 722.12 104.029 730.503 109.396 736.273L376.994 1024H0V0H407.945L105.62 714.862Z"
          fill="#E3F8F8"
        />
      </svg>

      <div className="max-w-screen-3xl flex w-full flex-col items-center justify-center gap-10 pt-[26px]">
        <div className="relative flex w-full items-center justify-center py-3">
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
                      title: `همچنین، توصیه می‌کنیم که شیوه‌نامه خدمات ما را به دقت مطالعه فرمایید.`,
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
