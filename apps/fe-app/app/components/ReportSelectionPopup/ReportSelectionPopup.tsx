import { useState } from 'react';
import { ReportList } from '../../(dashboard)/(withfooter)/reports/_components/ReportsList';
import { SideBar } from '../../(dashboard)/(withfooter)/reports/_components/SideBar';
import { AddReportButton, Dialog, Pagination } from 'design-system';
import { GetReportsCategoriesResponse, GetReportsResponse } from '@openapi';
interface ReportSelectionPopupProps {
  reports: GetReportsResponse;
  filteredReports: GetReportsResponse;
  currentPage: number;
  pageCount: number;
  pageSize: number;
  totalItems: number;
  categories: GetReportsCategoriesResponse;
  isOpen?: boolean;
  onClose: () => void;
  onReportClick?: (identifier: number | string) => void;
}
export const ReportSelectionPopup: React.FC<ReportSelectionPopupProps> = ({
  reports,
  currentPage,
  pageCount,
  pageSize,
  totalItems,
  categories,
  isOpen,
  onClose,
  onReportClick,
  filteredReports,
}) => {
  return (
    <Dialog
      onClose={onClose}
      isOpen={isOpen}
      className="text-right sm:min-w-[480px] sm:max-w-[576px] lg:max-w-[696px] lg:min-w-[480px]"
      // className="bg-baseBackground relative flex h-[90vh] max-h-[800px] min-h-[456px] w-full min-w-[670px] max-w-[696px] items-center justify-center p-0 pr-1 text-right"
    >
      <div className="mx-auto flex justify-center xl:block">
        <div className="flex flex-col items-stretch justify-between gap-8 md:max-w-[772px] xl:max-w-full xl:justify-center">
          <div>
            <ReportList
              inModal={true}
              reports={reports}
              onReportClick={onReportClick}
              categories={categories}
              filteredReports={filteredReports}
            />
            <div className="mt-12">
              <Pagination
                currentPage={currentPage}
                pageCount={pageCount}
                pageSize={pageSize}
                totalItems={totalItems}
              />
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
};
