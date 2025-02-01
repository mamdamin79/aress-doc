import { FooterLite } from '../../(layout)/(footer-lite)';
import { Header } from '../../(layout)/(header)';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="pb-20">{children}</div>;
}
