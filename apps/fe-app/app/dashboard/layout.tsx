import Image from 'next/image';
import { Footer } from '../(layout)/(footer)';
import PRODUCT_LOGO from '@aress-assets/icons/product_logo.svg';
import { HeadProfile, SquaredButton } from 'design-system';
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="row flex w-full justify-between px-20 pt-4">
        <Image
          src={PRODUCT_LOGO}
          width={48}
          height={48}
          className="h-12 w-12 object-contain"
          alt="product logo"
        />
        <div className="flex flex-row gap-6 text-sm font-normal">
          <div>
            <span className="text-gray-600">تاریخ امروز: </span>
            <span className="font-medium">
              {new Date().toLocaleDateString('fa-IR')}
            </span>
          </div>
          <div className="flex flex-row gap-3">
            <HeadProfile
              name="احمد محمدی"
              profileImage="https://picsum.photos/200"
            />
            <SquaredButton
              icons={[{ name: 'bell' }]}
              badge={{ enabled: true, text: '3' }}
            />
            <SquaredButton
              icons={[
                {
                  name: 'moon',
                },
                { name: 'sun' },
              ]}
              badge={{ enabled: false }}
            />
          </div>
        </div>
      </div>
      {children}
      <Footer />
    </>
  );
}
