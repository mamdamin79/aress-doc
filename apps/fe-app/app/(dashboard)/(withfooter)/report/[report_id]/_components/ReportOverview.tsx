'use client';
import React from 'react';
import { Button, NewBadge, Icon, LikeBadge } from 'design-system';
// import { TextWithIcon } from 'compositions';
import { Category } from '../_types/api.types';
import { TextWithIcon } from '../../../../../../compositions/TextWithIcon';
import {
  useReportsServiceDeleteReportsByReportIdFavorite,
  useReportsServicePostReportsByReportIdFavorite,
} from '@openapi';
export interface ReportOverviewProps {
  title?: string;
  category?: Category;
  summary?: string;
  userFavorite?: boolean;
  isNew?: boolean;
  reportId?: string;
}
export const ReportOverview: React.FC<ReportOverviewProps> = ({
  title,
  category,
  summary,
  userFavorite,
  isNew,
  reportId,
}) => {
  const addFavoriteMutation = useReportsServicePostReportsByReportIdFavorite();
  const deleteFavoriteMutation =
    useReportsServiceDeleteReportsByReportIdFavorite();

  const handleLike = async (reportId: string, isFavorite: boolean) => {
    if (isFavorite) {
      deleteFavoriteMutation.mutate({ reportId });
    } else {
      addFavoriteMutation.mutate({ reportId: String(reportId) });
    }
  };
  return (
    <div className="flex w-full flex-col gap-4">
      <h3 className="text-right text-2xl font-medium">{title}</h3>
      <div className="flex w-full flex-row justify-between text-sm">
        <div className="text-text-neutral-secondarycontrast flex flex-row items-center gap-4">
          <TextWithIcon
            icon={{ name: 'layers-2', size: 'md' }}
            text={category?.title ?? ''}
          />
          {isNew && <NewBadge />}
        </div>
        <div className="flex flex-row items-center gap-3">
          <LikeBadge
            isLiked={userFavorite ?? false}
            onClick={() => handleLike(reportId ?? '', userFavorite ?? false)}
            size="lg"
          />
          <Button
            align="center"
            isLoading={false}
            mode="primary"
            size="sm"
            theme="brand"
          >
            <div className="flex w-fit flex-row gap-2">
              <Icon name="plus" size="lg" />
              <div> افزودن به داشبورد</div>
            </div>
          </Button>
        </div>
      </div>
      <div className="h-0 w-full border border-gray-300"></div>
      <span className="text-md text-right font-medium">معرفی کوتاه:</span>
      <p className="text-text-neutral-secondary text-sm font-normal">
        {summary}
      </p>
    </div>
  );
};
