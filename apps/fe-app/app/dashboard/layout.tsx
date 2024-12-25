import Image from 'next/image';
import { Footer } from '../(layout)/(footer)';
import fake from './fake.png';
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Image src={fake} alt="fake" className="w-full" />
      {children}
      <Footer />
    </>
  );
}
