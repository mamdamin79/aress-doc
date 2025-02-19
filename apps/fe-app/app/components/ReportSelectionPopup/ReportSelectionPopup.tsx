import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import { ReportSelectionPopupProps } from './ReportSelectionPopup.types';
import {
  Button,
  Icon,
  NewBadge,
  ReportCardBase,
  VideoBadge,
} from 'design-system';

export const ReportSelectionPopup: React.FC<ReportSelectionPopupProps> = ({
  isOpen,
  onClose,
  category,
  isNew,
  summary,
  title,
  video,
  report,
  onSubmit,
}) => {
  return (
    <Dialog
      open={isOpen}
      onClose={() => onClose()}
      className="relative z-50 flex w-full justify-center"
    >
      <div className="relative flex w-full min-w-[668px] max-w-[1048px] items-center justify-center">
        <div
          className="absolute -left-2 -top-2 cursor-pointer"
          onClick={onClose}
        >
          <Icon name="CustomCirlcleX" size="lg_plus" />
        </div>
        <DialogPanel className="bg-baseBackground flex h-[calc(100vh-72px)] max-h-[800px] w-full flex-col overflow-hidden rounded-3xl pb-4 pt-8 shadow-lg">
          {/* Scrollable content wrapper */}
          <div className="custom-scrollbar ml-1 flex flex-grow overflow-y-auto">
            <div className="flex flex-col gap-4 px-6">
              <div
                className="flex cursor-pointer flex-row items-center gap-1"
                onClick={onClose}
              >
                <Icon name="chevron-right" size="lg" />
                <span className="text-md font-medium">
                  بازگشت به لیست گزارش‌ها
                </span>
              </div>
              <DialogTitle className="text-2xl font-medium">
                {title}
              </DialogTitle>
              <div className="flex w-full flex-row items-center gap-4">
                <div className="flex flex-row gap-1 text-sm font-medium text-gray-700">
                  <Icon name="layers-2" />
                  <span>{category}</span>
                </div>
                {isNew && <NewBadge />}
                {video && <VideoBadge />}
              </div>
              <div className="w-full border border-gray-300"></div>
              <div className="flex flex-col gap-2">
                <span className="text-md font-medium">معرفی کوتاه:</span>
                <span className="text-sm font-normal">{summary}</span>
              </div>
              <div className="flex w-full justify-center py-4">
                <ReportCardBase {...report} />
              </div>
            </div>
          </div>

          {/* Footer section (does not scroll) */}
          <div className="mt-4 flex w-full flex-row justify-end gap-2 px-6">
            <div className="w-fit">
              <Button
                align="center"
                isLoading={false}
                mode="secondary"
                size="sm"
              >
                اطلاعات بیشتر
              </Button>
            </div>
            <div className="w-fit">
              <Button
                align="center"
                isLoading={false}
                mode="primary"
                size="sm"
                onClick={onSubmit}
              >
                <div className="flex flex-row gap-2">
                  <Icon name="plus" />
                  افزودن
                </div>
              </Button>
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};
