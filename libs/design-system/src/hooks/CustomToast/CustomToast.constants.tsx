import { Info, Check, Ban, TriangleAlert } from 'lucide-react';

// this icons for toast types
export const icons = {
  info: <Info strokeWidth={1.8} className="w-6 h-6 text-blue-900" />,
  success: <Check strokeWidth={1.8} className="w-6 h-6 text-green-600" />,
  error: <Ban strokeWidth={1.8} className="w-6 h-6 text-red-600" />,
  warning: (
    <TriangleAlert strokeWidth={1.8} className="w-6 h-6 text-yellow-900" />
  ),
};

// styles for diffrent modes toast
export const styleToasts = {
  info: 'bg-blue-100 border-blue-200 border text-blue-900',
  success: 'bg-green-100 border border-green-200 text-green-600',
  error: 'bg-red-100 border border-red-200 text-red-600',
  warning: 'bg-yellow-100 border border-yellow-200 text-yellow-900',
};
