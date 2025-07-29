'use client';
import { Button, cn, Icon } from 'design-system';
import React, { useState, useEffect } from 'react';
import OtpInput from 'react-otp-input';
import { DEFAULT_COUNTDOWN_SECONDS } from './OTPForm.constants.ts';

export interface OTPFormProps {
  onBackBtn?: () => void;
  title?: string;
  description?: string;
  onSubmit: (code: string) => void;
  className?: string;
  onResendCode?: () => void;
  backBtnLabel?: string;
  isLoading?: boolean;
}

export const OTPForm: React.FC<OTPFormProps> = ({
  onBackBtn,
  onSubmit,
  description = 'کد تایید ارسال شده را وارد کنید',
  title = 'کد تایید را وارد کنید',
  className,
  onResendCode,
  backBtnLabel = 'ویرایش',
  isLoading = false,
}) => {
  const [otp, setOtp] = useState('');
  const [countdown, setCountdown] = useState(DEFAULT_COUNTDOWN_SECONDS);
  const [showResendButton, setShowResendButton] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else {
      setShowResendButton(true);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [countdown]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const handleSubmit = () => {
    onSubmit?.(otp);
  };

  const handleResendCode = () => {
    setCountdown(DEFAULT_COUNTDOWN_SECONDS);
    setShowResendButton(false);
    onResendCode?.();
  };

  return (
    <div
      className={cn(
        'bg-surface-neutral-primary flex w-full flex-col gap-6 text-right',
        className,
      )}
    >
      <div className="flex w-full flex-row justify-between">
        {onBackBtn ? (
          <>
            <span className="w-1/3"></span>
            <span className="text-md text-text-neutral-primary text-center font-medium">
              {title}
            </span>
            <div
              className="text-button-brand-label-plain-default flex w-1/3 cursor-pointer flex-row justify-end text-sm font-medium"
              onClick={onBackBtn}
            >
              {backBtnLabel}
              <Icon name="chevron-left" size="lg" />
            </div>
          </>
        ) : (
          <span className="text-md text-text-neutral-primary w-full text-center font-medium">
            {title}
          </span>
        )}
      </div>
      <span className="text-text-neutral-primary mt-4 text-sm font-medium">
        {description}
      </span>
      <OtpInput
        shouldAutoFocus
        skipDefaultStyles
        containerStyle="flex flex-row-reverse w-full gap-2"
        inputStyle="h-14 flex-1 min-w-0 basis-0  bg-surface-neutral-secondary text-center border border-border-neutral-secondary rounded-xl text-text-neutral-primary"
        value={otp}
        onChange={setOtp}
        numInputs={6}
        renderSeparator={null}
        renderInput={(props) => <input {...props} />}
      />
      <div className="flex flex-row items-center gap-3">
        {countdown > 0 ? (
          <>
            <div className="border-button-brand-border-default text-button-brand-label-plain-default flex w-20 flex-row items-center justify-center gap-2 rounded-md border py-1 font-medium">
              <Icon name="clock" size="md" />
              <span>{formatTime(countdown)}</span>
            </div>
            <span className="text-text-neutral-secondary text-sm font-medium">
              تا ارسال مجدد کد
            </span>
          </>
        ) : (
          showResendButton && (
            <Button
              align="center"
              isLoading={isLoading}
              mode="secondary"
              size="sm"
              className="text-md w-fit px-2 py-1 font-medium"
              onClick={handleResendCode}
            >
              درخواست مجدد کد
            </Button>
          )
        )}
      </div>
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
