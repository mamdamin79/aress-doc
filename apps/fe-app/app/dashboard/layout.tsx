import Image from 'next/image';
import { Footer } from '../(layout)/(footer)';
import PRODUCT_LOGO from '@aress-assets/icons/product_logo.svg';
import { HeaderMenus, HeadProfile, SquaredButton } from 'design-system';
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex w-full flex-col gap-2 pt-4">
        <div className="flex flex-row items-center justify-between px-20 pb-2">
          <Image
            src={PRODUCT_LOGO}
            width={48}
            height={48}
            className="h-12 w-12 object-contain"
            alt="product logo"
          />
          <div className="flex flex-row gap-3">
            <HeadProfile
              name="سینا محمدی"
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

        <div className="flex flex-row justify-between border-b border-gray-300 px-20 pb-4 pt-2">
          <HeaderMenus
            menuItems={[
              {
                name: 'داشبورد مدیریتی',
                subMenu: [{ groupLabel: 'تست', children: [] }],
              },
              { name: 'گزارش‌ها' },
            ]}
          />
          <div className="flex flex-row gap-1">
            <span className="text-gray-600">تاریخ امروز: </span>
            <span className="font-medium">
              {new Date().toLocaleDateString('fa-IR')}
            </span>
          </div>
        </div>
      </div>
      {children}
      <Footer />
    </>
  );
}
