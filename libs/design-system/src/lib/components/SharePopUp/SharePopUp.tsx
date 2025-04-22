'use client';
import React, { useState } from 'react';
import { Icon } from '../Icon';

import { Button } from '../Button';
import { CustomIcon } from '../Icon/CustomIcon';
import { platformMappings } from './SharePopUp.constants';
import { PlatformName } from './SharePopUp.constants';
import { Dialog, DialogPanel } from '@headlessui/react';
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
      <Dialog
        open={openShare}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="data-[closed]:transform-[scale(95%)] duration-300 ease-out data-[closed]:opacity-0"
            >
              <div className="relative flex h-fit w-[440px] flex-col items-center justify-center gap-4 rounded-3xl bg-white p-6 shadow-lg">
                {/* Close button */}
                <div
                  onClick={close}
                  className="absolute left-0 top-0 -ml-2 -mt-2 flex items-center justify-center rounded-full shadow-sm"
                >
                  <CustomIcon
                    name="CustomCirlcleX"
                    key={`CustomCirlcleX`}
                    size="lg_plus"
                  />
                </div>
                <h2 className="text-xl font-semibold">اشتراک گذاری</h2>
                <div className="flex w-full flex-col gap-3">
                  <p className="text-right text-sm font-semibold text-gray-600">
                    ارسال لینک به:
                  </p>
                  {currentIndex + visibleItems < platforms.length && (
                    <button
                      onClick={goLeft}
                      className="bg-baseBackground text-brand-600 border-brand-600 shadow-3xl absolute left-2 top-1/2 z-10 -mt-2 -translate-y-1/2 transform rounded-full border-2 p-1"
                    >
                      <Icon name="chevron-left" size="md" />
                    </button>
                  )}
                  <div className="relative flex w-full items-center overflow-hidden">
                    {/* Left arrow button */}

                    <div
                      className="flex transition-transform duration-500 ease-in-out"
                      style={{
                        transform: `translateX(${currentIndex * 88}px)`,
                      }} // 88px is the approximate width of each icon with gap
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
                            <span className="font-semibold">
                              {platform.name}
                            </span>
                          </a>
                        ))}
                    </div>
                  </div>
                  {/* Right arrow button */}
                  {currentIndex > 0 && (
                    <button
                      onClick={goRight}
                      className="bg-baseBackground text-brand-600 border-brand-600 shadow-3xl absolute right-2 top-1/2 z-10 -mt-2 -translate-y-1/2 transform rounded-full border-2 p-1"
                    >
                      <Icon name="chevron-right" size="md" />
                    </button>
                  )}
                </div>

                <div className="flex h-fit w-full flex-row justify-between gap-2 rounded-xl border-[2px] border-gray-300 p-2">
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
                    className="ltr w-full text-left text-sm font-semibold outline-none"
                  />
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};
