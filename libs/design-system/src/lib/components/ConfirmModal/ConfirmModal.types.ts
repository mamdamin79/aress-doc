export type ConfirmModalProps = {
  title: string;
  input?: {
    label: string;
    placeholder: string;
  };
  CheckboxText?: string;
  ConfirmButtonText: string;
  CancelButtonText: string;
  onConfirm: ({ checked, input }: { checked: boolean; input?: string }) => void;
  onCancel?: () => void;
};
