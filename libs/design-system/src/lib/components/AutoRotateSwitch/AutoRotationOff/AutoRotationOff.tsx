import React from 'react';
import { Icon } from '../../Icon';
import { Tooltip } from '../../Tooltip';

export const AutoRotationOff: React.FC = () => {
  return (
    <Tooltip title="توقف گردش خودکار" position="left">
      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-red-600 py-1.5 text-white transition-colors hover:bg-red-700">
        <Icon name="power" size="md" />
      </div>
    </Tooltip>
  );
};
