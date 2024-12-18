import React, { useState } from 'react';
import { Icon } from '../Icon';
import { DualSwitch, DualSwitchProps } from '../DualSwitch';
import { ContextMenu, Props as contextMenuProps } from '../ContextMenu';
import { ReportSettings } from '../ReportSettings';
interface ReportCardBaseProps {
  title: string;
  switchIcons: DualSwitchProps;
  contextMenu: contextMenuProps;
}
export const ReportCardBase: React.FC<ReportCardBaseProps> = ({
  title,
  switchIcons,
  contextMenu,
}) => {
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <div className="bg-baseBackground relative flex w-[616px] flex-col shadow-sm">
      <div className="lett-0 absolute top-0"></div>
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
