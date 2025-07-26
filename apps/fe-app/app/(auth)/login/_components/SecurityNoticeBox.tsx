import { BulletList, NotesHeading } from 'design-system';
import React from 'react';
const OurTermsOfServiceText: React.FC = () => (
    <div>
      <span>همچنین توصیه می‌کنیم که </span>
      <span className="text-brand-700 cursor-pointer underline-offset-4 hover:underline">
        شیوه‌نامه خدمات
      </span>
      <span> ما را به دقت مطالعه فرمایید.</span>
    </div>
  );
export const SecurityNoticeBox: React.FC = () => {
  return (
    <div className="flex flex-col gap-4">
      <NotesHeading
        icon={{ name: 'shield-alert', size: 'lg' }}
        title={'نکات امنیتی'}
      />
      <div className="text-sm">
        <BulletList
          items={[
            {
              title: `کاربر گرامی، قبل از وارد کردن هرگونه اطلاعات در سایت، لطفاً آدرس مرورگر خود را با آدرس ایمن https://account.aressai.com مقایسه کنید. اگر تفاوتی مشاهده کردید، از ادامه فرآیند خودداری کنید و آن را به اطلاع ما برسانید.`,
            },
            {
              title: `هیچ‌وقت اطلاعات حساب کاربری خود را با دیگران به اشتراک نگذارید.`,
            },
            {
              title: <OurTermsOfServiceText/>,
            },
          ]}
        />
      </div>
    </div>
  );
};