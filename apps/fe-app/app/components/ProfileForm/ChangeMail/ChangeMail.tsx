import { Button, Icon, IconDialog, TextField } from 'design-system';
import React, { useState } from 'react';
import { OTPForm } from '../OTPForm';

const SectionContainer = ({ children }: { children: React.ReactNode }) => (
  <div className="flex w-full flex-col gap-6 text-right">{children}</div>
);

const SectionHeader = ({ title }: { title: string }) => (
  <span className="text-md text-center font-medium">{title}</span>
);
const InputPassword = ({ onSubmit }: { onSubmit?: () => void }) => (
  <SectionContainer>
    <SectionHeader title="ایمیل جدید" />
    <span className="mt-4 text-sm">
      جهت تغییر ایمیل، ابتدا رمز فعلی خود را وارد کنید.
    </span>
    <TextField
      mergeTitleAndPlaceholder={false}
      mode="outline"
      type="password"
      trailingIcons={[{ name: 'x' }, { name: 'eye' }]}
      label="رمز عبور"
      placeholder="رمز عبور فعلی خود را وارد کنید..."
      isError={false}
      supportText=""
    />
    <Button
      align="center"
      mode="primary"
      isLoading={false}
      size="md"
      type="submit"
      onClick={onSubmit}
    >
      تایید
    </Button>
  </SectionContainer>
);

const NewMail = ({
  email,
  onSubmit,
}: {
  email?: string;
  onSubmit?: () => void;
}) => (
  <SectionContainer>
    <div className="flex w-full flex-row justify-between">
      <span className="w-1/3"></span>
      <SectionHeader title="ایمیل جدید" />
      <div className="text-brand-600 flex w-1/3 flex-row justify-end text-sm font-medium"></div>
    </div>
    <span className="mt-4 text-sm">
      <span className="font-medium">ایمیل فعلی: </span> {email}
    </span>
    <TextField
      mergeTitleAndPlaceholder={false}
      mode="outline"
      type="text"
      label="ایمیل جدید"
      placeholder="ایمیل جدید را وارد کنید..."
      isError={false}
      supportText=""
      trailingIcons={[]}
    />
    <Button
      align="center"
      mode="primary"
      isLoading={false}
      size="md"
      type="submit"
      onClick={onSubmit}
    >
      دریافت کد تایید
    </Button>
  </SectionContainer>
);


enum ChangeMailStage {
  PASSWORD = 0,
  NEW_MAIL = 1,
  OTP = 2,
}

export const ChangeMail = ({
  onClose,
}: {
  onClose?: (success?: boolean) => void;
}) => {
  const [stage, setStage] = useState<ChangeMailStage | null>(0);

  return (
    <>
      {stage === ChangeMailStage.PASSWORD && (
        <InputPassword onSubmit={() => setStage(ChangeMailStage.NEW_MAIL)} />
      )}
      {stage === ChangeMailStage.NEW_MAIL && (
        <NewMail
          email="sinapir2@gmail.com"
          onSubmit={() => setStage(ChangeMailStage.OTP)}
        />
      )}
      {stage === ChangeMailStage.OTP && (
        <OTPForm
          backButtonText="ویرایش ایمیل"
          description="کد تایید ارسال شده به sinapir2@gmail.com را وارد کنید.
"
          onBackBtn={() => setStage(ChangeMailStage.NEW_MAIL)}
          title="ایمیل جدید"
          onSubmit={() => {
            onClose?.(true);
          }}
        />
      )}
    </>
  );
};
