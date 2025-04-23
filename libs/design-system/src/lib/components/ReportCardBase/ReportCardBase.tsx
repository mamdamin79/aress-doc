'use client';
import React, { useState } from 'react';
import { Icon } from '../Icon';
import { DualSwitch } from '../DualSwitch';
import { ReportSettings } from '../ReportSettings';
import { ContextMenu } from '../ContextMenu';
import { SlideFromLeft } from './SlideFromLeft';
import { OptionsListExplorer } from '../OptionsListExplorer';
import { cn } from 'libs/design-system/src/utils';
import { LoadingBarPop } from '../LoadingBarPop';
import { Button } from '../Button';
import { ReportCardBaseProps } from './ReportCardBase.types';

export const ReportCardBase: React.FC<ReportCardBaseProps> = ({
  title,
  switchIcons,
  optionsListItems,
  compactHeader = false,
}) => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [optionsListOpen, setOptionsListOpen] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState<
    null | 'loading' | 'done' | 'rejected'
  >(null);
  const returnLoadingStatusText = () => {
    switch (loadingStatus) {
      case 'loading':
        return 'در حال بارگزاری اطلاعات...';
      case 'done':
        return 'انجام شد';
      case 'rejected':
        return 'انجام نشد!';
    }
  };
  const mockLoading = () => {
    setSettingsOpen(false);
    setLoadingStatus('loading');
    setTimeout(() => {
      setLoadingStatus('rejected');
    }, 3000);
  };
  return (
    <div className="bg-baseBackground group relative flex w-[616px] flex-col overflow-hidden shadow-sm">
      <SlideFromLeft isOpen={settingsOpen}>
        <ReportSettings
          onSubmit={mockLoading}
          onClose={() => setSettingsOpen(false)}
          options={[
            {
              type: 'nestedDropdown',
              props: {
                title: 'مبنای ارزش معاملات',
                items: [
                  {
                    title: 'نوع بازار:',
                    icon: { name: 'square-mouse-pointer', size: 'sm' },
                    status: 'normal',
                    selectedOption: 'کل بازار',
                    onClick: () => setOptionsListOpen(true),
                  },
                  {
                    title: 'صنعت:',
                    icon: { name: 'square-mouse-pointer', size: 'sm' },
                    status: 'normal',
                    selectedOption: 'کانی‌ های فلزی',
                    onClick: () => setOptionsListOpen(true),
                  },
                  {
                    title: 'صنعت:',
                    icon: { name: 'square-mouse-pointer', size: 'sm' },
                    status: 'normal',
                    selectedOption: 'کانی‌ های فلزی',
                    onClick: () => setOptionsListOpen(true),
                  },
                  {
                    title: 'ابزار مالی:',
                    icon: { name: 'square-mouse-pointer', size: 'sm' },
                    status: 'error',
                    placeHolder: 'یک مورد را انتخاب کنید...',
                    onClick: () => setOptionsListOpen(true),
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
                onClick: () => setOptionsListOpen(true),
              },
            },
            {
              type: 'basicSelection',
              props: {
                title: 'دسته‌بندی اوراق:',
                icon: { name: 'square-mouse-pointer', size: 'sm' },
                status: 'normal',
                selectedOption: 'کل اوراق',
                onClick: () => setOptionsListOpen(true),
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
          {!compactHeader ? (
            <div className="flex flex-row items-center text-xs font-semibold">
              <div className="p-1.5">
                <Icon name="info" size="md" />
              </div>
              <span className={cn(loadingStatus && 'opacity-30')}>{title}</span>
            </div>
          ) : (
            <div></div>
          )}

          <div
            className={cn(
              'flex flex-row gap-2',
              !compactHeader &&
                'opacity-0 transition-opacity duration-300 group-hover:opacity-100',
            )}
          >
            <DualSwitch {...switchIcons} />
            {compactHeader ? (
              <div
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-gray-100"
                onClick={() => setSettingsOpen(true)}
              >
                <Icon name="settings" size="md" />
              </div>
            ) : (
              <ContextMenu
                anchor="bottom end"
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
            )}
          </div>
        </div>
        <div
          className={cn(
            'absolute bottom-0 w-[592px] border-b',
            !compactHeader && 'group-hover:hidden',
          )}
        ></div>
      </div>
      <div className="bg-baseBackground flex h-[268px] w-full items-center justify-center p-3 pt-2">
        {loadingStatus && (
          <div className="flex h-full flex-col items-center justify-between pb-3 pt-16">
            <div className="flex flex-col items-center justify-center gap-4">
              <LoadingBarPop status={loadingStatus} />
              <span>{returnLoadingStatusText()}</span>
            </div>
            <div className="flex flex-row gap-2">
              {loadingStatus === 'rejected' && (
                <div className="w-fit">
                  <Button
                    align="center"
                    isLoading={false}
                    mode="primary"
                    size="md"
                  >
                    تلاش مجدد
                  </Button>
                </div>
              )}
              <div className="w-fit">
                <Button
                  align="center"
                  isLoading={false}
                  mode="secondary"
                  size="md"
                  onClick={() => setLoadingStatus(null)}
                >
                  انصراف
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
