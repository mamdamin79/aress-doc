import { ReportSelectionPopupProps } from './ReportSelectionPopup.types';
import {
  Button,
  Dialog,
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
      isOpen={isOpen}
      onClose={() => onClose()}
      className="bg-surface-neutral-primary text-text-neutral-primary relative flex h-[90vh] max-h-[800px] min-h-[456px] w-full min-w-[670px] max-w-[696px] items-center justify-center p-0 pr-1 text-right"
    >
      <div className="flex h-full w-full flex-col pt-8">
        {/* Scrollable content wrapper */}
        <div
          dir="ltr"
          className="scrollbar-md flex h-full max-h-[700px] w-full flex-grow overflow-y-auto overflow-x-hidden pb-12 pl-6 pr-4"
        >
          <div className="flex flex-col gap-4" dir="rtl">
            <div
              className="flex cursor-pointer flex-row items-center gap-1"
              onClick={onClose}
            >
              <Icon name="chevron-right" size="lg" />
              <span className="text-md font-medium">
                بازگشت به لیست گزارش‌ها
              </span>
            </div>
            <div className="text-2xl font-medium">{title}</div>
            <div className="flex w-full flex-row items-center gap-4">
              <div className="text-text-neutral-secondarycontrast flex flex-row gap-1 text-sm font-medium">
                <Icon name="layers-2" />
                <span>{category}</span>
              </div>
              {isNew && <NewBadge />}
              {video && <VideoBadge />}
            </div>
            <div className="border-border-neutral-primary w-full border"></div>
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
        <div className="mt-4 flex w-full flex-row justify-end gap-2 px-6 pb-4">
          <div className="w-fit">
            <Button align="center" isLoading={false} mode="secondary" size="sm">
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
      </div>
    </Dialog>
  );
};
