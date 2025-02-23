import { Button, Icon, TextField } from 'design-system';
import React from 'react';

export const ProfileForm: React.FC = () => {
  return (
    <div className="flex flex-col justify-center gap-12">
      <div>avatar</div>
      <div className="grid w-[607px] grid-flow-row">
        <TextField
          mergeTitleAndPlaceholder
          mode="filled"
          trailingIcons={[]}
          value={'سینا پیروزمندان'}
          placeholder="نام و نام خانوادگی"
        />
        <TextField
          mergeTitleAndPlaceholder={false}
          mode="filled"
          trailingIcons={[]}
          placeholder="شماره همراه"
        />

        <TextField
          mergeTitleAndPlaceholder={false}
          mode="filled"
          trailingIcons={[]}
          placeholder="کد ملی"
        />

        <TextField
          mergeTitleAndPlaceholder={false}
          mode="filled"
          trailingIcons={[]}
          placeholder="ایمیل"
        />

        <TextField
          mergeTitleAndPlaceholder={false}
          mode="filled"
          trailingIcons={[]}
          placeholder="نام کاربری"
        />
        <div className="w-fit">
          {' '}
          <Button align="center" isLoading={false} mode="primary" size="md">
            <div className="flex flex-row gap-2">
              <span>تغییر رمز عبور</span>
              <Icon name="key-round" size="lg" />
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};
