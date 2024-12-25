import React, { useState } from 'react';
import { Icon } from '../Icon';
import Image from 'next/image';
import { NewBadge, VideoBadge, LikeBadge } from './Badges';
import { cn } from '../../../utils/classNames.utils';
import { Button } from '../Button';

export interface CardComponentProps {
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
        `group relative flex flex-col overflow-hidden rounded-3xl border-[3px] border-gray-100 bg-gray-100 transition-all`,
        fixedBrief
          ? 'hover:shadow-7xl h-fit min-h-[507px] w-[508px] items-start'
          : 'h-[308px] w-[416px] hover:shadow-md',
      )}
    >
      {/* Image Section */}
      <div className="mt-3 px-3">
        <div
          className={cn(
            `flex w-full items-center justify-center overflow-hidden rounded-xl shadow-md`,
            fixedBrief ? 'h-[247px]' : 'h-[200px]',
          )}
        >
          <Image
            width={476}
            height={247}
            src={image}
            alt="Content Thumbnail"
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      {/* Info Section */}
      <div
        className={cn(
          `w-full`,
          !fixedBrief &&
            'absolute bottom-0 left-0 h-full overflow-hidden bg-gradient-to-b from-[rgba(255,255,255,0)] via-white to-[rgba(255,255,255,1)] opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:duration-500',
        )}
      ></div>
      <div
        className={cn(
          `flex flex-col justify-between gap-3 p-4 transition-all duration-500 ease-in group-hover:duration-700`,
          fixedBrief
            ? 'h-[212px] items-baseline'
            : 'absolute bottom-0 left-0 max-h-[92px] items-end overflow-hidden transition-all ease-in-out group-hover:max-h-[250px]',
        )}
      >
        <div className="flex h-fit w-fit flex-col gap-2">
          <p className="text-gray-1000 text-sm font-semibold">{title}</p>
          <div className="flex flex-row gap-4 text-right text-sm font-medium text-gray-700">
            <span className="flex flex-row items-center gap-1">
              <Icon name="layers-2" key={categoryType} size="md" />
              {categoryType}
            </span>
            <span className="flex flex-row items-center gap-1">
              <Icon name="package" key={reportSubscription} size="md" />
              {reportSubscription}
            </span>
            <div className="flex gap-2">
              {newBadge && <NewBadge />}
              {videoBadge && <VideoBadge />}
            </div>
          </div>

          {/* Brief Section fixed */}
          {fixedBrief && (
            <>
              <span className="line-clamp-3 text-right text-sm text-gray-600">
                {brief}
              </span>
              <div className="absolute bottom-4 right-0 flex w-full items-center justify-between px-4">
                <LikeBadge
                  isLiked={isLikedTemp}
                  onClick={() => setIsLikedTemp(!isLikedTemp)}
                />
                <div className="flex h-[38px] origin-left scale-x-[0.3] transform items-center overflow-hidden rounded-[100px] text-xs opacity-0 transition-all duration-300 ease-in-out group-hover:scale-x-100 group-hover:opacity-100">
                  <Button
                    align="center"
                    isLoading={false}
                    mode="primary"
                    size="md"
                    className="w-fit"
                  >
                    <div className="flex items-center gap-2 whitespace-nowrap opacity-0 transition-colors duration-100 group-hover:opacity-100">
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
            <span className="-mb-2 line-clamp-4 translate-y-12 transform overflow-hidden text-right text-sm text-gray-600 opacity-0 transition-all duration-500 ease-in-out group-hover:translate-y-0 group-hover:opacity-100">
              {brief}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
