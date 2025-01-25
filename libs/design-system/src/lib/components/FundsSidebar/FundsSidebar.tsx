import React from 'react';
import { OptionsDropdown } from '../OptionsDropdown';

export const FundsSidebar: React.FC = () => {
  return (
    <div className="bg-baseBackground flex h-[790px] w-[296px] flex-col gap-4 rounded-tl-2xl rounded-tr-2xl border-2 border-gray-300 pt-4">
      <div className="flex w-full justify-center">
        <OptionsDropdown
          dropDownList={[
            { text: 'سهامی', tag: { color: 'green' } },
            { text: 'کالایی', tag: { color: 'yellow' } },
            { text: 'مختلط', tag: { color: 'purple' } },
            { text: 'درآمد ثابت', tag: { color: 'blue' } },
          ]}
          dropDownStyles={{
            anchor: 'bottom',
            bg: 'secondary',
            emphasize: 'high',
            size: 'lg',
          }}
        />
      </div>
    </div>
  );
};
