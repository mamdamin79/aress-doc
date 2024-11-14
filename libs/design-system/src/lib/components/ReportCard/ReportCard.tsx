import React from 'react';
import { Icon } from '../Icon';
import Image from 'next/image';
import { NewBadge, VideoBadge } from './Badges';
interface CardComponentProps {
  title: string;
  brief: string;
  reportSubscription: string;
  categoryType: string;
  newBadge?: boolean;
  videoBadge?: boolean;
  image: string;
}

export const ReportCard: React.FC<CardComponentProps> = ({
  title,
  reportSubscription,
  brief,
  categoryType,
  newBadge = false,
  videoBadge = false,
  image,
}) => {
  return (
    <div className="flex flex-col bg-gray-100 w-[416px] rounded-3xl border-[3px] border-gray-100 relative group h-[308px]">
      {/* Image Section */}
      <div className="pl-4 pr-4 mt-4">
        <div className="h-[200px] w-full rounded-xl overflow-hidden flex justify-center items-center shadow-md">
          <Image
            width={384}
            height={200}
            src={image}
            alt="Content Thumbnail"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Info Section */}
      <div
        className="w-full h-[92px] p-4 gap-3 flex justify-between items-center bg-transparent 
                  absolute bottom-0 left-0 cursor-pointer
                  transition-all duration-500 ease-in-out
                  group-hover:h-full group-hover:bg-gradient-to-b group-hover:from-transparent group-hover:via-white group-hover:to-white
                  bg-gradient-to-b from-transparent via-transparent to-transparent overflow-y-hidden"
      >
        <div className="w-fit h-fit flex flex-col gap-2">
          <p className="text-gray-1000 font-semibold text-sm">{title}</p>
          <div className="flex flex-row text-sm font-medium text-right text-gray-700 gap-4">
            <span className="flex flex-row gap-1 items-center">
              <Icon name="layers-2" key={categoryType} size="md" />
              {categoryType}
            </span>
            <span className="flex flex-row gap-1 items-center">
              <Icon name="package" key={reportSubscription} size="md" />
              {reportSubscription}
            </span>
            <div className="flex gap-2">
              {' '}
              {/* New Badge */}
              {newBadge && <NewBadge />}
              {/* Video Icon */}
              {videoBadge && <VideoBadge />}
            </div>
          </div>
          <span className="text-sm text-gray-600 hidden opacity-0 group-hover:opacity-100 transition-all group-hover:block -mb-24">
            {brief}
          </span>
        </div>
      </div>
    </div>
  );
};
