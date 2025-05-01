import React, { useEffect, useState } from 'react';
import { ConfirmModal } from '../ConfirmModal';

type CommonProps = {
  onClose: () => void;
  onConfirm?: (data: any) => void;
  isOpen?: boolean;
};

export const ChangeDashboardNameModal: React.FC<CommonProps> = ({
  onClose,
  onConfirm,
  isOpen = false,
}) => (
  <ConfirmModal
    isOpen={isOpen}
    title="تغییر نام داشبورد"
    input={{
      label: 'نام جدید را وارد کنید',
      placeholder: 'نام مد نظر خود را وارد کنید ...',
    }}
    checkBoxText=""
    onClose={onClose}
    onConfirm={() => {
      // Perform delete
      onClose();
    }}
  />
);

export const DeleteDashboardModal: React.FC<CommonProps> = ({
  onClose,
  isOpen = false,
}) => (
  <ConfirmModal
    isOpen={isOpen}
    title="تایید حذف گزارش"
    onClose={onClose}
    onConfirm={() => {
      // Perform delete
      onClose();
    }}
    cancelBtnLabel="خیر"
    submitBtnLabel="بله"
    description={
      <div className="text-sm font-normal">
        آیا مطمئن هستید که میخواهید گزارش <b>تحلیل صنعت</b> را از این فضا حذف
        کنید؟
      </div>
    }
  />
);

export const NewDashboardModal: React.FC<CommonProps> = ({
  onClose,
  isOpen = false,
}) => (
  <ConfirmModal
    isOpen={isOpen}
    title="افزودن داشبورد جدید"
    input={{
      label: 'نام داشبورد',
      placeholder: 'نام مد نظر خود را وارد کنید ...',
    }}
    checkBoxText="باز کردن در تب جدید"
    onClose={onClose}
    onConfirm={(data) => {
      onClose();
    }}
  />
);

export const CopyDashboardModal: React.FC<CommonProps> = ({
  onClose,
  isOpen = false,
}) => (
  <ConfirmModal
    isOpen={isOpen}
    title="کپی کردن داشبورد"
    input={{
      label: 'نام جدید',
      placeholder: 'نام مد نظر خود را وارد کنید ...',
    }}
    onClose={onClose}
    checkBoxText="باز کردن در تب جدید"
    onConfirm={(data) => {
      // Handle copy
      onClose();
    }}
  />
);

export type ModalName =
  | 'ChangeDashboardModal'
  | 'DeleteDashboardModal'
  | 'NewDashboardModal'
  | 'CopyDashboardModal';

type ModalRendererProps = {
  modalName: ModalName | null;
  modalProps?: any;
  onClose: () => void;
};
