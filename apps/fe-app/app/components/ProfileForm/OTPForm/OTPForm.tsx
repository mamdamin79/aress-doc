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
  const [isLoading, setIsLoading] = useState(false);
  const waitingTime = '1:58';
  const handleSubmit = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onSubmit?.(otp);
    }, 1000);
  };
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
      <OtpInput
        shouldAutoFocus
        skipDefaultStyles
        containerStyle="flex flex-row-reverse w-full gap-2"
        inputStyle="h-14 flex-1 min-w-0 basis-0 bg-gray-100 text-center border border-gray-200 rounded-xl"
        value={otp}
        onChange={setOtp}
        numInputs={6}
        renderSeparator={null}
        renderInput={(props) => <input {...props} />}
      />
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
        isLoading={isLoading}
        size="md"
        type="button"
        onClick={handleSubmit}
        disabled={otp.length !== 6}
      >
        تایید کد
      </Button>
    </div>
  );
};
