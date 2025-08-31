export interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  titleAlign?: 'right' | 'center';
  subtitle?: string;
  onLogout: () => void;
  variant?: 'b2b' | 'b2c';
}
