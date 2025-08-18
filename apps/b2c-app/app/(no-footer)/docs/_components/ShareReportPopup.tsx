'use client';
import React, { useState } from 'react';
import {
  Button,
  Dialog,
  Icon,
  platformMappings,
  PlatformName,
} from 'design-system';
import { Icon as Iconify } from '@iconify/react';
import { fileExportType } from './types';
export interface SharePopUpProps {
  url: string;
  message: string;
  platformNames: PlatformName[];
  isOpen: boolean;
  onClose: () => void;
  image?: string | null;
  reportType: string;
  reportExtension: fileExportType;
  startDate: string;
  endDate: string;
}

export const ShareReportPopup: React.FC<SharePopUpProps> = ({
  url,
  message,
  platformNames = ['Instagram', 'Telegram', 'WhatsApp', 'Linkedin'],
  isOpen,
  onClose,
  image,
  reportType,
  reportExtension,
  startDate,
  endDate,
}) => {
  const platforms = platformMappings(platformNames, message, url);
  const visibleItems = 5;
  const [currentIndex, setCurrentIndex] = useState(0);

  const goLeft = () => {
    setCurrentIndex(
      (prevIndex) =>
        Math.min(prevIndex + visibleItems, platforms.length - visibleItems) +
        0.75,
    );
  };

  const goRight = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - visibleItems, 0));
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      className="bg-surface-neutral-primary z-50 w-[440px]"
    >
      <div className="flex w-full flex-col gap-6">
        <div className="flex w-full flex-col items-center justify-center">
          <span className="text-icon-brand-primary-600">
            <Iconify icon="lucide:calculator" width={40} height={40} />
          </span>
          <span className="mt-4 text-lg font-semibold">
            گزارش{' '}
            {reportType === 'accounting'
              ? 'حسابداری'
              : reportType === 'performance'
                ? 'عملکرد'
                : reportType}
          </span>
          <span className="text-text-neutral-secondarycontrast font-medium">
            توضیحات
          </span>
          <div className="flex w-full flex-col gap-2 pb-4 pt-6">
            <div className="flex w-full justify-between text-sm">
              <span className="text-text-neutral-secondary">نوع گزارش</span>
              <span>
                {reportType === 'accounting'
                  ? 'گزارش حسابداری'
                  : reportType === 'performance'
                    ? 'گزارش عملکرد'
                    : reportType}
              </span>
            </div>
            <div className="border-border-neutral-tertiary w-full border"></div>
            <div className="flex w-full justify-between text-sm">
              <span className="text-text-neutral-secondary">فرمت گزارش</span>
              <span>{reportExtension?.toUpperCase()}</span>
            </div>
            <div className="border-border-neutral-tertiary w-full border"></div>
            <div className="flex w-full justify-between text-sm">
              <span className="text-text-neutral-secondary">تاریخ شروع</span>
              <span>{startDate}</span>
            </div>
            <div className="border-border-neutral-tertiary w-full border"></div>
            <div className="flex w-full justify-between text-sm">
              <span className="text-text-neutral-secondary">تاریخ پایان</span>
              <span>{endDate}</span>
            </div>
          </div>
        </div>

        {currentIndex + visibleItems < platforms.length && (
          <button
            onClick={goLeft}
            className="bg-surface-neutral-primary text-icon-brand-primary-600 border-border-brand-primary-600 shadow-3xl absolute left-2 top-1/2 z-10 -mt-2 -translate-y-1/2 transform rounded-full border-2 p-1"
          >
            <Icon name="chevron-left" size="md" />
          </button>
        )}
        {image && (
          <div className="flex w-full justify-center">
            <img alt="shared image" src={image} width={400} height={234} />
          </div>
        )}
        <div className="flex w-full flex-col">
          <p className="text-text-neutral-secondary mb-3 text-right text-sm font-medium">
            ارسال به:
          </p>
          <div className="relative flex w-full items-center overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(${currentIndex * 88}px)`,
              }}
            >
              {platforms
                .slice(currentIndex, currentIndex + visibleItems)
                .map((platform, index) => (
                  <a
                    className="mx-2 flex w-16 flex-col items-center gap-2 text-xs"
                    key={index}
                    href={platform.link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <div className="h-14 w-14">
                      <platform.icon />
                    </div>
                    <span className="text-text-neutral-primary font-semibold">
                      {platform.name}
                    </span>
                  </a>
                ))}
            </div>
          </div>
        </div>

        {currentIndex > 0 && (
          <button
            onClick={goRight}
            className="bg-surface-neutral-primary text-icon-brand-primary-600 border-border-brand-primary-600 shadow-3xl absolute right-2 top-1/2 z-10 -mt-2 -translate-y-1/2 transform rounded-full border-2 p-1"
          >
            <Icon name="chevron-right" size="md" />
          </button>
        )}
        <Button mode="primary" theme="brand" size="md" className="mt-6">
          <div className="flex items-center gap-2">
            <Icon name="download" size="lg" />
            <span className="font-medium">
              {reportExtension === 'CSV' ? 'دانلود' : 'باز کردن'}
            </span>
          </div>
        </Button>
      </div>
    </Dialog>
  );
};
