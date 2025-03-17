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
  info: 'bg-blue-100 border-blue-400',
  success: 'bg-green-100 border-green-400',
  error: 'bg-red-100 border-red-400',
  warning: 'bg-yellow-100 border-yellow-400',
};

export const bgIcon = {
  info: 'bg-blue-600',
  success: 'bg-green-600',
  error: 'bg-red-600',
  warning: 'bg-yellow-600',
};
