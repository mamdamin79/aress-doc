'use client';
import { ProgressBar } from 'design-system';
import React, { useState } from 'react';
import { AuthForm } from '../_components/AuthForm';
import { ProgressBarItemType } from 'design-system';
const PROGRESS_BAR_ITEMS: ProgressBarItemType[] = [
  { text: 'کد ملی', status: 'success' },
  { text: 'رمز یک‌‌بار مصرف', status: 'success' },
  { text: 'ورود', status: 'success' },
];
const Page = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNextStep = () => {
    if (currentStep < 1) {
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
        <AuthForm
          currentStep={currentStep}
          onNextStep={handleNextStep}
          onPrevStep={handlePrevStep}
          type="login"
        />
      </div>
    </>
  );
};

export default Page;
