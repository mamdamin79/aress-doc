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
        <Tooltip offset={48} className="!z-30" title="اشتراک گذاری">
          <button className="text-white flex items-center justify-center p-1  duration-300 transition-all">
            <span className="sm:block hidden">
              <Icon name="share-2" />
            </span>
            <span className="sm:hidden block">
              <Icon size="sm" name="share-2" />
            </span>
          </button>
        </Tooltip>
        <div className="relative">
          <Tooltip
            offset={48}
            title="تنظیمات"
            className={cn('!z-30', { '!hidden': open })}
          >
            <button
              onClick={() => setOpen(!open)}
              className="text-white relative flex items-center justify-center p-1 mt-1  duration-300 transition-all"
            >
              <span className="sm:block hidden">
                <Icon name="settings" />
              </span>
              <span className="sm:hidden block">
                <Icon size="sm" name="settings" />
              </span>
            </button>
          </Tooltip>
          {
            <div
              ref={optionsRef}
              dir="rtl"
              className={cn(
                'w-60 bg-gray-900/90 z-20 border-gray-700 rounded-md duration-300 ease-in-out border-[1.5px] absolute bottom-20 -right-24',
                { 'bottom-56 opacity-0 hidden': !open }
              )}
            >
              <Disclosure as="div" className="">
                <DisclosureButton className="p-3 group flex w-full items-center justify-between">
                  <span className="flex-row-reverse gap-2 items-center font-medium text-white text-sm flex justify-between ">
                    سرعت پخش
                    <span className="sm:block hidden">
                      <Icon name="circle-gauge" />
                    </span>
                    <span className="sm:hidden block">
                      <Icon size="sm" name="circle-gauge" />
                    </span>
                  </span>
                  <span className="text-white flex items-center gap-1">
                    {playBackRate}
                    <span className="sm:block hidden">
                      <Icon name="chevron-left" />
                    </span>
                    <span className="sm:hidden block">
                      <Icon size="sm" name="chevron-left" />
                    </span>
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
                            <span className="sm:block hidden">
                              <Icon name="check" />
                            </span>
                            <span className="sm:hidden block">
                              <Icon size="sm" name="check" />
                            </span>
                          </span>
                        )}{' '}
                        {item}
                      </li>
                    ))}
                  </ul>
                </DisclosurePanel>
              </Disclosure>
              <Disclosure as="div" className=" text-sm font-medium">
                <DisclosureButton className="p-3 group flex w-full items-center justify-between">
                  <span className="flex-row-reverse gap-2 items-center font-medium text-white text-sm flex justify-between ">
                    کیفیت
                    <span className="sm:block hidden">
                      <Icon name="sliders-horizontal" />
                    </span>
                    <span className="sm:hidden block">
                      <Icon size="sm" name="sliders-horizontal" />
                    </span>
                  </span>
                  <span className="text-white flex items-center gap-1">
                    {quality.label}
                    <span>
                      <span className="sm:block hidden">
                        <Icon name="chevron-left" />
                      </span>
                      <span className="sm:hidden block">
                        <Icon size="sm" name="chevron-left" />
                      </span>
                    </span>
                  </span>
                </DisclosureButton>
                <DisclosurePanel className="text-white">
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
                            <span className="sm:block hidden">
                              <Icon name="check" />
                            </span>
                            <span className="sm:hidden block">
                              <Icon size="sm" name="check" />
                            </span>
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
        <Tooltip
          offset={48}
          className="!z-30 !right-12"
          title="(i) picture-in-picture حالت"
        >
          <button
            onClick={pictureInPicture}
            className="text-white flex items-center justify-center p-1  duration-300 transition-all"
          >
            <span className="sm:block hidden">
              <Icon name="picture-in-picture-2" />
            </span>
            <span className="sm:hidden block">
              <Icon size="sm" name="picture-in-picture-2" />
            </span>
          </button>
        </Tooltip>
        <Tooltip
          offset={48}
          className="!z-30 !right-12"
          title="(f) حالت تمام صفحه "
        >
          <button
            onClick={fullScreen}
            className="text-white flex items-center justify-center p-1  duration-300 transition-all"
          >
            <span className="sm:block hidden">
              <Icon name="fullscreen" />
            </span>
            <span className="sm:hidden block">
              <Icon size="sm" name="fullscreen" />
            </span>
          </button>
        </Tooltip>
      </div>
    );
  }
);
