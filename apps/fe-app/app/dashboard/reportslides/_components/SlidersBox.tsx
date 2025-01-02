import { Icon } from 'design-system';
import React from 'react';
import fake2 from '../../fake2.png';
import Image from 'next/image';
export const SlidersBox: React.FC = () => {
  return (
    <div className="flex w-[1280px] flex-col justify-start">
      <div className="flex flex-row">
        <div className="flex h-10 w-fit flex-row items-center justify-center gap-2 rounded-tl-3xl rounded-tr-3xl bg-gray-100 px-4 py-1">
          اسلاید 1
          <Icon name="trash-2" size="sm" />
        </div>
        {/* <div className="h-12 w-4 translate-x-1 rounded-br-3xl border-b-8 border-gray-100 bg-gray-100"></div> */}
      </div>
      <div className="flex h-[688px] w-full flex-col gap-4 rounded-bl-3xl rounded-br-3xl rounded-tl-3xl bg-gray-100 p-4">
        <div className="flex flex-row gap-4">
          <div className="h-80 w-[616px] rounded-2xl shadow-sm">
            <Image
              src={fake2}
              alt="fake2"
              width={616}
              height={80}
              className="h-full w-full"
            />
          </div>
          <div className="h-80 w-[616px] rounded-2xl shadow-sm">
            <Image
              src={fake2}
              alt="fake2"
              width={616}
              height={80}
              className="h-full w-full"
            />
          </div>
        </div>
        <div className="flex flex-row gap-4">
          <div className="h-80 w-[616px] rounded-2xl shadow-sm">
            <Image
              src={fake2}
              alt="fake2"
              width={616}
              height={80}
              className="h-full w-full"
            />
          </div>
          <div className="h-80 w-[616px] rounded-2xl shadow-sm">
            <Image
              src={fake2}
              alt="fake2"
              width={616}
              height={80}
              className="h-full w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
