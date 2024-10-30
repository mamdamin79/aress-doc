import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { ChevronDownIcon } from 'lucide-react';
import React, { useState } from 'react';

export const HeaderMenus: React.FC = () => {
  const menuItems = [
    { name: 'داشبورد مدیریتی', link: '#' },
    {
      name: 'گزارش‌ها',
      link: '#',
      subMenu: [
        { name: 'گزارش ۱', link: '#' },
        { name: 'گزارش ۲', link: '#' },
      ],
    },
    { name: 'صندوق های سرمایه گذاری', link: '#' },
    {
      name: 'صندوق های من',
      link: '#',
      subMenu: [
        { name: 'صندوق ۱', link: '#' },
        { name: 'صندوق ۲', link: '#' },
      ],
    },
    {
      name: 'بازارها',
      link: '#',
      subMenu: [
        { name: 'بازار ۱', link: '#' },
        { name: 'بازار ۲', link: '#' },
      ],
    },
    { name: 'نمودار', link: '#' },
    { name: 'اشتراکات آریس', link: '#' },
    { name: 'سوالی دارید؟', link: '#' },
  ];

  const [activeTab, setActiveTab] = useState<number>(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <div className="flex items-center gap-6 text-nowrap">
      {menuItems.map((item, index) => (
        <Popover key={index} className="relative group">
          <PopoverButton
            className={`flex items-center gap-2 py-1 hover:text-gray-1000 outline-none transition-colors ${
              activeTab === index ? 'text-gray-1000 font-bold' : 'text-gray-600'
            }`}
            onClick={() => handleTabClick(index)}
          >
            {item.name}
            {item.subMenu && (
              <ChevronDownIcon className="w-4 h-4 transition-transform duration-200 group-data-[open]:rotate-180" />
            )}
          </PopoverButton>

          {item.subMenu && (
            <PopoverPanel
              anchor="bottom"
              className="absolute z-10 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5"
            >
              <div className="flex flex-col p-2 space-y-1">
                {item.subMenu.map((subItem, subIndex) => (
                  <a
                    key={subIndex}
                    href={subItem.link}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {subItem.name}
                  </a>
                ))}
              </div>
            </PopoverPanel>
          )}
          {activeTab === index && (
            <div className="mx-auto w-6 h-[6px] bg-brand-600 rounded-full -mb-2" />
          )}
        </Popover>
      ))}
    </div>
  );
};
