import { Button } from 'design-system';

export const ChangeNationalCode = () => {
  return (
    <div className="w-full">
      <div className="text-text-neutral-primary mb-4 text-right text-lg font-medium">
        برای ادامه، وارد سامانه سجام شوید.
      </div>
      <div className="text-text-neutral-secondarycontrast mb-8 text-right text-sm font-normal">
        برای تغییر کد ملی از طریق سایت سجام اقدام نمایید.
      </div>
      <Button
        theme="brand"
        className="mb-2"
        align="center"
        mode="primary"
        isLoading={false}
        size="sm"
        onClick={() => {
          // Logic to redirect to Sajaam
          window.open('https://www.sejam.ir', '_blank');
        }}
      >
        ورود به سجام
      </Button>
      <Button
        theme="brand"
        align="center"
        mode="secondary"
        isLoading={false}
        size="sm"
      >
        بازگشت
      </Button>
    </div>
  );
};
