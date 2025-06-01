'use client';
import React, { useState } from 'react';
import { Icon } from '../Icon';
import { Button } from '../Button';
import { platformMappings } from './SharePopUp.constants';
import { PlatformName } from './SharePopUp.constants';
import { Dialog } from '../Dialog';
import { Tooltip } from '../Tooltip';

export interface SharePopUpProps {
  url: string;
  message: string;
  platformNames: PlatformName[];
}

export const SharePopUp: React.FC<SharePopUpProps> = ({
  url,
  message,
  platformNames = ['Instagram', 'Telegram', 'WhatsApp', 'Linkedin'],
}) => {
  const platforms = platformMappings(platformNames, message, url);
  const visibleItems = 5;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [openShare, setOpenShare] = useState(false);

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

  function openShareModal() {
    setOpenShare(true);
  }

  function close() {
    setOpenShare(false);
  }

  return (
    <>
      <Tooltip offset={48} className="!z-30" title='اشتراک گذاری'>
        <button
          onClick={openShareModal}
          className="flex items-center justify-center p-1 text-white transition-all duration-300"
        >
          <span className="hidden sm:block">
            <Icon name="share-2" />
          </span>
          <span className="block sm:hidden">
            <Icon size="sm" name="share-2" />
          </span>
        </button>
      </Tooltip>
      <Dialog
        isOpen={openShare}
        onClose={close}
        className="z-50 max-h-[310px] bg-surface-neutral-primary max-w-[440px]"
      >
        <div className="flex w-full flex-col">
          <p className="mb-4 text-center text-xl font-medium text-text-neutral-secondary">اشتراک گذاری</p>
          <p className="mb-3 text-right text-sm font-medium text-text-neutral-secondary">
            ارسال لینک به:
          </p>
          {currentIndex + visibleItems < platforms.length && (
            <button
              onClick={goLeft}
              className="bg-surface-neutral-primary text-icon-brand-primary-600 border-border-brand-primary-600 shadow-3xl absolute left-2 top-1/2 z-10 -mt-2 -translate-y-1/2 transform rounded-full border-2 p-1"
            >
              <Icon name="chevron-left" size="md" />
            </button>
          )}
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
                    <div>
                      <img
                        width={56}
                        height={56}
                        src={platform.icon}
                        alt={platform.name}
                      />
                    </div>
                    <span className="font-semibold text-text-neutral-primary">{platform.name}</span>
                  </a>
                ))}
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

        <div className="mt-4 flex h-fit w-full flex-row justify-between gap-2 rounded-xl border-[2px] border-border-neutral-primary p-2">
          <div className="w-28 text-nowrap">
            <Button
              onClick={() => navigator.clipboard.writeText(url)}
              align="center"
              isLoading={false}
              mode="primary"
              size="md"
            >
              کپی لینک
            </Button>
          </div>
          <input
            type="text"
            readOnly
            value={`...${url.slice(0, 37)}`}
            className="ltr w-full text-left bg-transparent text-sm text-text-neutral-primary font-semibold outline-none"
          />
        </div>
      </Dialog>
    </>
  );
};
