'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Checkbox,
  TextField,
  FileUpload,
  Button,
  Icon,
  Dialog,
  Tooltip,
  IconDialog,
} from 'design-system';

export const NewReportDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: 'onChange',
  });

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 5000)); // Simulate API call
    setIsSubmitting(false);
    setIsSuccess(true);
    reset();
    closeDialog();
  };

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
        className="w-[480px] text-right xl:w-[584px]"
      >
        <div className="mb-6 text-center text-lg font-medium text-gray-800">
          درخواست گزارش جدید
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="عنوان گزارش"
            mergeTitleAndPlaceholder={false}
            placeholder="عنوان گزارش مدنظر خود را اینجا وارد کنید..."
            mode="outline"
            trailingIcons={[]}
            className="mb-6"
            {...register('title', { required: 'عنوان گزارش الزامی است.' })}
            supportText={typeof errors.title?.message === 'string' ? errors.title?.message : undefined}
            isError={!!errors.title}
          />
          <TextField
            label="شرح گزارش"
            mergeTitleAndPlaceholder={false}
            placeholder="میتواند شامل محور افقی و عمودی، روابط آماری و ریاضی و تشریح مدل‌های مالی باشد..."
            mode="outline"
            longText
            trailingIcons={[]}
            className="mb-6"
            {...register('description', { required: 'شرح گزارش الزامی است.' })}
            supportText={typeof errors.description?.message === 'string' ? errors.description?.message : undefined}
            isError={!!errors.description}
          />
          <div className="mb-6">
            <h3 className="mb-2 text-sm font-medium">
              پیوست فایل اکسل فرآیند طراحی نمودار را تسهیل می‌کند. (اختیاری)
            </h3>
            <FileUpload
              types={['xls', 'xlsx']}
              maxSize={1000000000}
              {...register('file')}
            />
          </div>
          <div className="mb-8">
            <Checkbox
              {...register('contact')}
              onChange={() => console.log('checked')}
              content="در مورد تشریح جزئیات گزارش احتیاج دارم با من تماس گرفته شود."
            />
          </div>
          <Button
            align="center"
            type="submit"
            isLoading={isSubmitting}
            mode='primary'
            disabled={!isValid}
            size="sm"
          >
            ثبت درخواست
          </Button>
        </form>
      </Dialog>
      {isSuccess && (
        <IconDialog
          isOpen={isSuccess}
          onClose={() => setIsSuccess(false)}
          icon="check-circle"
          title="درخواست با موفقیت ثبت شد"
          description="گزارش شما با موفقیت ثبت شد و در حال بررسی است."
        />
      )}
    </div>
  );
};
