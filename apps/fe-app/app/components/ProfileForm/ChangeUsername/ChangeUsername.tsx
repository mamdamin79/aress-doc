import { Button, TextField } from 'design-system';
import React, { useState } from 'react';
const SectionContainer = ({ children }: { children: React.ReactNode }) => (
  <div className="flex w-full flex-col gap-6 text-right">{children}</div>
);

const SectionHeader = ({ title }: { title: string }) => (
  <span className="text-md text-center font-medium">{title}</span>
);
const InputPassword = ({ onSubmit }: { onSubmit?: () => void }) => {
  return (
    <div className="flex w-full flex-col gap-6 text-right">
      <span className="text-md text-center font-medium">نام کاربری جدید</span>
      <span className="mt-4 text-sm">
        جهت تغییر نام کاربری، ابتدا رمز فعلی خود را وارد کنید.
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
        isLoading={false}
        mode="primary"
        size="md"
        type="submit"
        onClick={onSubmit}
      >
        تایید
      </Button>
    </div>
  );
};
const NewUsername = ({
  username,
  onSubmit,
}: {
  username?: string;
  onSubmit?: () => void;
}) => (
  <SectionContainer>
    <div className="flex w-full flex-row justify-between">
      <span className="w-1/3"></span>
      <SectionHeader title="نام کاربری جدید" />
      <div className="text-brand-600 flex w-1/3 flex-row justify-end text-sm font-medium"></div>
    </div>
    <span className="mt-4 text-sm">
      <span className="font-medium">نام کاربری فعلی: </span> {username}
    </span>
    <TextField
      mergeTitleAndPlaceholder={false}
      mode="outline"
      type="text"
      label="نام کاربری جدید"
      placeholder="نام کاربری جدید را وارد کنید..."
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
      تایید
    </Button>
  </SectionContainer>
);

enum ChangeUsernameStage {
  PASSWORD = 0,
  NEW_USERNAME = 1,
  SUCCESS = 'success',
}
export const ChangeUsername: React.FC<{
  onClose?: (success?: boolean) => void;
}> = ({ onClose }) => {
  const [stage, setStage] = useState<ChangeUsernameStage | null>(0);

  return (
    <>
      {stage === ChangeUsernameStage.PASSWORD && (
        <InputPassword
          onSubmit={() => setStage(ChangeUsernameStage.NEW_USERNAME)}
        />
      )}
      {stage === ChangeUsernameStage.NEW_USERNAME && (
        <NewUsername username="sinapir" onSubmit={() => onClose?.(true)} />
      )}
    </>
  );
};
