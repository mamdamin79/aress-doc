import { OptionsDropdown } from 'design-system';
import React from 'react';

export const OldSessionLogout: React.FC = () => {
  return (
    <div>
      <div className="text-text-neutral-primary mb-8 text-lg font-medium">
        خروج از نشست های قدیمی
      </div>
      <div className="mr-3 flex items-start justify-between">
        <div>
          <div className="text-md text-text-neutral-primary mb-5 font-normal">
            خروج خودکار در صورت عدم فعالیت بعد از ...
          </div>
          <div className="text-text-neutral-secondary text-sm font-medium">
            اگر در این بازه زمانی، حداقل یک‌بار از یک نشست خاص آنلاین نشوید، از
            آن نشست به صورت خودکار خارج می شوید.
          </div>
        </div>
        <OptionsDropdown
          className="w-20"
          dropDownList={[
            { text: '۱ هفته' },
            { text: '۳ ماه' },
            { text: '۶ ماه' },
            { text: '۱ سال' },
          ]}
        />
      </div>
    </div>
  );
};
