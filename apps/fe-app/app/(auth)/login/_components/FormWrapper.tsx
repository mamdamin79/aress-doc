'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { LoginForm } from '../../../components';
import { LoginFormValues } from '../../../components/LoginForm/LoginForm.types';

export const FormWrapper: React.FC = () => {
  const router = useRouter();
  const handleLogin = (values: LoginFormValues) => {
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve(values);
        router.push('/');
      }, 1500),
    );
  };
  return <LoginForm onSubmit={(values) => handleLogin(values)} />;
};
