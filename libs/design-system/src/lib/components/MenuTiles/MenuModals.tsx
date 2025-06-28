import React from 'react';
import { ConfirmModal } from '../ConfirmModal';

type ConfirmModalInput = {
  input?: string;
  checked?: boolean;
};

type CommonProps = {
  isOpen?: boolean;
  onClose: () => void;
  onConfirm?: (data: ConfirmModalInput) => void;
};

// Change Dashboard Name Modal
export const ChangeDashboardNameModal: React.FC<CommonProps> = ({
  isOpen = false,
  onClose,
  onConfirm,
}) => (
  <ConfirmModal
    isOpen={isOpen}
    title="تغییر نام داشبورد"
    input={{
      label: 'نام جدید را وارد کنید',
      placeholder: 'نام مد نظر خود را وارد کنید ...',
    }}
    onClose={onClose}
    checkBoxText=""
    onConfirm={async (data) => {
      onConfirm?.(data);
    }}
  />
);

// Delete Dashboard Modal
export const DeleteDashboardModal: React.FC<CommonProps> = ({
  isOpen = false,
  onClose,
  onConfirm,
}) => (
  <ConfirmModal
    isOpen={isOpen}
    title="تایید حذف داشبورد"
    cancelBtnLabel="خیر"
    submitBtnLabel="بله"
    description={
      <div className="text-sm font-normal">
        آیا مطمئن هستید که می‌خواهید داشبورد <b>صندوق کالایی</b> را حذف کنید؟
      </div>
    }
    onClose={onClose}
    onConfirm={async (data) => {
      onConfirm?.(data);
    }}
  />
);

// New Dashboard Modal
export const NewDashboardModal: React.FC<CommonProps> = ({
  isOpen = false,
  onClose,
  onConfirm,
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
    onConfirm={async (data) => {
      onConfirm?.(data);
    }}
  />
);

// Copy Dashboard Modal
export const CopyDashboardModal: React.FC<CommonProps> = ({
  isOpen = false,
  onClose,
  onConfirm,
}) => (
  <ConfirmModal
    isOpen={isOpen}
    title="کپی کردن داشبورد"
    input={{
      label: 'نام جدید',
      placeholder: 'نام مد نظر خود را وارد کنید ...',
    }}
    checkBoxText="باز کردن در تب جدید"
    onClose={onClose}
    onConfirm={async (data) => {
      onConfirm?.(data);
    }}
  />
);
