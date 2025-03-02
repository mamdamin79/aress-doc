import { Button, TextField } from 'design-system';
import React from 'react';

export const ChangeNumber: React.FC = () => {
  return (
    <div className="flex w-full flex-col gap-6 text-right">
      <span className="text-md text-center font-medium">شماره همراه جدید</span>
      <span className="mt-4 text-sm">
        جهت تغییر شماره همراه، ابتدا رمز فعلی خود را وارد کنید.
      </span>
      <TextField
        mergeTitleAndPlaceholder={false}
        mode="outline"
        type="password"
        trailingIcons={[{ name: 'x' }, { name: 'eye' }]}
        label="رمز عبور"
        placeholder="رمز عبور فعلی خود را وارد کنید..."
        isError={false}
        supportText={''}
      />
      <Button
        align="center"
        mode="primary"
        isLoading={false}
        size="md"
        type="submit"
      >
        تایید
      </Button>
    </div>
  );
};
