import React, { useState } from 'react';
import { Button, Checkbox, TextField } from 'design-system';
import Link from 'next/link';
interface LoginFormProps {
  title: string;
  onClick: () => void;
}
export const LoginForm: React.FC<LoginFormProps> = ({ title, onClick }) => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const submitForm = () => {
    console.log('submit');
  };
  return (
    <div className="flex w-full flex-col items-center gap-6 rounded-3xl border border-gray-300 bg-white p-6 text-xl font-medium">
      <h5>{title}</h5>
      <div className="flex w-full flex-col gap-12">
        <div className="flex flex-col">
          <TextField
            label="شماره همراه/کد ملی/نام کاربری"
            mergeTitleAndPlaceholder={false}
            mode="outline"
            trailingIcons={[]}
            placeholder=""
            supportText="یکی از موارد خواسته شده را وارد کنید."
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />
          <TextField
            label="رمز عبور"
            mergeTitleAndPlaceholder={false}
            mode="outline"
            trailingIcons={['x', 'eye']}
            type="password"
            placeholder=""
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-4">
          <Checkbox
            content="مرا به خاطر بسپار"
            onChange={() => setIsChecked(!isChecked)}
          />
          <Button
            align="center"
            isLoading={false}
            mode="primary"
            size="md"
            onClick={submitForm}
          >
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
