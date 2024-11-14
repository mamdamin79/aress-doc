import React from 'react';
import { Icon } from '../Icon';

export const NewBadge = () => {
  return (
    <div className="w-[37px] h-[22px] flex items-center justify-center text-white text-xs font-medium rounded-[100px] p-2 bg-gradient-to-b from-red-600 to-red-700">
      جدید
    </div>
  );
};
export const VideoBadge = () => {
  return (
    <div className=" w-[37px] h-[22px] flex items-center justify-center text-white text-xs font-medium rounded-[100px] p-2 bg-vividGreen-700">
      <Icon name="video" key="video" size="md" />
    </div>
  );
};
