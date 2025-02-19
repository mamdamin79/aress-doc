import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import { ReportSelectionPopupProps } from './ReportSelectionPopup.types';
import { Icon, NewBadge, ReportCardBase, VideoBadge } from 'design-system';

export const ReportSelectionPopup: React.FC<ReportSelectionPopupProps> = ({
  isOpen,
  onClose,
  category,
  isNew,
  summary,
  title,
  video,
  report,
}) => {
  return (
    <Dialog open={isOpen} onClose={() => onClose()} className="relative z-50">
      <div className="flex w-screen items-center justify-center px-8">
        <DialogPanel className="bg-baseBackground flex max-h-[calc(100vh-4rem)] min-w-[668px] max-w-[1048px] flex-col gap-4 overflow-y-auto rounded-3xl px-6 pb-12 pt-8 shadow-lg">
          <div className="flex flex-row items-center gap-1">
            <Icon name="chevron-right" size="lg" />
            <span className="text-md font-medium">بازگشت به لیست گزارش‌ها</span>
          </div>
          <DialogTitle className="text-2xl font-medium">{title}</DialogTitle>
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
          <div className="flex w-full justify-center pt-4">
            <ReportCardBase {...report} />
          </div>
          <div className="flex gap-4">
            <button onClick={() => onClose()}>Cancel</button>
            <button onClick={() => onClose()}>Deactivate</button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};
