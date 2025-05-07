'use client';
import { Button, Dialog } from 'design-system';
import { useRouter } from 'next/navigation';

import React from 'react';
interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export const LogoutModal: React.FC<LogoutModalProps> = ({
  isOpen,
  onClose,
}) => {
  const router = useRouter();
  const logout = () => {
    router.push('/login');
  };
  return (
    <Dialog
      onClose={onClose}
      isOpen={isOpen}
      className="flex h-[181px] w-[400px] flex-col justify-between"
    >
      <div className="text-center text-xl font-bold text-gray-700">
        خروج از حساب کاربری
      </div>
      <div className="flex w-full flex-row justify-between gap-4">
        <Button
          align="center"
          isLoading={false}
          mode="secondary"
          size="md"
          theme="brand"
          onClick={onClose}
        >
          انصراف
        </Button>
        <Button
          align="center"
          isLoading={false}
          mode="primary"
          size="md"
          theme="error"
          onClick={logout}
        >
          خروج
        </Button>
      </div>
    </Dialog>
  );
};
