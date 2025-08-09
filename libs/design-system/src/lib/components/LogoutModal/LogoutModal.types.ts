export interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  titleAlign?: 'right' | 'center';
  subtitle?: string;
  onLogout: () => void;
}
