import React, { useState } from 'react';
import { Icon } from '../Icon';
import { DualSwitch, DualSwitchProps } from '../DualSwitch';
import { ReportSettings } from '../ReportSettings';
import { ContextMenu } from '../ContextMenu';
import { SlideFromLeft } from './SlideFromLeft';
import { OptionsListExplorer } from '../OptionsListExplorer';
import {
  CategoryItem,
  OptionItem,
} from '../OptionsListExplorer/OptionsListExplorer.types';
interface ReportCardBaseProps {
  title: string;
  switchIcons: DualSwitchProps;
  optionsListItems: {
    categories?: CategoryItem[] | null;
    items: OptionItem[];
  };
}
export const ReportCardBase: React.FC<ReportCardBaseProps> = ({
  title,
  switchIcons,
  optionsListItems,
}) => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [optionsListOpen, setOptionsListOpen] = useState(false);
  return (
    <div className="bg-baseBackground group relative flex w-[616px] flex-col overflow-x-hidden shadow-sm">
      <SlideFromLeft isOpen={settingsOpen}>
        <ReportSettings
          onClose={() => setSettingsOpen(false)}
          options={[
            {
              type: 'nestedDropdown',
              props: {
                title: 'مبنای ارزش معاملات',
                subFields: [
                  {
                    title: 'نوع بازار:',
                    icon: { name: 'square-mouse-pointer', size: 'sm' },
                    status: 'normal',
                    selectedOption: 'کل بازار',
                    onClick: () => console.log('نوع بازار clicked'),
                  },
                  {
                    title: 'صنعت:',
                    icon: { name: 'square-mouse-pointer', size: 'sm' },
                    status: 'normal',
                    selectedOption: 'کانی‌ های فلزی',
                    onClick: () => console.log('صنعت clicked'),
                  },
                  {
                    title: 'صنعت:',
                    icon: { name: 'square-mouse-pointer', size: 'sm' },
                    status: 'normal',
                    selectedOption: 'کانی‌ های فلزی',
                    onClick: () => console.log('صنعت clicked'),
                  },
                  {
                    title: 'ابزار مالی:',
                    icon: { name: 'square-mouse-pointer', size: 'sm' },
                    status: 'error',
                    placeHolder: 'یک مورد را انتخاب کنید...',
                    onClick: () => console.log('ابزار مالی clicked'),
                  },
                ],
              },
            },
            {
              type: 'basicSelection',
              props: {
                title: 'نوع نمودار:',
                icon: { name: 'square-mouse-pointer', size: 'sm' },
                status: 'normal',
                selectedOption: 'خطی',
                onClick: () => setOptionsListOpen(true),
              },
            },
            {
              type: 'basicSelection',
              props: {
                title: 'صندوق:',
                icon: { name: 'square-mouse-pointer', size: 'sm' },
                status: 'normal',
                selectedOption: 'مشترک افق روشن سرمایه‌گذاری بانک نوین',
                onClick: () => console.log('hi'),
              },
            },
            {
              type: 'basicSelection',
              props: {
                title: 'دسته‌بندی اوراق:',
                icon: { name: 'square-mouse-pointer', size: 'sm' },
                status: 'normal',
                selectedOption: 'کل اوراق',
                onClick: () => console.log('hi'),
              },
            },
          ]}
        />
      </SlideFromLeft>
      <SlideFromLeft isOpen={optionsListOpen}>
        <OptionsListExplorer
          items={optionsListItems}
          onBackButtonClick={() => setOptionsListOpen(false)}
          onSearch={(value) => console.log(value)}
          title="انتخاب دسته بندی اوراق"
        />
      </SlideFromLeft>
      <div className="relative w-full p-3 pb-2">
        <div className="flex w-full items-center justify-between">
          <div className="flex flex-row items-center text-xs font-semibold">
            <div className="p-1.5">
              <Icon name="info" size="md" />
            </div>
            <span>{title}</span>
          </div>
          <div className="flex flex-row gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <DualSwitch {...switchIcons} />

            <ContextMenu
              anchor="right start"
              items={[
                {
                  icon: 'settings',
                  title: 'تنظیمات گزارش',
                  onClick: () => setSettingsOpen(true),
                },
                {
                  icon: 'share-2',
                  title: 'اشتراک گذاری',
                  onClick: () => console.log('اشتراک گذاری'),
                },
                {
                  icon: 'square-arrow-out-up-right',
                  title: 'هدایت به نسخه مادر',
                  onClick: () => console.log('تنظیمات گزارش'),
                },
                {
                  icon: 'info',
                  title: 'اطلاعات بیشتر',
                  onClick: () => console.log('اطلاعات بیشتر'),
                },
                {
                  icon: 'repeat',
                  title: 'جایگزینی گزارش',
                  onClick: () => console.log('جایگزینی گزارش'),
                },
                {
                  icon: 'trash-2',
                  title: 'حذف گزارش از این فضا',
                  onClick: () => console.log('حذف گزارش از این فضا'),
                },
              ]}
            >
              <Icon name="ellipsis-vertical" size="md" />
            </ContextMenu>
          </div>
        </div>
        <div className="absolute bottom-0 w-[592px] border-b group-hover:hidden"></div>
      </div>
      <div className="bg-baseBackground h-[268px] w-full p-3 pt-2"></div>
    </div>
  );
};
