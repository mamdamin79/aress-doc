'use client';
import { Button } from '@headlessui/react';
import { Accordion, Dialog, Icon } from 'design-system';
import React, { useState } from 'react';

export const MessageSettings: React.FC = () => {
  const [isOpenSetting, setIsOpenSetting] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpenSetting(true)}>
        <Icon name="settings" size="lg" />
      </Button>
      <Dialog
        onClose={() => setIsOpenSetting(false)}
        isOpen={isOpenSetting}
        showCloseBtn={true}
      >
        {
          <Accordion
            mode="b2b"
            singleOpen={false}
            items={[
              {
                title: 'مدیر صندوق سهم مدیریت این صندوق را دارد؟',
                content:
                  'مدیر صندوق سهم آشنا دارای ۵ سال سابقه مدیریت است. طی این مدت، او موفق به افزایش ارزش دارایی‌های صندوق و بهبود عملکرد سرمایه‌گذاری‌ها شده است..',
              },
              {
                title: 'مدیر صندوق سهم آشنا چند سال تجربه مدیریت این  را دارد؟',
                content:
                  'مدیر صندوق سهم آشنا دارای ۵ سال سابقه مدیریت است. طی این مدت، او موفق به افزایش ارزش دارایی‌های صندوق و بهبود عملکرد سرمایه‌گذاری‌ها شده است..',
              },
              {
                title:
                  ' صندوق سهم آشنا چند سال تجربه مدیریت این صندوق را دارد؟',
                content:
                  'مدیر صندوق سهم آشنا دارای ۵ سال سابقه مدیریت است. طی این مدت، او موفق به افزایش ارزش دارایی‌های صندوق و بهبود عملکرد سرمایه‌گذاری‌ها شده است..',
              },
              {
                title: 'مدیر صندوق سهم آشنا   تجربه مدیریت این صندوق را دارد؟',
                content:
                  'مدیر صندوق سهم آشنا دارای ۵ سال سابقه مدیریت است. طی این مدت، او موفق به افزایش ارزش دارایی‌های صندوق و بهبود عملکرد سرمایه‌گذاری‌ها شده است..',
              },
            ]}
          />
        }
      </Dialog>
    </>
  );
};
