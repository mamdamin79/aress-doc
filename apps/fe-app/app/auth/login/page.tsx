import { BulletList, NotesHeading, SectionTitle } from 'design-system';
import React from 'react';
import { LoginForm } from '../../components/LoginForm';
import TERMINAL_LOGIN from '@aress-assets/icons/TerminalLogin.svg';
import Image from 'next/image';

const login = () => {
  return (
    <div className="h-[100vh]">
      <div className="flex w-full flex-col items-center justify-center gap-10 pt-10">
        <SectionTitle align="center" level={1} title={'خوش آمدید!'} />
        <div className="flex w-full flex-row gap-20 px-[152px]">
          <div className="mt-[72px] w-1/2">
            <LoginForm />
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
                      title: ` همچنین، توصیه می‌کنیم که شیوه‌نامه خدمات ما را به دقت مطالعه فرمایید.`,
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

export default login;
