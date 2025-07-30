import { FooterLite } from '../(layout)/(footer-lite)';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col justify-between">
      {children}
      <FooterLite />
    </div>
  );
}
