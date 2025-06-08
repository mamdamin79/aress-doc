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
import { PopupInfo } from '../PopupInfo';
export const ReportCardBase: React.FC<ReportCardBaseProps> = ({
  title,
  switchIcons,
  optionsListItems,
  compactHeader = false,
  children,
  popupInfoItems,
  settingOptions
}) => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [optionsListOpen, setOptionsListOpen] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState<
    null | 'loading' | 'done' | 'rejected'
  >(null);
  const [popupInfoOpen, setPopupInfoOpen] = useState(false);
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
    <div className="bg-surface-neutral-primary shadow-6xl border-border-neutral-secondary group relative flex w-[616px] flex-col overflow-hidden rounded-2xl border-2">
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
          ]}
        />
      </SlideFromLeft>
      {optionsListItems && (
        <SlideFromLeft isOpen={optionsListOpen}>
          <OptionsListExplorer
            items={optionsListItems}
            onBackButtonClick={() => setOptionsListOpen(false)}
            onSearch={(value) => console.log(value)}
            title="انتخاب دسته بندی اوراق"
          />
        </SlideFromLeft>
      )}

      <div className="relative w-full p-3 pb-2">
        <div className="flex w-full items-center justify-between">
          {!compactHeader ? (
            <div className="text-text-neutral-primary flex flex-row items-center text-xs font-semibold">
              <div
                className="cursor-pointer p-1.5"
                onClick={() => setPopupInfoOpen(true)}
              >
                <Icon name="info" size="md" />
              </div>
              <span className={cn(loadingStatus && 'opacity-30')}>{title}</span>
            </div>
          ) : (
            <div></div>
          )}

          <div className={cn('flex flex-row items-center gap-2')}>
            {switchIcons && <DualSwitch {...switchIcons} size="sm" />}

            {compactHeader ? (
              <div
                className="bg-surface-neutral-secondary text-text-neutral-primary flex h-8 w-8 cursor-pointer items-center justify-center rounded-full"
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
                    title: 'تنظیمات',
                    onClick: () => setSettingsOpen(true),
                  },
                  {
                    icon: 'eye',
                    title: 'مشاهده بررسی گزارش',
                    onClick: () => console.log('تنظیمات گزارش'),
                  },
                  {
                    icon: 'repeat',
                    title: 'جایگزینی گزارش',
                    onClick: () => console.log('اطلاعات بیشتر'),
                  },
                  {
                    icon: 'share-2',
                    title: 'اشتراک گذاری',
                    onClick: () => console.log('اشتراک گذاری'),
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
            'border-border-neutral-primary absolute bottom-0 w-[592px] border-b',
            !compactHeader && 'group-hover:hidden',
          )}
        ></div>
      </div>
      {loadingStatus && (
        <div className="bg-surface-neutral-primary absolute top-4 z-10 flex h-full w-full items-center justify-center p-3 pt-2">
          <div className="flex flex-col items-center gap-4">
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
                    size="sm"
                    onClick={mockLoading}
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
                  size="sm"
                  onClick={() => setLoadingStatus(null)}
                >
                  انصراف
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {children}
      {popupInfoItems && (
        <PopupInfo
          isOpen={popupInfoOpen}
          itemsList={popupInfoItems}
          title="تعاریف مالی به کار رفته"
          onClose={() => setPopupInfoOpen(false)}
        />
      )}
    </div>
  );
};
