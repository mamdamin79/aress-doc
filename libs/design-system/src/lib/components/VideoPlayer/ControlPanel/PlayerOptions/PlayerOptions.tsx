import { Icon } from '../../../Icon';
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '../../../../../utils/classNames.utils';
import { PLAYBACK_RATES } from './PlayerOptions.constants';
import { Tooltip } from '../../../Tooltip';
import { SharePopUp } from '../../../SharePopUp';
import { VideoQuality } from '../../VideoPlayer.types';

type Props = {
  quality: {
    src: string;
    label: string;
  };
  changeQuality: (quality: VideoQuality) => void;
  fullScreen: () => void;
  pictureInPicture: () => void;
  setPlaybackRate: (rate: number) => void;
  playBackRate: number;
  isFullscreen: boolean;
  qualities: VideoQuality[];
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
          <SharePopUp
            message="لینک ویدیوی آموزشی"
            url="https://www.example.com/video/example/thishasmoretoit/wetypeandwetype"
            platformNames={[
              'Email',
              'Linkedin',
              'Instagram',
              'Telegram',
              'WhatsApp',
              'Sample 1',
              'Sample 2',
            ]}
          />
        </Tooltip>
        <div ref={optionsRef} className="relative">
          <Tooltip
            offset={48}
            title="تنظیمات"
            className={cn('!z-30', { '!hidden': open })}
          >
            <button
              onClick={() => setOpen(!open)}
              className={cn(
                'relative mt-1 flex items-center justify-center p-1 text-white transition-all duration-300',
                { 'rotate-12': open },
              )}
            >
              <span className="hidden sm:block">
                <Icon name="settings" />
              </span>
              <span className="block sm:hidden">
                <Icon size="sm" name="settings" />
              </span>
            </button>
          </Tooltip>
          {
            <div
              dir="rtl"
              className={cn(
                'absolute -right-20 bottom-20 z-20 w-60 overflow-hidden rounded-md border-[1.5px] border-gray-700 bg-gray-900/90 opacity-0 transition-all duration-300 ease-in-out',
                { 'opacity-100': open },
                { 'pointer-events-none': !open },
              )}
              style={{
                maxHeight: openRate || openQuality ? '400px' : '100px',
              }}
            >
              <div
                onClick={() => setOpenRate(true)}
                className={cn(
                  'group relative right-0 flex w-full cursor-pointer items-center justify-between p-3 transition-all duration-700',
                  { 'absolute right-full opacity-0 duration-200': openRate },
                  { 'absolute right-full opacity-0 duration-200': openQuality },
                )}
              >
                <span className="flex flex-row-reverse items-center justify-between gap-2 text-sm font-medium text-white">
                  سرعت پخش
                  <span className="hidden sm:block">
                    <Icon name="circle-gauge" />
                  </span>
                  <span className="block sm:hidden">
                    <Icon size="sm" name="circle-gauge" />
                  </span>
                </span>
                <span className="flex items-center gap-1 text-white">
                  {playBackRate}
                  <span className="hidden sm:block">
                    <Icon name="chevron-left" />
                  </span>
                  <span className="block sm:hidden">
                    <Icon size="sm" name="chevron-left" />
                  </span>
                </span>
              </div>
              <div
                className={cn(
                  'relative bottom-0 right-full h-24 w-full overflow-auto text-white transition-all duration-700 md:h-full',
                  { 'relative right-0': openRate },
                )}
                style={{
                  maxHeight: openRate ? '500px' : '0',
                }}
              >
                <ul>
                  <li
                    onClick={() => setOpenRate(false)}
                    className={cn(
                      'flex cursor-pointer gap-2 py-2 pr-3 transition-colors duration-700 hover:bg-gray-800/80',
                    )}
                  >
                    <span>
                      <span className="hidden sm:block">
                        <Icon name="chevron-right" />
                      </span>
                      <span className="block sm:hidden">
                        <Icon size="sm" name="chevron-right" />
                      </span>
                    </span>
                    <span>سرعت پخش</span>
                  </li>
                  {PLAYBACK_RATES.map((item) => (
                    <li
                      onClick={() => setPlaybackRate(item)}
                      className={cn(
                        'flex cursor-pointer gap-2 py-2 pr-10 transition-colors duration-700 hover:bg-gray-800/80',
                        { 'pr-3': playBackRate === item },
                      )}
                    >
                      {playBackRate === item && (
                        <span>
                          <span className="hidden sm:block">
                            <Icon name="check" />
                          </span>
                          <span className="block sm:hidden">
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
                  'group relative right-0 flex w-full cursor-pointer items-center justify-between p-3 transition-all duration-700',
                  {
                    'absolute right-full scale-y-100 opacity-0 duration-200':
                      openRate,
                  },
                  {
                    'absolute right-full scale-y-100 opacity-0 duration-200':
                      openQuality,
                  },
                )}
              >
                <span className="flex flex-row-reverse items-center justify-between gap-2 text-sm font-medium text-white">
                  کیفیت
                  <span className="hidden sm:block">
                    <Icon name="sliders-horizontal" />
                  </span>
                  <span className="block sm:hidden">
                    <Icon size="sm" name="sliders-horizontal" />
                  </span>
                </span>
                <span className="flex items-center gap-1 text-white">
                  {quality.label}
                  <span>
                    <span className="hidden sm:block">
                      <Icon name="chevron-left" />
                    </span>
                    <span className="block sm:hidden">
                      <Icon size="sm" name="chevron-left" />
                    </span>
                  </span>
                </span>
              </div>

              <div
                className={cn(
                  'relative bottom-0 right-full h-24 w-full overflow-auto text-white opacity-0 transition-all duration-700 md:h-full',
                  { 'relative right-full scale-y-100 opacity-0': openRate },
                  { 'relative right-0 scale-y-100 opacity-100': openQuality },
                )}
                style={{
                  maxHeight: openQuality ? '500px' : '0',
                }}
              >
                <ul>
                  <li
                    onClick={() => setOpenQuality(false)}
                    className={cn(
                      'flex cursor-pointer gap-2 py-2 pr-3 transition-colors duration-700 hover:bg-gray-800/80',
                    )}
                  >
                    <span>
                      <span className="hidden sm:block">
                        <Icon name="chevron-right" />
                      </span>
                      <span className="block sm:hidden">
                        <Icon size="sm" name="chevron-right" />
                      </span>
                    </span>
                    <span>کیفیت پخش</span>
                  </li>
                  {qualities.map((item) => (
                    <li
                      onClick={() => changeQuality(item)}
                      className={cn(
                        'flex cursor-pointer gap-2 py-2 pr-10 transition-colors duration-700 hover:bg-gray-800/80',
                        { 'pr-3': quality.label === item.label },
                      )}
                    >
                      {quality.label === item.label && (
                        <span>
                          <span className="hidden sm:block">
                            <Icon name="check" />
                          </span>
                          <span className="block sm:hidden">
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
          className="!right-1 !z-30"
          title="(i) picture-in-picture حالت"
        >
          <button
            onClick={pictureInPicture}
            className="flex items-center justify-center p-1 text-white transition-all duration-300"
          >
            <span className="hidden sm:block">
              <Icon name="picture-in-picture-2" />
            </span>
            <span className="block sm:hidden">
              <Icon size="sm" name="picture-in-picture-2" />
            </span>
          </button>
        </Tooltip>
        <Tooltip
          offset={48}
          className="!right-1 !z-30"
          title="(f) حالت تمام صفحه "
        >
          <button
            onClick={fullScreen}
            className="flex items-center justify-center p-1 text-white transition-all duration-300"
          >
            <span className="hidden sm:block">
              <Icon name="fullscreen" />
            </span>
            <span className="block sm:hidden">
              <Icon size="sm" name="fullscreen" />
            </span>
          </button>
        </Tooltip>
      </div>
    );
  },
);
