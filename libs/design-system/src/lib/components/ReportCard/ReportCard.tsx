'use client';
import React, { useState } from 'react';
import { Icon } from '../Icon';
import Image from 'next/image';
import { NewBadge, VideoBadge, LikeBadge } from './Badges/Badges';
import { cn } from '../../../utils/classNames.utils';
import { Button } from '../Button';
import {
  FinancialReportListItemApiModel,
  OpenAPI,
  useDashboardServicePostDashboardReportsByReportIdFavorite,
  useDashboardServiceDeleteDashboardReportsByReportIdFavorite,
} from '@openapi';

export interface CardComponentProps {
  title: string;
  summary: string;
  reportSubscription: string;
  categoryType: string;
  newBadge?: boolean;
  videoBadge?: boolean;
  image: string;
  fixedBrief?: boolean;
  userFavorite?: boolean;
}

export const ReportCard: React.FC<
  FinancialReportListItemApiModel & CardComponentProps
> = ({
  title,
  identifier,
  reportSubscription,
  summary,
  fixedBrief = false,
  categoryType,
  newBadge = false,
  videoBadge = false,
  image,
  userFavorite = false,
}) => {
  const [isLiked, setIsLiked] = useState(userFavorite);

  const { mutate: postFavorite } =
    useDashboardServicePostDashboardReportsByReportIdFavorite();
  const { mutate: deleteFavorite } =
    useDashboardServiceDeleteDashboardReportsByReportIdFavorite();

  OpenAPI.HEADERS = {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0IiwiZXhwIjoxNzQwNTYxODgxfQ.AYeDmC-D54omX5jI_I78zNx66a98iKBnNzGqXRN5n3U`,
  };

  const handleLikeToggle = () => {
    if (isLiked) {
      deleteFavorite(
        { reportId: identifier },
        {
          onSuccess: () => setIsLiked(false),
        }
      );
    } else {
      postFavorite(
        { reportId: identifier },
        {
          onSuccess: () => setIsLiked(true),
        }
      );
    }
  };

  return (
    <div
      className={cn(
        `group relative flex flex-col overflow-hidden rounded-3xl border-[3px] border-gray-100 bg-gray-100 transition-all hover:shadow-md`,
        fixedBrief
          ? 'h-[448px] min-w-[380px] max-w-[512px] items-start'
          : 'h-[318px] min-w-[304px] max-w-[416px]',
      )}
    >
      {/* Image Section */}
      <div className="mt-3 w-full px-3">
        <div
          className={cn(
            `bg-baseBackground flex w-full items-center justify-center overflow-hidden rounded-xl shadow-md`,
            fixedBrief ? 'mx-auto h-[192px]' : 'h-[184px]',
          )}
        >
          <Image
            width={408}
            height={192}
            src={image}
            alt="Content Thumbnail"
            className="h-full w-full object-contain"
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
            : 'absolute bottom-6 left-0 max-h-[92px] items-end overflow-hidden transition-all ease-in-out group-hover:max-h-[250px]',
        )}
      >
        <div className="flex h-fit w-fit flex-col gap-2">
          <p
            className={cn(
              'text-gray-1000 max-h-14 overflow-hidden truncate text-ellipsis text-sm font-medium',
              fixedBrief ? 'max-w-[508px]' : 'h-[26px] max-w-[416px]',
            )}
          >
            {title}
          </p>
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

          {/* summary Section fixed */}
          {fixedBrief && (
            <>
              <span className="line-clamp-3 text-right text-sm text-gray-600">
                {summary}
              </span>
              <div className="absolute bottom-4 right-0 flex w-full items-center justify-between px-4">
                <LikeBadge onClick={handleLikeToggle} isLiked={isLiked} />
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

          {/* summary Section (Drawer Animation) */}
          {!fixedBrief && (
            <span className="-mb-2 line-clamp-4 h-fit translate-y-12 transform overflow-hidden text-right text-sm text-gray-600 opacity-0 transition-all duration-500 ease-in-out group-hover:translate-y-0 group-hover:opacity-100">
              {summary}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
