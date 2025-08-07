import { Breadcrumb, Button, FundsLogo, Tabs } from 'design-system';

export default function MyFund() {
  return (
    <div>
      <div className="mb-1 mr-8 mt-2">
        <Breadcrumb
          items={[
            {
              icon: 'home',
            },
            {
              title: 'صندوق من',
              link: '/my-fund',
            },
            {
              title: 'صندوق سرمایه گذاری سهم آشنا',
            },
          ]}
        />
      </div>
      <div className="mt-7 px-20">
        <div className="mb-7 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FundsLogo hasTag size="md" />
            <div className="text-text-neutral-primary text-xl font-semibold">
              صندوق سرمایه گذاری سهم آشنا
              <span className="font-medium"> (در سهام)</span>
            </div>
          </div>
          <Button
            className="w-[183px]"
            iconRight={{ name: 'plus', size: 'lg' }}
          >
            افزودن به دیده‌بان
          </Button>
        </div>
        <Tabs
          activeTab={0}
          className="w-full"
          fullWidthDivider
          // onClickTab={(id) => console.log(id)}
          variant="lined"
          tabs={[
            {
              id: 'tab1',
              title: 'خلاصه',
              content: <Summary />,
            },
            {
              id: 'tab2',
              title: 'تحلیل بازدهی',
            },
            {
              id: 'tab3',
              title: 'ارزیابی ریسک',
            },
          ]}
        />
      </div>
    </div>
  );
}

const Summary = () => {
  return <div>mamad amin</div>;
};
