'use client';
import { Button } from '../Button';
import { Dialog } from '../Dialog';

import React from 'react';
import { LogoutModalProps } from './LogoutModal.types';
import { cn } from '../../../utils';

export const LogoutModal: React.FC<LogoutModalProps> = ({
  isOpen,
  onClose,
  title = 'خروج از حساب کاربری',
  titleAlign = 'center',
  subtitle,
  onLogout,
  variant = 'b2b',
}) => {
  return (
    <Dialog
      onClose={onClose}
      isOpen={isOpen}
      className="flex h-fit w-[400px] flex-col gap-4 p-4"
    >
      {/* Title */}
      <div
        className={cn(
          `text-text-neutral-secondarycontrast text-xl font-bold ${
            titleAlign === 'center' ? 'text-center' : 'text-right'
          }`,
          {
            'text-text-neutral-primary font-medium': variant === 'b2c',
          },
        )}
      >
        {title}
      </div>

      {/* Subtitle */}
      {subtitle && (
        <div
          className={cn(
            'text-text-neutral-secondary text-right text-sm font-normal',
            {
              'text-text-neutral-secondarycontrast': variant === 'b2c',
            },
          )}
        >
          {subtitle}
        </div>
      )}

      {/* Buttons */}
      <div
        className={cn('mt-4 flex w-full flex-row justify-between gap-4', {
          'gap-2': variant === 'b2c',
        })}
      >
        <Button
          align="center"
          isLoading={false}
          mode="secondary"
          size={variant === 'b2b' ? 'md' : 'sm'}
          theme="neutral"
          onClick={onClose}
        >
          انصراف
        </Button>
        <Button
          align="center"
          isLoading={false}
          mode="primary"
          size={variant === 'b2b' ? 'md' : 'sm'}
          theme="error"
          onClick={onLogout}
        >
          خروج
        </Button>
      </div>
    </Dialog>
  );
};
