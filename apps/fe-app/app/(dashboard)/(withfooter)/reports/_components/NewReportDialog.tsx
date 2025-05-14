'use client';

import { useState } from 'react';

import {
  Checkbox,
  TextField,
  FileUpload,
  Button,
  Icon,
  Dialog,
  Tooltip,
} from 'design-system';

export const NewReportDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  return (
    <div>
      <Tooltip title="درخواست گزارش جدید" position="top">
        <Button
          align="center"
          type="button"
          isLoading={false}
          mode="primary"
          size="sm"
          onClick={openDialog}
          className="z-50 h-14 w-14 rounded-full"
        >
          {isOpen ? (
            <Icon name="x" size="lg" />
          ) : (
            <Icon name="clipboard-plus" size="lg" />
          )}
        </Button>
      </Tooltip>
      <Dialog
        onClose={closeDialog}
        isOpen={isOpen}
        className="w-[584px] text-right"
      >
        <div className="text-center text-lg font-medium text-gray-800">
          درخواست گزارش جدید
        </div>
        <form>
          <TextField
            label="عنوان گزارش"
            mergeTitleAndPlaceholder={false}
            placeholder="عنوان گزارش مدنظر خود را اینجا وارد کنید..."
            mode="outline"
            trailingIcons={[]}
          />
          <TextField
            label="شرح گزارش"
            mergeTitleAndPlaceholder={false}
            placeholder="میتواند شامل محور افقی و عمودی، روابط آماری و ریاضی و تشریح مدل‌های مالی باشد..."
            mode="outline"
            longText
            trailingIcons={[]}
          />
          <div className="mb-6">
            <h3 className="mb-2 text-sm font-medium">
              پیوست فایل اکسل فرآیند طراحی نمودار را تسهیل می‌کند. (اختیاری)
            </h3>
            <FileUpload types={['xls', 'xlsx']} maxSize={1000000000} />
          </div>
          <div className="mb-8">
            <Checkbox
              onChange={() => console.log('checked')}
              content="در مورد تشریح جزئیات گزارش احتیاج دارم با من تماس گرفته شود."
            />
          </div>
          <Button
            align="center"
            type="button"
            isLoading={false}
            mode="primary"
            size="sm"
          >
            ثبت درخواست
          </Button>
        </form>
      </Dialog>
    </div>
  );
};
