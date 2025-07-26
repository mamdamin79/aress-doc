import { useState } from 'react';
import { ReportList } from '../../(dashboard)/(withfooter)/reports/_components/ReportsList';
import { SideBar } from '../../(dashboard)/(withfooter)/reports/_components/SideBar';
import { AddReportButton, Dialog, Pagination } from 'design-system';
import { GetReportsCategoriesResponse, GetReportsResponse } from '@openapi';
interface ReportSelectionPopupProps {
  reports: GetReportsResponse;
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
}) => {
  return (
    <Dialog
      onClose={onClose}
      isOpen={isOpen}
      className="text-right sm:max-w-[576px] sm:min-w-[480px] "
      // className="bg-baseBackground relative flex h-[90vh] max-h-[800px] min-h-[456px] w-full min-w-[670px] max-w-[696px] items-center justify-center p-0 pr-1 text-right"
    >
      <div className="mx-auto flex justify-center xl:block">
        <div className="flex flex-row-reverse items-stretch justify-between gap-8 md:max-w-[772px] xl:max-w-full xl:justify-center">
          <div>
            <ReportList inModal={true} reports={reports} onReportClick={onReportClick} />
            <div className="mt-12">
              <Pagination
                currentPage={currentPage}
                pageCount={pageCount}
                pageSize={pageSize}
                totalItems={totalItems}
              />
            </div>
          </div>
          {/* <div className={`relative pb-20`}>
            <SideBar reports={reports} categories={categories} />
          </div> */}
        </div>
      </div>
    </Dialog>
  );
};
