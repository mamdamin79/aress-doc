import React from 'react';
import { Button, Checkbox, TextField } from 'design-system';
import Link from 'next/link';
export const LoginForm = () => {
  return (
    <div className="flex w-full flex-col items-center gap-6 rounded-3xl border border-gray-300 bg-white p-6 text-xl font-medium">
      <h5>ورود به آرسس ترمینال</h5>
      <div className="flex w-full flex-col gap-12">
        <div className="flex flex-col">
          <TextField
            label="شماره همراه/کد ملی/نام کاربری"
            mergeTitleAndPlaceholder={false}
            mode="outline"
            trailingIcons={[]}
            placeholder=""
            supportText="یکی از موارد خواسته شده را وارد کنید."
          />
          <TextField
            label="رمز عبور"
            mergeTitleAndPlaceholder={false}
            mode="outline"
            trailingIcons={['x', 'eye']}
            type="password"
            placeholder=""
          />
        </div>
        <div className="flex flex-col gap-4">
          <Checkbox
            content="مرا به خاطر بسپار"
            onChange={() => console.log('checked')}
          />
          <Button align="center" isLoading={false} mode="primary" size="md">
            <span className="text-md font-medium">ورود به ترمینال</span>{' '}
          </Button>
          <Link href="#" className="text-brand-600 text-center text-sm">
            رمز عبور خود را فراموش کرده‌اید؟
          </Link>
        </div>
      </div>
    </div>
  );
};
