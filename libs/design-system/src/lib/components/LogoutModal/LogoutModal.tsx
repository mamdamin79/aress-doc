'use client';
import { Button } from '../Button';
import { Dialog } from '../Dialog';

import React from 'react';
import { LogoutModalProps } from './LogoutModal.types';

export const LogoutModal: React.FC<LogoutModalProps> = ({
  isOpen,
  onClose,
  title = 'خروج از حساب کاربری',
  titleAlign = 'center',
  subtitle,
  onLogout,
}) => {
  return (
    <Dialog
      onClose={onClose}
      isOpen={isOpen}
      className="flex h-fit w-[400px] flex-col gap-4 p-4"
    >
      {/* Title */}
      <div
        className={`text-text-neutral-secondarycontrast text-xl font-bold ${
          titleAlign === 'center' ? 'text-center' : 'text-right'
        }`}
      >
        {title}
      </div>

      {/* Subtitle */}
      {subtitle && (
        <div className="text-text-neutral-secondary text-right text-sm font-normal">
          {subtitle}
        </div>
      )}

      {/* Buttons */}
      <div className="mt-4 flex w-full flex-row justify-between gap-4">
        <Button
          align="center"
          isLoading={false}
          mode="secondary"
          size="md"
          theme="neutral"
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
          onClick={onLogout}
        >
          خروج
        </Button>
      </div>
    </Dialog>
  );
};
