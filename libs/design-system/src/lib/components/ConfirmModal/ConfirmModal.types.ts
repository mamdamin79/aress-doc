export type ConfirmModalProps = {
  title: string;
  input?: {
    label?: string;
    placeholder?: string;
  };
  checkBoxText?: string;
  confirmButtonText: string;
  cancelButtonText: string;
  onConfirm: ({ checked, input }: { checked: boolean; input?: string }) => void;
  onCancel?: () => void;
};
