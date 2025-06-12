'use client';
import React, { Fragment, useEffect, useState } from 'react';
import {
  Dialog as HeadlessDialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import { cn } from 'libs/design-system/src/utils';
import { Icon } from '../Icon';

export interface DialogProps {
  isOpen?: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  className?: string;
  showCloseBtn?: boolean;
}

export const Dialog: React.FC<DialogProps> = ({
  children,
  isOpen = true,
  onClose,
  className,
  showCloseBtn = true,
}) => {
  const [scrollbarWidth, setScrollbarWidth] = useState('15px');
  useEffect(() => {
    const html = document.documentElement;
    setScrollbarWidth(window.innerWidth - document.body.clientWidth + 'px');

    if (isOpen) {
      html.style.paddingRight = scrollbarWidth;
      html.style.overflow = 'hidden';
    } else {
      html.style.paddingRight = '';
      html.style.overflow = '';
    }

    return () => {
      html.style.paddingRight = '';
      html.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <HeadlessDialog
        static
        as="div"
        className="text-text-neutral-primary relative z-[100] w-screen"
        aria-label="Close dialog"
        onClose={onClose}
      >
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25 backdrop-blur-sm" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel
                className={cn(
                  'border-border-neutral-secondary bg-surface-neutral-primary relative transform rounded-2xl border-2 p-6 text-left align-middle transition-all',
                  className,
                )}
                style={{
                  marginRight: isOpen ? scrollbarWidth : '0',
                }}
              >
                {showCloseBtn && (
                  <button
                    onClick={onClose}
                    className="absolute left-0 top-0 z-10 -ml-2 -mt-2 flex items-center justify-center rounded-full shadow-lg"
                  >
                    <Icon name="CustomCirlcleX" size="lg_plus" />
                  </button>
                )}
                {children}
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </HeadlessDialog>
    </Transition>
  );
};
