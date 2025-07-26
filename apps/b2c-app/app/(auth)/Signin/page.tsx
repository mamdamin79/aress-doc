'use client';
import { ProgressBar } from 'design-system';
import React, { useState } from 'react';
import { LoginForms } from './_components/LoginForms';

const page = () => {
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
          progressBarItems={['کد ملی', 'رمز یک‌‌بار مصرف', 'ورود']}
        />
      </div>

      <div className="flex min-h-screen items-start justify-center px-6 pt-40">
        <LoginForms
          currentStep={currentStep}
          onNextStep={handleNextStep}
          onPrevStep={handlePrevStep}
        />
      </div>
    </>
  );
};

export default page;
