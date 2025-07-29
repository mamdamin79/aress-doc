'use client';
import React, { useState } from 'react';

import { Dialog, Icon, platformMappings, PlatformName } from 'design-system';
import Image from 'next/image';
import { ShareReportPopupSkeleton } from './skeletons/ShareReportPopupSkeleton';

export interface SharePopUpProps {
  url: string;
  message: string;
  platformNames: PlatformName[];
  isOpen: boolean;
  onClose: () => void;
  image?: string | null;
}

export const ShareReportPopUp: React.FC<SharePopUpProps> = ({
  url,
  message,
  platformNames = ['Instagram', 'Telegram', 'WhatsApp', 'Linkedin'],
  isOpen,
  onClose,
  image,
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
      className="bg-surface-neutral-primary z-50 max-w-[440px]"
    >
      {image ? (
        <div className="flex w-full flex-col gap-6">
          <p className="text-text-neutral-primary mb-4 text-center text-xl font-medium">
            اشتراک‌گذاری گزارش
          </p>

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
              <Image alt="shared image" src={image} width={400} height={234} />
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
        </div>
      ) : (
        <ShareReportPopupSkeleton />
      )}
    </Dialog>
  );
};
