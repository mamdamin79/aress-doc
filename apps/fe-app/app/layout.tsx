'use client'
import { App } from '@shared';
import './global.css';



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-surface-neutral-background min-w-[768px]">
        {/* <ReactQueryProvider>{children}</ReactQueryProvider> */}
        <App />
      </body>
    </html>
  );
}
