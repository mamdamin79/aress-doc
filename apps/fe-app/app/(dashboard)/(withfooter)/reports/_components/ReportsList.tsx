'use client';
import {
  GetReportsCategoriesResponse,
  GetReportsResponse,
  OpenAPI,
  useReportsServiceDeleteReportsByReportIdFavorite,
  useReportsServicePostReportsByReportIdFavorite,
} from '@openapi';
import { cn, ReportCard } from 'design-system';
import React from 'react';
import emptyState from '@aress-assets/icons/Empty state.png';
import Image from 'next/image';
import { FilterReport } from './FilterReport';
import { SearchBar } from './SearchBar';
import { fetchToken } from '../../../../(auth)/auth.utils';
import { SideBar } from './SideBar';

type Props = {
  reports: GetReportsResponse;
  onReportClick?: (identifier: number | string) => void;
  inModal?: boolean;
  categories?: GetReportsCategoriesResponse;
};

export const ReportList: React.FC<Props> = ({
  reports,
  onReportClick,
  inModal = false,
  categories,
}) => {
  const addFavoriteMutation = useReportsServicePostReportsByReportIdFavorite();
  const deleteFavoriteMutation =
    useReportsServiceDeleteReportsByReportIdFavorite();

  const handleLike = async (reportId: number, isFavorite: boolean) => {
    const token = await fetchToken();
    if (!token) {
      throw new Error('Failed to fetch access token');
    }
    OpenAPI.HEADERS = {
      Authorization: `Bearer ${token}`,
    };
    if (isFavorite) {
      deleteFavoriteMutation.mutate({ reportId });
    } else {
      addFavoriteMutation.mutate({ reportId: String(reportId) });
    }
  };
  const baseURL = process.env.NEXT_PUBLIC_API_URL;

  return (
    <>
      <div className="inline-flex items-center justify-center">
        <div className="flex w-full items-start">
          <div
            className={cn('flex flex-row items-center gap-2 py-6', {
              'flex-col items-start gap-0 py-0 pb-2': inModal,
            })}
          >
            <SearchBar inModal={inModal} />
            {!inModal && <FilterReport />}
            {inModal && (
              <SideBar
                inModal={true}
                reports={reports}
                categories={categories ?? []}
              />
            )}
          </div>
        </div>
      </div>
      {reports.length > 0 ? (
        <div
          className={
            inModal
              ? 'flex w-full flex-wrap items-center lg:grid lg:grid-cols-2 justify-center gap-6'
              : '4xl:grid-cols-3 4xl:max-w-[1591px] grid max-w-[1048px] grid-cols-1 items-center gap-6 xl:grid-cols-2'
          }
        >
          {reports.map((report, idx) => (
            <div
              onClick={() => onReportClick?.(report.identifier)}
              key={report.identifier}
              className={
                inModal
                  ? ''
                  : '3xl:max-w-[512px] 3xl:min-w-[512px] 4xl:min-w-[500px] 4xl:max-w-[500px] sm:max-w-[380px] md:min-w-[512px] md:max-w-[512px] xl:min-w-[442px] xl:max-w-[442px]'
              }
            >
              <ReportCard
                link="/report/1"
                categoryType={report.category.title}
                reportSubscription="رایگان"
                fixedBrief={inModal ? false : true}
                newBadge={report.isNew}
                onLike={() =>
                  handleLike(
                    Number(report.identifier),
                    report?.userFavorite ?? false,
                  )
                }
                userFavorite={report.userFavorite}
                videoBadge={report.hasVideo}
                image={baseURL + report.image}
                shadowOnHover
                summary={report.summary}
                title={report.title}
              />
            </div>
          ))}
        </div>
      ) : (
        <div
          className={
            inModal
              ? 'flex w-full flex-wrap items-center justify-center gap-6'
              : '4xl:w-[1550px] mx-auto flex h-full flex-col items-center justify-start md:w-[512px] xl:w-[904px]'
          }
        >
          <Image
            src={emptyState}
            alt="empty state"
            className="h-[345px] w-[380px] object-contain md:h-[380px] md:w-[412px]"
          />
          <p className="text-lg font-normal text-gray-500">
            گزارشی برای نمایش وجود ندارد
          </p>
        </div>
      )}
    </>
  );
};
