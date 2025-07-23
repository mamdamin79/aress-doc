'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { LoginForm } from '../../../components';
import { LoginFormValues } from '../../../components/LoginForm/LoginForm.types';
import { useCustomToast } from 'design-system';
import { Toaster } from 'react-hot-toast';

export const FormWrapper = () => {
  const { showToast } = useCustomToast();
  const router = useRouter();
  const handleLogin = (values: LoginFormValues) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(values);

        if (values.username === 'test' && values.password === 'test')
          router.push('/');
        else
          showToast({
            message: 'شماره همراه یا رمز عبور نادرست است.',
            type: 'error',
          });
      }, 1500);
    });
  };
  return (
    <>
      <Toaster position="top-center" />
      <LoginForm onSubmit={(values) => handleLogin(values)} />
    </>
  );
};
