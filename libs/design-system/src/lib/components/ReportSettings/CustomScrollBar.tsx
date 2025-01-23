import { cn } from 'libs/design-system/src/utils';
import React, { ReactNode, HTMLAttributes } from 'react';

interface CustomScrollbarProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

export const CustomScrollbar: React.FC<CustomScrollbarProps> = ({
  children,
  className = '',
  style = {},
  ...rest
}) => {
  return (
    <div
      className={cn('custom-scrollbar', className)}
      {...rest}
      style={{
        scrollbarWidth: 'thin', // For Firefox
        scrollbarColor: '#8c9096 #d8dbe1', // Thumb and track colors for Firefox
        ...style,
      }}
    >
      <style>
        {`
          /* Webkit Scrollbar Styling */
          .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
            height: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #f3f4f6;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background-color: #4f46e5; /* Customize thumb color */
            border-radius: 8px;
            border: 2px solid #f3f4f6; /* Matches track background */
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background-color: #4338ca;
          }
        `}
      </style>
      {children}
    </div>
  );
};
