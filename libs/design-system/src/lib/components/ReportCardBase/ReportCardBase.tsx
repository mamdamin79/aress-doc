import React, { useState } from 'react';
import { Icon } from '../Icon';
import { DualSwitch, DualSwitchProps } from '../DualSwitch';
import { ContextMenu, Props as contextMenuProps } from '../ContextMenu';
import { ReportSettings } from '../ReportSettings';
interface ReportCardBaseProps {
  title: string;
  switchIcons: DualSwitchProps;
  contextMenu: contextMenuProps;
  settingsOpen:boolean;
  setSettingsOpen: (value: boolean) => void
}
export const ReportCardBase: React.FC<ReportCardBaseProps> = ({
  title,
  switchIcons,
  contextMenu,
  settingsOpen,
  setSettingsOpen
}) => {

  return (
    <div className="bg-baseBackground relative flex w-[616px] flex-col shadow-sm">
      <div className="absolute left-0 top-0 z-30">
        <ReportSettings
        onClose={() => setSettingsOpen(false)}
          isOpen={settingsOpen}
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
                onClick: () => console.log('hi'),
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
      </div>
      <div className="relative w-full p-3 pb-2">
        <div className="flex w-full items-center justify-between">
          <div className="flex flex-row items-center text-xs font-semibold">
            <div className="p-1.5">
              <Icon name="info" size="md" />
            </div>
            <span>{title}</span>
          </div>
          <div className="flex flex-row gap-2">
            <DualSwitch {...switchIcons} />

            <ContextMenu {...contextMenu}>
              <Icon name="ellipsis-vertical" size="md" />
            </ContextMenu>
          </div>
        </div>
        <div className="absolute bottom-0 w-[592px] border-b"></div>
      </div>
      <div className="bg-baseBackground h-[268px] w-full p-3 pt-2"></div>
    </div>
  );
};
