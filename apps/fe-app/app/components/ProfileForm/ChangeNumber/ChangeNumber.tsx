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
    <SectionHeader title="شماره همراه جدید" />
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

const NewNumber = ({
  phone,
  onSubmit,
}: {
  phone?: string;
  onSubmit?: () => void;
}) => (
  <SectionContainer>
    <div className="flex w-full flex-row justify-between">
      <span className="w-1/3"></span>
      <SectionHeader title="شماره همراه جدید" />
      <div className="text-brand-600 flex w-1/3 flex-row justify-end text-sm font-medium"></div>
    </div>
    <span className="mt-4 text-sm">
      <span className="font-medium">شماره همراه فعلی: </span> {phone}
    </span>
    <TextField
      mergeTitleAndPlaceholder={false}
      mode="outline"
      type="text"
      label="شماره همراه جدید"
      placeholder="شماره همراه جدید را وارد کنید..."
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

enum ChangeNumberStage {
  PASSWORD = 0,
  NEW_MAIL = 1,
  OTP = 2,
}

export const ChangeNumber = ({
  onClose,
}: {
  onClose?: (success?: boolean) => void;
}) => {
  const [stage, setStage] = useState<ChangeNumberStage | null>(0);

  return (
    <>
      {stage === ChangeNumberStage.PASSWORD && (
        <InputPassword onSubmit={() => setStage(ChangeNumberStage.NEW_MAIL)} />
      )}
      {stage === ChangeNumberStage.NEW_MAIL && (
        <NewNumber
          phone="+989339123456"
          onSubmit={() => setStage(ChangeNumberStage.OTP)}
        />
      )}
      {stage === ChangeNumberStage.OTP && (
        <OTPForm
          backButtonText="ویرایش شماره همراه"
          description="کد تایید ارسال شده به +989339123456 را وارد کنید.
"
          onBackBtn={() => setStage(ChangeNumberStage.NEW_MAIL)}
          title="شماره همراه جدید"
          onSubmit={() => {
            onClose?.(true);
          }}
        />
      )}
    </>
  );
};
