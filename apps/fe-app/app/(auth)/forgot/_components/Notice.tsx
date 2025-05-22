import { NotesHeading, BulletList } from 'design-system';
import React from 'react';

export const Notice: React.FC = () => {
  return (
    <div className="flex flex-col gap-4">
      <NotesHeading
        icon={{ name: 'info', size: 'lg' }}
        title={'فرایند بازنشانی رمز عبور'}
      />
      <BulletList
        items={[
          {
            title: `کد ملی و شماره تماسی که هنگام ثبت نام از آن استفاده کرده‌اید را وارد کنید. ما کد بازیابی
      رمز عبور را برای شما پیامک می‌کنیم تا از آن برای ساخت رمز عبور جدید استفاده کنید.`,
          },
        ]}
      />
    </div>
  );
};
