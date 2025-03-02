import { Button, Icon } from 'design-system';
import React, { useState } from 'react';
import OtpInput from 'react-otp-input';

export const OTPForm = ({
  onBackBtn,
  onSubmit,
  backButtonText,
  description,
  title,
}: {
  onBackBtn?: () => void;
  backButtonText?: string;
  title?: string;
  description?: string;
  onSubmit: (code: string) => void;
}) => {
  const [otp, setOtp] = useState('');
  const waitingTime = '1:58';
  return (
    <div className="flex w-full flex-col gap-6 text-right">
      <div className="flex w-full flex-row justify-between">
        <span className="w-1/3"></span>
        <span className="text-md text-center font-medium">{title}</span>

        <div
          className="text-brand-600 flex w-1/3 cursor-pointer flex-row justify-end text-sm font-medium"
          onClick={onBackBtn}
        >
          {backButtonText}
          <Icon name="chevron-left" size="lg" />
        </div>
      </div>
      <span className="mt-4 text-sm font-medium">{description}</span>
      <div dir="ltr" className="flex w-full justify-center">
        <OtpInput
          shouldAutoFocus
          skipDefaultStyles
          inputStyle="w-[56px] h-14 bg-gray-100 text-center border border-gray-200 rounded-xl"
          value={otp}
          onChange={setOtp}
          numInputs={6}
          renderSeparator={<div className="w-3"></div>}
          renderInput={(props) => <input {...props} />}
        />
      </div>
      {waitingTime && (
        <div className="flex flex-row items-center gap-3">
          <div className="border-brand-600 text-brand-600 flex w-20 flex-row items-center justify-center gap-2 rounded-md border py-1 font-medium">
            <Icon name="clock" size="md" />
            <span>{waitingTime}</span>
          </div>
          <span className="text-sm font-medium text-gray-600">
            تا ارسال مجدد کد
          </span>
        </div>
      )}
      <Button
        align="center"
        mode="primary"
        isLoading={false}
        size="md"
        type="submit"
        onClick={() => onSubmit(otp)}
      >
        تایید کد
      </Button>
    </div>
  );
};
