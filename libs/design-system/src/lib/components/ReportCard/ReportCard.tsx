import React, { useState } from 'react';
import { Icon } from '../Icon';
import Image from 'next/image';
import { NewBadge, VideoBadge, LikeBadge } from './Badges';
import { cn } from '../../../utils/classNames.utils';
import { Button } from '../Button';

interface CardComponentProps {
  title: string;
  brief: string;
  reportSubscription: string;
  categoryType: string;
  newBadge?: boolean;
  videoBadge?: boolean;
  image: string;
  fixedBrief?: boolean;
  isLiked?: boolean;
}

export const ReportCard: React.FC<CardComponentProps> = ({
  title,
  reportSubscription,
  brief,
  fixedBrief = false,
  categoryType,
  newBadge = false,
  videoBadge = false,
  image,
  isLiked = false,
}) => {
  const [isLikedTemp, setIsLikedTemp] = useState(isLiked);

  return (
    <div
      className={cn(
        `flex flex-col transition-all bg-gray-100 rounded-3xl border-[3px] border-gray-100 relative group overflow-hidden`,
        fixedBrief
          ? 'h-fit min-h-[507px] items-start w-[508px] hover:shadow-7xl'
          : 'h-[308px]  w-[416px] hover:shadow-md'
      )}
    >
      {/* Image Section */}
      <div className="px-3 mt-3">
        <div
          className={cn(
            `w-full rounded-xl overflow-hidden flex justify-center items-center shadow-md`,
            fixedBrief ? 'h-[247px]' : 'h-[200px]'
          )}
        >
          <Image
            width={476}
            height={247}
            src={image}
            alt="Content Thumbnail"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Info Section */}
      <div
        className={cn(
          `w-full`,
          !fixedBrief &&
            'opacity-0 group-hover:opacity-100 transition-opacity duration-500 group-hover:duration-700 ease-in-out absolute bottom-0 left-0 group-hover:h-full overflow-hidden bg-gradient-to-b from-[rgba(255,255,255,0)] via-white to-[rgba(255,255,255,1)]'
        )}
      ></div>
      <div
        className={cn(
          `p-4 gap-3 flex flex-col justify-between transition-all duration-500 ease-in group-hover:duration-700`,
          fixedBrief
            ? 'h-[212px] items-baseline'
            : 'absolute bottom-0 left-0 items-end max-h-[92px] group-hover:max-h-[250px] overflow-hidden transition-all ease-in-out'
        )}
      >
        <div className="w-fit h-fit flex flex-col gap-2">
          {/* Title */}
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
              {/* New Badge */}
              {newBadge && <NewBadge />}
              {/* Video Icon */}
              {videoBadge && <VideoBadge />}
            </div>
          </div>

          {/* Brief Section fixed */}
          {fixedBrief && (
            <>
              <span className="text-sm text-gray-600 text-right line-clamp-3">
                {brief}
              </span>
              <div className="flex items-center justify-between absolute bottom-4 right-0 px-4 w-full">
                <LikeBadge
                  isLiked={isLikedTemp}
                  onClick={() => setIsLikedTemp(!isLikedTemp)}
                />
                <div
                  className="h-[38px] rounded-[100px] overflow-hidden flex items-center text-xs
                  opacity-0 group-hover:opacity-100
                  transform origin-left scale-x-[0.3] group-hover:scale-x-100
                  transition-all duration-300 ease-in-out"
                >
                  <Button
                    align="center"
                    isLoading={false}
                    mode="primary"
                    size="md"
                    className="w-fit"
                  >
                    <div className="flex gap-2 items-center whitespace-nowrap opacity-0 group-hover:opacity-100 transition-colors duration-100">
                      مشاهده گزارش
                      <Icon name="arrow-left" key="arrow-left" size="md" />
                    </div>
                  </Button>
                </div>
              </div>
            </>
          )}

          {/* Brief Section (Drawer Animation) */}
          {!fixedBrief && (
            <span
              className="text-sm text-gray-600 opacity-0 transform translate-y-12 overflow-hidden 
              group-hover:opacity-100 group-hover:translate-y-0
              transition-all duration-500 ease-in-out -mb-2 text-right line-clamp-4"
            >
              {brief}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
