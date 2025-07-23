import { SectionTitle } from 'design-system';
import React from 'react';
import TERMINAL_LOGIN from '@aress-assets/icons/TerminalLogin.svg?url';
import Image from 'next/image';
import { FormWrapper } from './_components';
import Logo from '@aress-assets/icons/fullLogo.svg?url';

import LogoWithText from '@aress-assets/icons/LogoWithText.svg?url';
import { SecurityNoticeBox } from './_components/SecurityNoticeBox';
const LoginPage = () => {
  return (
    <div className="flex h-full justify-center">
      <div className="max-w-screen-3xl flex w-full flex-col items-start justify-center gap-10 pt-[46px]">
        <div className="flex w-full items-center justify-center">
          <div className="absolute right-0 top-[34px] mr-8">
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
            <SectionTitle align="center" level={1} title={'خوش آمدید!'} />
          </div>
        </div>
        <div className="flex w-full flex-col items-center justify-center gap-8 lg:flex-row">
          <div className="flex w-[448px] flex-col gap-4 pt-8 xl:w-[528px]">
            <FormWrapper />
          </div>
          <div className="hidden w-[448px] flex-col gap-4 lg:flex xl:w-[528px]">
            <Image
              alt="vector"
              src={TERMINAL_LOGIN}
              width={468}
              height={360}
              className="px-8"
            />
            <SecurityNoticeBox />
          </div>
          <div className="block w-[448px] pb-20 lg:hidden xl:w-[528px]">
            <SecurityNoticeBox />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
