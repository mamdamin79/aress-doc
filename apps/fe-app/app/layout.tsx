'use client'
import { PersianDatePicker } from '@shared';
import './global.css';



export default function RootLayout() {
  return (
    <html lang="en">
      <body className="bg-surface-neutral-background flex justify-center gap-10 mt-10 min-w-[768px]">
        {/* <ReactQueryProvider>{children}</ReactQueryProvider> */}
          <PersianDatePicker mode="single" min="1380/01/01" max="1404/06/03" /> 
          <PersianDatePicker mode="range" min="1380/01/01" max="1404/06/03" /> 
      </body>
    </html>
  );
}
