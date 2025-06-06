import { Info, Check, TriangleAlert, CircleX } from 'lucide-react';

// this icons for toast types
export const icons = {
  info: <Info strokeWidth={1.8} className="h-5 w-5" />,
  success: <Check strokeWidth={1.8} className="h-5 w-5" />,
  error: <CircleX strokeWidth={1.8} className="h-5 w-5" />,
  warning: <TriangleAlert strokeWidth={1.8} className="h-5 w-5" />,
};

// styles for different modes toast
export const styleToasts = {
  info: 'bg-surface-message-info-100-soft border-border-message-success-info-400',
  success: 'bg-surface-message-success-100-soft border-border-message-success-soft-400',
  error: 'bg-surface-message-error-100-soft border-border-message-error-soft-400',
  warning: 'bg-surface-message-warning-100-soft border-border-message-warning-soft-400',
};

export const bgIcon = {
  info: 'bg-surface-message-info-600-primary',
  success: 'bg-surface-message-success-600-primary',
  error: 'bg-surface-message-error-600-primary',
  warning: 'bg-surface-message-warning-600-primary',
};

// Default timeout for progress toast
export const DEFAULT_TOAST_TIMEOUT = 700;
