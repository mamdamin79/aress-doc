import { FooterLite } from '../../(layout)/(footer-lite)';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <FooterLite />
    </>
  );
}
