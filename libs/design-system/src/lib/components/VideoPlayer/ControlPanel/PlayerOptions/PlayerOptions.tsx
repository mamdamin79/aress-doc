import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react';
import { Icon } from '../../../Icon';
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '../../../../../utils/classNames.utils';
import { PLAYBACK_RATES } from './PlayerOptions.constants';
import { Tooltip } from '../../../Tooltip';

type Props = {
  quality: {
    src: string;
    label: string;
  };
  changeQuality: (quality: { src: string; label: string }) => void;
  fullScreen: () => void;
  pictureInPicture: () => void;
  setPlaybackRate: (rate: number) => void;
  playBackRate: number;
  isFullscreen: boolean;
  qualities: {
    src: string;
    label: string;
  }[];
};

export const PlayerOptions: React.FC<Props> = React.memo(
  ({
    pictureInPicture,
    fullScreen,
    playBackRate,
    setPlaybackRate,
    isFullscreen,
    qualities,
    quality,
    changeQuality,
  }) => {
    const [open, setOpen] = useState(false);

    const optionsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          optionsRef.current &&
          !optionsRef.current.contains(event.target as Node)
        ) {
          setOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);
    return (
      <div className="flex items-center gap-4">
        <Tooltip className="!z-30" title="اشتراک گذاری">
          <button className="text-white flex items-center justify-center p-1  duration-300 transition-all">
            <Icon name="share-2" />
          </button>
        </Tooltip>
        <div className="relative">
          <Tooltip title="تنظیمات" className="!z-30">
            <button
              onClick={() => setOpen(!open)}
              className="text-white relative flex items-center justify-center p-1 mt-1  duration-300 transition-all"
            >
              <Icon name="settings" />
            </button>
          </Tooltip>
          {
            <div
              ref={optionsRef}
              dir="rtl"
              className={cn(
                'w-60 bg-gray-900/90 z-20 border-gray-700 rounded-md duration-300 ease-in-out border-[1.5px] absolute bottom-20 -right-24',
                { 'bottom-56 opacity-0': !open }
              )}
            >
              <Disclosure as="div" className="" defaultOpen={true}>
                <DisclosureButton className="p-3 group flex w-full items-center justify-between">
                  <span className="flex-row-reverse gap-2 items-center font-medium text-white text-sm flex justify-between ">
                    سرعت پخش <Icon name="circle-gauge" />
                  </span>
                  <span className="text-white flex items-center gap-1">
                    {playBackRate}
                    <Icon name="chevron-left" />
                  </span>
                </DisclosureButton>
                <DisclosurePanel className="text-white">
                  <ul>
                    {PLAYBACK_RATES.map((item) => (
                      <li
                        onClick={() => setPlaybackRate(item)}
                        className={cn(
                          'hover:bg-gray-800/80 transition-colors duration-200 py-2 cursor-pointer flex gap-2 pr-10',
                          { 'pr-3': playBackRate === item }
                        )}
                      >
                        {playBackRate === item && (
                          <span>
                            <Icon name="check" />
                          </span>
                        )}{' '}
                        {item}
                      </li>
                    ))}
                  </ul>
                </DisclosurePanel>
              </Disclosure>
              <Disclosure as="div" className=" text-sm font-medium">
                <DisclosureButton className="p-3 flex w-full items-center justify-between">
                  <span className=" font-medium text-sm flex flex-row-reverse gap-2 text-white">
                    کیفیت
                    <span className="text-white">
                      <Icon name="sliders-horizontal" />
                    </span>
                  </span>
                  <span className="text-white">
                    <Icon name="chevron-left" />
                  </span>
                </DisclosureButton>
                <DisclosurePanel className="mt-2 text-sm/5 text-white/50">
                  <ul>
                    {qualities.map((item) => (
                      <li
                        onClick={() => changeQuality(item)}
                        className={cn(
                          'hover:bg-gray-800/80 transition-colors duration-200 py-2 cursor-pointer flex gap-2 pr-10',
                          { 'pr-3': quality.label === item.label }
                        )}
                      >
                        {quality.label === item.label && (
                          <span>
                            <Icon name="check" />
                          </span>
                        )}{' '}
                        {item.label}
                      </li>
                    ))}
                  </ul>
                </DisclosurePanel>
              </Disclosure>
            </div>
          }
        </div>
        <Tooltip className="!z-30" title="(i) picture-in-picture حالت">
          <button
            onClick={pictureInPicture}
            className="text-white flex items-center justify-center p-1  duration-300 transition-all"
          >
            <Icon name="picture-in-picture-2" />
          </button>
        </Tooltip>
        <Tooltip className="!z-30" title="(f) حالت تمام صفحه ">
          <button
            onClick={fullScreen}
            className="text-white flex items-center justify-center p-1  duration-300 transition-all"
          >
            <Icon name="fullscreen" />
          </button>
        </Tooltip>
      </div>
    );
  }
);
