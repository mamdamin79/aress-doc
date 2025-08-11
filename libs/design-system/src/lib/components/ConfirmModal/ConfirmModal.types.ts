import { ReactNode } from 'react';

export type ConfirmModalProps = {
  title: string;
  input?: {
    label?: string;
    placeholder?: string;
  };
  description?: ReactNode;
  checkBoxText?: string;
  narrow?: boolean;
  onConfirm: ({ checked, input }: { checked: boolean; input?: string }) => void;
  isOpen: boolean;
  onClose?: () => void;
  cancelBtnLabel?: string;
  submitBtnLabel?: string;
};
