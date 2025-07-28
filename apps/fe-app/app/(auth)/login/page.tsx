'use client';

import { SectionTitle } from 'design-system';
import React from 'react';
import { ReactComponent as TERMINAL_LOGIN } from '@aress-assets/icons/TerminalLogin.svg';
import { ReactComponent as Logo } from '@aress-assets/icons/fullLogo.svg';
import { ReactComponent as LogoWithText } from '@aress-assets/icons/LogoWithText.svg';
import { FormWrapper } from './_components';
import { SecurityNoticeBox } from './_components/SecurityNoticeBox';

const LoginPage = () => {
  return (
    <div className="flex h-full justify-center">
      <div className="max-w-screen-3xl flex w-full flex-col items-start justify-center gap-10 pt-[46px]">
        <div className="flex w-full items-center justify-center">
          <div className="absolute right-0 top-[34px] mr-8">
            <div className="hidden h-[38px] w-[38px] items-center gap-4 py-3 xl:flex">
              <Logo />
              <h1 className="text-text-neutral-primary text-lg font-semibold">
                پردازش اطلاعات مالی آرسس
              </h1>
            </div>
            <div className="flex h-[56px] w-[56px] xl:hidden">
              <LogoWithText />
            </div>
          </div>
          <div>
            <SectionTitle align="center" level={1} title="خوش آمدید!" />
          </div>
        </div>
        <div className="flex w-full flex-col items-center justify-center gap-8 lg:flex-row">
          <div className="flex w-[448px] flex-col gap-4 pt-8 xl:w-[528px]">
            <FormWrapper />
          </div>
          <div className="hidden w-[448px] flex-col gap-4 lg:flex xl:w-[528px]">
            <div className="h-[360px] w-full max-w-[468px] px-8">
              <TERMINAL_LOGIN />
            </div>
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
