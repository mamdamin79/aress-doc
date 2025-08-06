'use client';
import React, { useState } from 'react';
import { Icon } from '../Icon';
import { DualSwitch } from '../DualSwitch';
import { ReportSettings } from '../ReportSettings';
import { ContextMenu } from '../ContextMenu';
import { SlideFromLeft } from './SlideFromLeft';
import { OptionsListExplorer } from '../OptionsListExplorer';
import { cn } from '../../../utils';
import { LoadingBarPop } from '../LoadingBarPop';
import { Button } from '../Button';
import { ReportCardBaseProps } from './ReportCardBase.types';
import { PopupInfo } from '../PopupInfo';
import { OptionsListExplorerProps } from '../OptionsListExplorer/OptionsListExplorer';
export const ReportCardBase: React.FC<ReportCardBaseProps> = ({
  title,
  switchIcons,
  compactHeader = false,
  children,
  popupInfoItems,
  settingOptions,
  onSubmit,
  onRemove,
  onShare,
}) => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState<
    null | 'loading' | 'done' | 'rejected'
  >(null);
  const [popupInfoOpen, setPopupInfoOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [optionsListItems, setOptionsListItems] =
    useState<null | OptionsListExplorerProps>(null);

  const returnLoadingStatusText = () => {
    switch (loadingStatus) {
      case 'loading':
        return 'در حال بارگزاری اطلاعات...';
      case 'done':
        return 'انجام شد';
      case 'rejected':
        return 'انجام نشد!';
      default:
        return '';
    }
  };

  const handleSubmit = async () => {
    setSettingsOpen(false);
    setLoadingStatus('loading');
    try {
      const result = await onSubmit?.();
      if (result === true) {
        setLoadingStatus('done');
      } else {
        setLoadingStatus('rejected');
      }
    } catch {
      setLoadingStatus('rejected');
    }
  };

  return (
    <div className="bg-surface-neutral-primary shadow-6xl border-border-neutral-secondary group relative flex h-[336px] w-[616px] flex-col overflow-hidden rounded-2xl border-2">
      <SlideFromLeft isOpen={settingsOpen}>
        <ReportSettings
          onSubmit={handleSubmit} // <- use new async handler
          onClose={() => setSettingsOpen(false)}
          options={settingOptions}
          onChangeOptionsListExplorerItem={(item) => setOptionsListItems(item)}
        />
      </SlideFromLeft>

      <SlideFromLeft isOpen={optionsListItems !== null}>
        <OptionsListExplorer
          {...optionsListItems}
          items={optionsListItems?.items ?? { items: [], categories: [] }}
          title={optionsListItems?.title ?? ''}
          onBackButtonClick={() => setOptionsListItems(null)}
          onSearch={(value) => console.log(value)}
          onChange={(item) => {
            if (optionsListItems) optionsListItems.onChange?.(item);
            setOptionsListItems(null);
          }}
        />
      </SlideFromLeft>

      <div className="relative flex w-full items-center justify-between px-3 pb-2 pt-3">
        {!compactHeader ? (
          <div className="text-icon-neutral-primary flex flex-row items-center text-xs font-semibold">
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
          {switchIcons && (
            <div
              className={cn(
                'transition-opacity',
                menuOpen || settingsOpen
                  ? 'opacity-100'
                  : 'opacity-0 group-hover:opacity-100',
                compactHeader && 'opacity-100',
              )}
            >
              <DualSwitch {...switchIcons} size="sm" />
            </div>
          )}

          {compactHeader ? (
            <div
              className="bg-surface-neutral-secondary text-icon-neutral-primary flex h-8 w-8 cursor-pointer items-center justify-center rounded-full"
              onClick={() => setSettingsOpen(true)}
            >
              <Icon name="settings" size="md" />
            </div>
          ) : (
            <div
              className={cn(
                'h-8 transition-opacity',
                menuOpen || settingsOpen
                  ? 'opacity-100'
                  : 'opacity-0 group-hover:opacity-100',
              )}
            >
              <ContextMenu
                onOpenChange={setMenuOpen}
                anchor="bottom end"
                items={[
                  {
                    icon: 'settings',
                    title: 'تنظیمات',
                    onClick: () => setSettingsOpen(true),
                  },
                  {
                    icon: 'repeat',
                    title: 'جایگزینی گزارش',
                    onClick: () => console.log('اطلاعات بیشتر'),
                  },
                  {
                    icon: 'share-2',
                    title: 'اشتراک گذاری',
                    onClick: () => onShare?.(),
                  },
                  {
                    icon: 'trash-2',
                    title: 'حذف گزارش از این فضا',
                    onClick: () => onRemove?.(),
                  },
                ]}
              >
                <Icon name="ellipsis-vertical" size="md" />
              </ContextMenu>
            </div>
          )}
        </div>

        <div className="border-border-neutral-primary absolute bottom-0 w-[592px] border-b"></div>
      </div>

      {loadingStatus && (
        <div className="bg-surface-neutral-primary absolute top-4 z-10 flex h-full w-full items-center justify-center p-3 pt-2">
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-col items-center justify-center gap-4">
              <LoadingBarPop status={loadingStatus} />
              <span className="text-text-neutral-secondarycontrast">
                {returnLoadingStatusText()}
              </span>
            </div>
            <div className="flex flex-row gap-2">
              {loadingStatus === 'rejected' && (
                <div className="w-fit">
                  <Button
                    align="center"
                    isLoading={false}
                    mode="primary"
                    size="sm"
                    onClick={handleSubmit}
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
