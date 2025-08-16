import { FooterLite } from '../(layout)/(footer-lite)';
import { Header } from '../(layout)/(header)';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col justify-between">
      <Header />
      {children}
      <FooterLite />
    </div>
  );
}
