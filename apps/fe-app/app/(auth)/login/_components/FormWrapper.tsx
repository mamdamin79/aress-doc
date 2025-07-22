'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { LoginForm } from '../../../components';
import { LoginFormValues } from '../../../components/LoginForm/LoginForm.types';
import { useCustomToast } from 'libs/design-system/src/hooks/CustomToast/CustomToast';
import { Toaster } from 'react-hot-toast';
import { useUsersServicePostUsersLogin } from '@openapi';

export const FormWrapper = () => {
  const { showToast } = useCustomToast();
  const router = useRouter();
  const refetchCaptchaRef = React.useRef<() => void>();
  const { mutate, data, error } = useUsersServicePostUsersLogin({
    onSuccess: (response) => {
      if (response?.access_token) {
        localStorage.setItem('access_token', response.access_token);
        showToast({
          message: 'ورود موفقیت‌آمیز بود!',
          type: 'success',
        });
        router.push('/');
      } else {
        showToast({
          message: 'ورود ناموفق بود. لطفاً دوباره تلاش کنید.',
          type: 'error',
        });
      }
    },
    onError: (error) => {
      // Try to extract API error message
      let apiMessage = 'خطا در ورود. لطفاً اطلاعات را بررسی کنید.';
      if (error && typeof error === 'object') {
        // OpenAPI error shape: error.body?.message or error.body?.detail
        const body = (error as any).body;
        if (body) {
          if (typeof body === 'string') {
            apiMessage = body;
          } else if (typeof body === 'object') {
            if (body.message) {
              apiMessage = body.message;
            } else if (Array.isArray(body.detail) && body.detail.length > 0) {
              // FastAPI validation error shape
              apiMessage = body.detail.map((d: any) => d.msg).join('، ');
            } else if (body.detail && typeof body.detail === 'string') {
              apiMessage = body.detail;
            }
          }
        }
      }
      showToast({
        message: apiMessage,
        type: 'error',
      });
      // Refetch captcha on login error
      if (refetchCaptchaRef.current) {
        refetchCaptchaRef.current();
      }
    },
  });
  const handleLogin = (values: LoginFormValues) => {
    mutate({
      captcha: values.captcha ?? '',
      captchaUid: typeof values.captchaUid === 'number' ? values.captchaUid : 0,
      formData: {
        username: values.username,
        password: values.password,
      },
    });
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
