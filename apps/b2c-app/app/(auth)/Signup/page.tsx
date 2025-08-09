'use client';
import { ProgressBar } from 'design-system';
import React, { useState } from 'react';
import { AuthForm } from '../_components/AuthForm';
import { Result } from './_components/Result';
const PROGRESS_BAR_ITEMS = ['کد ملی', 'رمز یک‌‌بار مصرف', 'ثبت‌نام نهایی'];

const Page = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNextStep = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <>
      <div className="absolute left-1/2 top-12 w-[680px] -translate-x-1/2">
        <ProgressBar
          activeIndex={currentStep}
          progressBarItems={PROGRESS_BAR_ITEMS}
        />
      </div>

      <div className="flex min-h-screen items-start justify-center px-6 pt-40">
        {currentStep === 0 || currentStep === 1 ? (
          <AuthForm
            currentStep={currentStep}
            onNextStep={handleNextStep}
            onPrevStep={handlePrevStep}
            type="signup"
          />
        ) : (
          <Result type="success" />
        )}
      </div>
    </>
  );
};

export default Page;
