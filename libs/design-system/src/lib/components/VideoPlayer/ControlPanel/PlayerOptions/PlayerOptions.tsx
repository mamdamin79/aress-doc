import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItems,
} from '@headlessui/react';
import { Icon } from '../../../Icon';
import React, { useState } from 'react';
import { cn } from '../../../../../utils/classNames.utils';

type Props = {
  fullScreen: () => void;
  pictureInPicture: () => void;
  setPlaybackRate:(rate:number)=>void,
  playBackRate:number
};

export const PlayerOptions: React.FC<Props> = React.memo(
  ({ pictureInPicture, fullScreen,playBackRate,setPlaybackRate }) => {

    return (
      <div className="flex items-center gap-4">
        <button className="text-white flex items-center justify-center p-1 hover:text-brand-600 duration-300 transition-all">
          <Icon name="share-2" />
        </button>
        <Menu>
          <MenuButton className="text-white relative flex items-center justify-center p-1 hover:text-brand-600 duration-300 transition-all">
            <Icon name="settings" />
          </MenuButton>
          <MenuItems
            className="w-60 bg-gray-900/90 border-gray-700 rounded-md border-[1.5px]"
            anchor={{ to: 'top', gap: '48px' }}
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
                  <li onClick={()=>setPlaybackRate(0.5)} className={cn("hover:bg-gray-800/80 transition-colors duration-200 py-2 cursor-pointer flex gap-2 pr-10",{"pr-3":playBackRate === 0.5})}>
                    {playBackRate === 0.5 && <span><Icon name="check" /></span>} 0.5
                  </li>
                  <li onClick={()=>setPlaybackRate(1)} className={cn("hover:bg-gray-800/80 py-2 cursor-pointer flex gap-2 pr-10",{"pr-3":playBackRate === 1})}>
                    {playBackRate === 1 && <span><Icon name="check" /></span>} 1
                  </li>
                  <li onClick={()=>setPlaybackRate(1.5)} className={cn("hover:bg-gray-800/80 py-2 cursor-pointer flex gap-2 pr-10",{"pr-3":playBackRate === 1.5})}>
                    {playBackRate === 1.5 && <span><Icon name="check" /></span>} 1.5
                  </li>
                  <li onClick={()=>setPlaybackRate(2)} className={cn("hover:bg-gray-800/80 py-2 cursor-pointer flex gap-2 pr-10",{"pr-3":playBackRate === 2})}>
                    {playBackRate === 2 && <span ><Icon name="check" /></span>} 2
                  </li>
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
              <DisclosurePanel className="mt-2 text-sm/5 text-white/50"></DisclosurePanel>
            </Disclosure>
          </MenuItems>
        </Menu>
        <button
          onClick={pictureInPicture}
          className="text-white flex items-center justify-center p-1 hover:text-brand-600 duration-300 transition-all"
        >
          <Icon name="picture-in-picture-2" />
        </button>
        <button
          onClick={fullScreen}
          className="text-white flex items-center justify-center p-1 hover:text-brand-600 duration-300 transition-all"
        >
          <Icon name="fullscreen" />
        </button>
      </div>
    );
  }
);
