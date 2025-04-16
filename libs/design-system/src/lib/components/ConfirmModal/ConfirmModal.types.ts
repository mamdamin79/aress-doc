export type ConfirmModalProps = {
  title: string;
  input?: {
    label?: string;
    placeholder?: string;
  };
  checkBoxText?: string;
  onConfirm: ({ checked, input }: { checked: boolean; input?: string }) => void;
  isOpen: boolean;
  onClose?: () => void;
};
