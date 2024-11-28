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
    const [openRate, setOpenRate] = useState(false);
    const [openQuality, setOpenQuality] = useState(false);

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
              className={cn(
                'text-white relative flex items-center justify-center p-1 mt-1   duration-300 transition-all',
                { 'rotate-12': open }
              )}
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
                'w-60 overflow-hidden bg-gray-900/90 z-20 border-gray-700 opacity-0 rounded-md transition-all duration-300  ease-in-out border-[1.5px] absolute bottom-20 -right-20',
                { 'opacity-100': open }
              )}
              style={{
                maxHeight: openRate || openQuality ? '400px' : '100px',
              }}
            >
              <div
                onClick={() => setOpenRate(true)}
                className={cn(
                  'p-3 group flex w-full items-center justify-between transition-all relative right-0 duration-700 ',
                  { 'absolute right-full opacity-0 duration-200': openRate },
                  { 'absolute right-full opacity-0 duration-200': openQuality }
                )}
              >
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
              </div>
              <div
                className={cn(
                  ' w-full text-white relative h-24 overflow-auto  transition-all  duration-700 bottom-0  right-full',
                  { 'relative right-0 ': openRate }
                )}
                style={{
                  maxHeight: openRate ? '500px' : '0',
                }}
              >
                <ul>
                  <li
                    onClick={() => setOpenRate(false)}
                    className={cn(
                      'hover:bg-gray-800/80 transition-colors duration-700 py-2 cursor-pointer flex gap-2 pr-3'
                    )}
                  >
                    <span>
                      <span className="sm:block hidden">
                        <Icon name="chevron-right" />
                      </span>
                      <span className="sm:hidden block">
                        <Icon size="sm" name="chevron-right" />
                      </span>
                    </span>
                    <span>سرعت پخش</span>
                  </li>
                  {PLAYBACK_RATES.map((item) => (
                    <li
                      onClick={() => setPlaybackRate(item)}
                      className={cn(
                        'hover:bg-gray-800/80 transition-colors duration-700 py-2 cursor-pointer flex gap-2 pr-10',
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
              </div>
              <div
                onClick={() => setOpenQuality(true)}
                className={cn(
                  'p-3 group flex w-full items-center justify-between transition-all  relative right-0 duration-700 ',
                  {
                    'scale-y-100 absolute right-full opacity-0 duration-200 ':
                      openRate,
                  },
                  {
                    'scale-y-100 absolute right-full opacity-0 duration-200':
                      openQuality,
                  }
                )}
              >
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
              </div>

              <div
                className={cn(
                  ' w-full text-white relative h-24 bottom-0 transition-all  duration-700 opacity-0 right-full',
                  { 'scale-y-100 opacity-0 right-full relative ': openRate },
                  { 'scale-y-100 right-0 opacity-100 relative': openQuality }
                )}
                style={{
                  maxHeight: openQuality ? '500px' : '0',
                }}
              >
                <ul>
                  <li
                    onClick={() => setOpenQuality(false)}
                    className={cn(
                      'hover:bg-gray-800/80 transition-colors duration-700 py-2 cursor-pointer flex gap-2 pr-3'
                    )}
                  >
                    <span>
                      <span className="sm:block hidden">
                        <Icon name="chevron-right" />
                      </span>
                      <span className="sm:hidden block">
                        <Icon size="sm" name="chevron-right" />
                      </span>
                    </span>
                    <span>کیفیت پخش</span>
                  </li>
                  {qualities.map((item) => (
                    <li
                      onClick={() => changeQuality(item)}
                      className={cn(
                        'hover:bg-gray-800/80 transition-colors duration-700 py-2 cursor-pointer flex gap-2 pr-10',
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
              </div>
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
