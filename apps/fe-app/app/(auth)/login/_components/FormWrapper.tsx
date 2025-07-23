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
  const refetchCaptchaRef = React.useRef<() => void>(undefined);

  const handleLogin = async (values: LoginFormValues) => {
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: values.username,
          password: values.password,
          captcha: values.captcha ?? '',
          captchaUid:
            typeof values.captchaUid === 'number' ? values.captchaUid : 0,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        // Store token in localStorage for OpenAPI client usage
        if (data.access_token) {
          localStorage.setItem('access_token', data.access_token);
        }
        showToast({
          message: 'ورود موفقیت‌آمیز بود!',
          type: 'success',
        });
        router.push('/');
      } else {
        showToast({
          message: data.error || 'ورود ناموفق بود. لطفاً دوباره تلاش کنید.',
          type: 'error',
        });
        // Refetch captcha on login error
        if (refetchCaptchaRef.current) {
          refetchCaptchaRef.current();
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      showToast({
        message: error?.message || 'خطا در ورود. لطفاً اطلاعات را بررسی کنید.',
        type: 'error',
      });
      // Refetch captcha on login error
      if (refetchCaptchaRef.current) {
        refetchCaptchaRef.current();
      }
    }
  };
  return (
    <>
      <Toaster position="top-center" />
      <LoginForm
        onSubmit={(values) => handleLogin(values)}
        setRefetchCaptcha={(fn) => {
          refetchCaptchaRef.current = fn;
        }}
      />
    </>
  );
};
