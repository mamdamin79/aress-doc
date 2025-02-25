'use client';

import { useState } from 'react';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';

import { Checkbox, TextField, FileUpload, Button, Icon } from 'design-system';

export const NewReportDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  return (
    <div>
        <Button
          align="center"
          type="button"
          isLoading={false}
          mode="primary"
          size="sm"
          onClick={openDialog}
          className='rounded-full w-14 h-14'
        >
          {isOpen ? (
            <Icon name="x" size="lg" />
          ) : (
            <Icon name="clipboard-plus" size="lg" />
          )}
        </Button>
      <Dialog
        open={isOpen}
        onClose={closeDialog}
        className="relative z-50 w-full"
      >
        {/* Overlay */}
        <div className="fixed inset-0 bg-black/50" aria-hidden="true" />

        {/* Content */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-lg rounded-lg bg-white p-6 shadow-lg">
            
            <DialogTitle className="text-lg font-medium text-center text-gray-800">
              درخواست گزارش جدید
            </DialogTitle>
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
                trailingIcons={[]}
              />
              <div className="mb-6">
                <h3 className="mb-2 text-sm font-medium">
                  پیوست فایل اکسل فرآیند طراحی نمودار را تسهیل می‌کند. (اختیاری)
                </h3>
                <FileUpload types={['xls', 'xlsx']} maxSize={1000000000} />
              </div>
              <div className="mb-8">
                <Checkbox content="در مورد تشریح جزئیات گزارش احتیاج دارم با من تماس گرفته شود." />
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
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
};
