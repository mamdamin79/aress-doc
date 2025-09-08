'use client'
import './global.css';
import ReactQueryProvider from './providers/ReactQueryProvider';



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="">
        <ReactQueryProvider>{children}</ReactQueryProvider>
          {/* <PersianDatePicker mode="single" min="1380/01/01" max="1404/06/03" /> 
          <PersianDatePicker mode="range" min="1380/01/01" max="1404/06/03" />  */}
      </body>
    </html>
  );
}
