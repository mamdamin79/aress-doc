import { FooterLite } from '../../(layout)/(footer-lite)';
import { Header } from '../../(layout)/(header)';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
      <FooterLite />
    </>
  );
}
