'use client';
import { Breadcrumb, Button, FundsLogo, Tabs } from 'design-system';
import { Summary } from './_components/Summary';

export default function FundPage() {
  return (
    <div>
      <div className="mb-7 mr-8 mt-3">
        <Breadcrumb
          items={[
            { icon: 'home' },
            { title: 'صندوق من' },
            { title: 'صندوق سرمایه گذاری سهم اشنا' },
          ]}
        />
      </div>
      <div className="px-20">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center justify-start gap-2">
            <FundsLogo color="green" src="" hasTag={true} size="md" />
            <div className="text-text-neutral-primary text-xl font-semibold">
              صندوق سرمایه گذاری سهم آشنا (در سهام)
            </div>
          </div>
          <Button
            className="w-[183px]"
            iconRight={{ name: 'plus', size: 'lg' }}
          >
            افزودن به دیده بان
          </Button>
        </div>
        <Tabs
          activeTab={0}
          onClickTab={() => console.log('')}
          variant="lined"
          fullWidthDivider={true}
          tabs={[
            { title: 'خلاصه', id: '0', content: <Summary /> },
            { title: 'تحلیل بازدهی', id: '1', content: '' },
            { title: 'ارزیابی ریسک', id: '2', content: '' },
          ]}
        />
      </div>
    </div>
  );
}
