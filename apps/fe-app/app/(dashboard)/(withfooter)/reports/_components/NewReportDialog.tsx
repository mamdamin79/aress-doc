'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
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
import { useHtmlPaddingRight } from '@shared';
import {
  Body_request_new_report_reports_request_post,
  useReportsServicePostReportsRequest,
} from '@openapi';

type FormFields = {
  title: string;
  description: string;
  call?: boolean;
};

export const NewReportDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const htmlPaddingRight = useHtmlPaddingRight();
  const reportMutation = useReportsServicePostReportsRequest();

  const {
    control,
    handleSubmit,

    formState: { isValid },
    reset,
  } = useForm<FormFields>({
    mode: 'onChange',
    defaultValues: {
      title: '',
      description: '',
      call: false,
    },
  });

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  const onSubmit = async (data: FormFields) => {
    setIsSubmitting(true);

    try {
      const payload: Body_request_new_report_reports_request_post = {
        file: file,
        request_form: {
          title: data.title,
          text: data.description,
          call: `${data.call ?? false}`,
        },
      };

      await reportMutation.mutateAsync({ formData: payload });

      setIsSuccess(true);
      reset();
      setFile(null);
      closeDialog();
    } catch (error) {
      console.error('خطا در ارسال گزارش:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed bottom-[78px] z-30 mr-20"
      style={{
        right: htmlPaddingRight,
      }}
    >
      <Tooltip title="درخواست گزارش جدید" position="top">
        <Button
          align="center"
          type="button"
          isLoading={false}
          mode="primary"
          size="sm"
          onClick={openDialog}
          className="h-14 w-14 rounded-full"
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
        <div className="mb-6 text-center text-lg font-medium">
          درخواست گزارش جدید
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="title"
            control={control}
            rules={{ required: 'عنوان گزارش الزامی است.' }}
            render={({ field, fieldState }) => (
              <TextField
                label="عنوان گزارش"
                mergeTitleAndPlaceholder={false}
                placeholder="عنوان گزارش مدنظر خود را اینجا وارد کنید..."
                mode="outline"
                trailingIcons={[]}
                className="mb-6"
                isError={!!fieldState.error}
                supportText={fieldState.error?.message}
                {...field}
              />
            )}
          />
          <Controller
            name="description"
            control={control}
            rules={{ required: 'شرح گزارش الزامی است.' }}
            render={({ field, fieldState }) => (
              <TextField
                label="شرح گزارش"
                mergeTitleAndPlaceholder={false}
                placeholder="میتواند شامل محور افقی و عمودی، روابط آماری و ریاضی و تشریح مدل‌های مالی باشد..."
                mode="outline"
                longText
                trailingIcons={[]}
                className="mb-6"
                isError={!!fieldState.error}
                supportText={fieldState.error?.message}
                {...field}
              />
            )}
          />
          <div className="mb-6">
            <h3 className="mb-2 text-sm font-medium">
              پیوست فایل اکسل فرآیند طراحی نمودار را تسهیل می‌کند. (اختیاری)
            </h3>
            <FileUpload
              onChange={(selectedFile) => {
                setFile(selectedFile);
              }}
              types={['xls', 'xlsx']}
              maxSize={1000000000}
            />
          </div>
          <div className="mb-8">
            <Controller
              name="call"
              control={control}
              render={({ field }) => (
                <Checkbox
                  onChange={() => field.onChange(!field.value)}
                  checked={field.value}
                  content="در مورد تشریح جزئیات گزارش احتیاج دارم با من تماس گرفته شود."
                />
              )}
            />
          </div>
          <Button
            align="center"
            type="submit"
            isLoading={isSubmitting}
            mode="primary"
            disabled={!isValid}
            size="sm"
          >
            ثبت درخواست
          </Button>
        </form>
      </Dialog>
      {
        <IconDialog
          isOpen={isSuccess}
          onClose={() => setIsSuccess(false)}
          title="درخواست با موفقیت ثبت شد"
          message="گزارش شما با موفقیت ثبت شد و در حال بررسی است."
          mode="success"
        />
      }
    </div>
  );
};
