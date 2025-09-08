import { DataList, Icon, OptionsDropdown, Tabs } from 'design-system';
import React, { useState } from 'react';

export const Risk: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="mt-12">
      <div className="mb-8 flex items-center gap-2">
        <div className="text-text-neutral-primary text-lg font-medium">
          شاخص های ارزیابی ریسک
        </div>
        <Icon name="info" size="md" />
      </div>
      <div className="block xl:flex xl:gap-6">
        <div className="mb-6 flex h-[335px] w-full items-center justify-center bg-pink-100 xl:h-[605px] xl:w-[440px]">
          gauge state
        </div>
        <div className="mb-6 flex h-[410px] w-full items-center justify-center bg-purple-100 xl:h-[605px] xl:flex-1">
          table
        </div>
      </div>
      <div className="mb-11 flex items-start justify-center gap-3">
        <div className="text-md mt-2 font-normal">بازه زمانی:</div>
        <Tabs
          activeTab={activeTab}
          onClickTab={(newTabId) => {
            setActiveTab(newTabId);
            console.log('clicked tab id:', newTabId);
          }}
          variant="sliding"
          tabs={[
            { id: '1', title: 'یک ماهه' },
            { id: '2', title: 'سه ماهه' },
            { id: '3', title: 'شش ماهه' },
            { id: '4', title: 'نه ماهه' },
            { id: '4', title: 'یک ساله' },
          ]}
        />
        <div className="bg-surface-neutral-tertiary border-border-neutral-secondary flex h-12 w-12 items-center justify-center rounded-full border">
          <Icon name="calendar-range" size="lg" />
        </div>
      </div>
      <div className="bg-surface-neutral-background mb-12 h-[1px] w-full border border-dashed"></div>
      <div className="mb-8 flex items-start justify-between">
        <div className="mt-2 flex items-center gap-2">
          <div className="text-text-neutral-primary text-lg font-medium">
            مقایسه ریسک
          </div>
          <div className="text-icon-neutral-secondary">
            <Icon name="info" size="md" />
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="text-md mt-2.5 font-normal">تفکیک زمانی:</div>
          <Tabs
            variant="sliding"
            tabs={[
              { id: '1', title: 'ماه' },
              { id: '2', title: 'سال' },
            ]}
            activeTab={activeTab}
            onClickTab={(newTabId) => {
              setActiveTab(newTabId);
              console.log('clicked tab id:', newTabId);
            }}
          />
        </div>
      </div>
      <div className="mb-6 flex h-[280px] w-full items-center justify-center bg-yellow-100">
        table
      </div>
      <div className="mb-12 flex w-full items-center justify-center gap-3">
        <div className="text-text-neutral-primary text-md -mt-3 font-normal">
          معیار ریسک:
        </div>
        <Tabs
          onClickTab={(newTabId) => {
            setActiveTab(newTabId);
            console.log('clicked tab id:', newTabId);
          }}
          activeTab={activeTab}
          variant="sliding"
          tabs={[
            { id: '1', title: 'انحراف معیار' },
            { id: '2', title: 'انحراف معیار منفی' },
            { id: '3', title: 'VaR' },
            { id: '4', title: 'CVar' },
            { id: '5', title: 'بیشترین ریزش' },
          ]}
        />
      </div>
      <div className="bg-surface-neutral-background mb-12 h-[1px] w-full border border-dashed"></div>
      <div className="mb-8 flex items-start justify-between">
        <div className="mt-2 flex items-center gap-2">
          <div className="text-text-neutral-primary text-lg font-medium">
            رتبه ریسک
          </div>
          <div className="text-icon-neutral-secondary">
            <Icon name="info" size="md" />
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="text-md mt-2.5 font-normal">تفکیک زمانی:</div>
          <Tabs
            variant="sliding"
            tabs={[
              { id: '1', title: 'ماه' },
              { id: '2', title: 'سال' },
            ]}
            activeTab={activeTab}
            onClickTab={(newTabId) => {
              setActiveTab(newTabId);
              console.log('clicked tab id:', newTabId);
            }}
          />
        </div>
      </div>
      <div className="mb-6 flex h-[280px] w-full items-center justify-center bg-emerald-100">
        table
      </div>
      <div className="mb-12 flex w-full items-center justify-center gap-3">
        <div className="text-text-neutral-primary text-md -mt-3 font-normal">
          معیار ریسک:
        </div>
        <Tabs
          onClickTab={(newTabId) => {
            setActiveTab(newTabId);
            console.log('clicked tab id:', newTabId);
          }}
          activeTab={activeTab}
          variant="sliding"
          tabs={[
            { id: '1', title: 'انحراف معیار' },
            { id: '2', title: 'انحراف معیار منفی' },
            { id: '3', title: 'VaR' },
            { id: '4', title: 'CVar' },
            { id: '5', title: 'بیشترین ریزش' },
          ]}
        />
      </div>
      <div className="bg-surface-neutral-background mb-12 h-[1px] w-full border border-dashed"></div>
      <div className="mb-6 flex items-center gap-2">
        <div className="text-text-neutral-primary text-lg font-medium">
          پیش بینی بر مبنای تغییر رژیم (Ragime Swiching)
        </div>
        <Icon name="info" size="md" />
      </div>
      <div className="flex gap-8">
        <div className="mb-8 flex h-[500px] w-full flex-1 items-center justify-center bg-slate-100">
          chart
        </div>
        <div className="hidden xl:block">
          <div className="text-md text-text-neutral-primary mb-4 hidden text-center font-normal xl:block">
            بر مبنای ۹۰ درصد بازه اطمینان:
          </div>
          <DataList
            className="h-[454px] w-[302px]"
            mode="vertical"
            data={[
              {
                key: 'حداکثر قیمت',
                value: '8',
              },
              {
                key: 'حداکثر بازدهی',
                value: '+۲۱٪',
              },
              {
                key: 'قیمت انتظاری',
                value: '۶',
              },
              {
                key: 'بازدهی انتظاری',
                value: '+۲۱٪',
              },
              {
                key: 'حداقل قیمت',
                value: '۲',
              },
              {
                key: 'حداقل بازدهی',
                value: '+۲۱٪',
              },
            ]}
          />
        </div>
      </div>
      <div className="text-md text-text-neutral-primary mb-4 font-normal xl:hidden">
        بر مبنای ۹۰ درصد بازه اطمینان:
      </div>
      <div className="mb-8 xl:hidden">
        <DataList
          mode="carousel"
          data={[
            {
              key: 'حداکثر قیمت',
              value: '8',
            },
            {
              key: 'حداکثر بازدهی',
              value: '+۲۱٪',
            },
            {
              key: 'قیمت انتظاری',
              value: '۶',
            },
            {
              key: 'بازدهی انتظاری',
              value: '+۲۱٪',
            },
            {
              key: 'حداقل قیمت',
              value: '۲',
            },
            {
              key: 'حداقل بازدهی',
              value: '+۲۱٪',
            },
          ]}
        />
      </div>
      <div className="text-text-neutral-primary mx-auto mb-2 text-center text-sm font-medium">
        بر مبنای ریسک و بازده:
      </div>
      <div className="mb-12 flex items-start justify-center gap-2">
        <Tabs
          activeTab={activeTab}
          onClickTab={(newTabId) => {
            setActiveTab(newTabId);
            console.log('clicked tab id:', newTabId);
          }}
          variant="sliding"
          tabs={[
            { id: '1', title: 'یک ماه' },
            { id: '2', title: 'سه ماه' },
            { id: '3', title: 'شش ماه' },
            { id: '4', title: 'یک سال' },
            { id: '5', title: 'جامپ تاریخی دلار' },
            { id: '6', title: 'رونق' },
            { id: '7', title: 'رکود' },
          ]}
        />
        <div className="bg-surface-neutral-tertiary border-border-neutral-secondary flex h-12 w-12 items-center justify-center rounded-full border">
          <Icon name="calendar-range" size="lg" />
        </div>
      </div>
      <div className="bg-surface-neutral-background mb-10 h-[1px] w-full border border-dashed"></div>
      <div className="mb-6 flex items-center gap-2">
        <div className="text-text-neutral-primary text-lg font-medium">
          ارزش در معرض خطر (VaR)
        </div>
        <Icon name="info" size="md" />
      </div>
      <div className="flex items-start justify-between gap-8">
        <div className="hidden xl:block">
          <DataList
            className="h-[500px] w-[302px]"
            mode="vertical"
            data={[
              { key: '99% VaR', value: '۴۵۶۳۲ ج.م' },
              { key: '97% CVaR', value: '۴۰۶۳۲ ج.م' },
              { key: '95% VaR', value: '۳۵۶۳۲ ج.م' },
              { key: '90% CVaR', value: '۳۰۶۳۲ ج.م' },
              { key: '85% VaR', value: '۲۶۶۳۲ ج.م' },
              { key: '80% CVaR', value: '۲۳۶۳۲ ج.م' },
            ]}
          />
        </div>
        <div className="mb-8 flex h-[500px] w-full flex-1 items-center justify-center bg-lime-100">
          chart
        </div>
      </div>
      <div className="mb-8 xl:hidden">
        <DataList
          mode="carousel"
          data={[
            { key: '99% VaR', value: '۴۵۶۳۲ ج.م' },
            { key: '97% CVaR', value: '۴۰۶۳۲ ج.م' },
            { key: '95% VaR', value: '۳۵۶۳۲ ج.م' },
            { key: '90% CVaR', value: '۳۰۶۳۲ ج.م' },
            { key: '85% VaR', value: '۲۶۶۳۲ ج.م' },
            { key: '80% CVaR', value: '۲۳۶۳۲ ج.م' },
          ]}
        />
      </div>
      <div className="mb-12 flex items-start justify-center gap-3">
        <div className="text-md mt-2 font-normal">مبنای پیش بینی:</div>
        <Tabs
          activeTab={activeTab}
          onClickTab={(newTabId) => {
            setActiveTab(newTabId);
            console.log('clicked tab id:', newTabId);
          }}
          variant="sliding"
          tabs={[
            { id: '0', title: 'شش ماهه' },
            { id: '1', title: 'نه ماهه' },
            { id: '2', title: 'یک ساله' },
            { id: '3', title: 'جامپ تاریخی دلار' },
            { id: '4', title: 'رونق' },
            { id: '5', title: 'رکود' },
          ]}
        />
        <div className="bg-surface-neutral-tertiary border-border-neutral-secondary flex h-12 w-12 items-center justify-center rounded-full border">
          <Icon name="calendar-range" size="lg" />
        </div>
      </div>
      <div className="bg-surface-neutral-background mb-10 h-[1px] w-full border border-dashed"></div>
      <div className="mb-6 flex items-center gap-2">
        <div className="text-text-neutral-primary text-lg font-medium">
          اهرم صندوق نسبت به کلیه صندوق های سهامی
        </div>
        <Icon name="info" size="md" />
      </div>
      <div className="flex items-start justify-between gap-8">
        <div className="mb-8 flex h-[500px] w-full items-center justify-center bg-teal-100">
          chart
        </div>
        <div className="hidden xl:block">
          <DataList
            className="h-[500px] w-[315px]"
            mode="vertical"
            data={[
              { key: 'حداکثر اهرم صندوق', value: '۲٪' },
              { key: 'حداکثر اهرم صندوق های سهامی', value: '۲٪' },
              { key: 'میانگین اهرم صندوق', value: '۲٪' },
              { key: 'میانگین اهرم صندوق های سهامی', value: '۲٪' },
              { key: 'حداقل اهرم صندوق', value: '۲٪' },
              { key: 'حداقل اهرم صندوق های سهامی', value: '۲٪' },
            ]}
          />
        </div>
      </div>
      <div className="mb-8 xl:hidden">
        <DataList
          mode="carousel"
          data={[
            { key: 'حداکثر اهرم صندوق', value: '۲٪' },
            { key: 'حداکثر اهرم صندوق های سهامی', value: '۲٪' },
            { key: 'میانگین اهرم صندوق', value: '۲٪' },
            { key: 'میانگین اهرم صندوق های سهامی', value: '۲٪' },
            { key: 'حداقل اهرم صندوق', value: '۲٪' },
            { key: 'حداقل اهرم صندوق های سهامی', value: '۲٪' },
          ]}
        />
      </div>
      <div className="mb-11 flex items-start justify-center gap-3">
        <div className="text-md mt-2 font-normal">بازه زمانی:</div>
        <Tabs
          activeTab={activeTab}
          onClickTab={(newTabId) => {
            setActiveTab(newTabId);
            console.log('clicked tab id:', newTabId);
          }}
          variant="sliding"
          tabs={[
            { id: '1', title: 'یک ماهه' },
            { id: '2', title: 'سه ماهه' },
            { id: '3', title: 'شش ماهه' },
            { id: '4', title: 'نه ماهه' },
            { id: '4', title: 'یک ساله' },
          ]}
        />
        <div className="bg-surface-neutral-tertiary border-border-neutral-secondary flex h-12 w-12 items-center justify-center rounded-full border">
          <Icon name="calendar-range" size="lg" />
        </div>
      </div>
      <div className="bg-surface-neutral-background mb-10 h-[1px] w-full border border-dashed"></div>
      <div className="mb-6 flex items-center justify-between">
        <div className="mb-6 flex items-center gap-2">
          <div className="text-text-neutral-primary text-lg font-medium">
            تحلیل ریسک نقدینگی
          </div>
          <Icon name="info" size="md" />
        </div>
        <OptionsDropdown
          dropDownList={[{ text: 'مبنای محاسبه: بالای ۳ درصد' }]}
        />
      </div>
      <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between xl:gap-8">
        <div className="xl:w-1/2">
          <div className="mb-6 flex h-[500px] w-full items-center justify-center bg-red-50">
            chart
          </div>
          <div className="mb-8">
            <DataList
              mode="carousel"
              data={[
                { key: 'حداکثر تعداد صدور', value: '۱۳' },
                { key: 'ارزش حداکثر صدور', value: '۱۳' },
                { key: 'تعداد صدور مورد انتظار', value: '۱۳' },
                { key: 'ارزش صدور مورد انتظار', value: '۳۳۱۵۱' },
                { key: 'حداقل تعداد صدور', value: '۲۱۲۱۲۵' },
                { key: 'ارزش حداکثر صدور', value: '۱۵۱۲۲' },
              ]}
            />
          </div>
        </div>
        <div className="xl:w-1/2">
          <div className="mb-6 flex h-[500px] w-full items-center justify-center bg-pink-50">
            chart
          </div>
          <div className="mb-8">
            <DataList
              mode="carousel"
              data={[
                { key: 'حداکثر تعداد صدور', value: '۱۳' },
                { key: 'ارزش حداکثر صدور', value: '۱۳' },
                { key: 'تعداد صدور مورد انتظار', value: '۱۳' },
                { key: 'ارزش صدور مورد انتظار', value: '۳۳۱۵۱' },
                { key: 'حداقل تعداد صدور', value: '۲۱۲۱۲۵' },
                { key: 'ارزش حداکثر صدور', value: '۱۵۱۲۲' },
              ]}
            />
          </div>
        </div>
      </div>
      <div className="mb-11 flex items-start justify-center gap-3">
        <div className="text-md mt-2 font-normal">
          تحلیل ریسک نقدینگی بر مبنای:
        </div>
        <Tabs
          activeTab={activeTab}
          onClickTab={(newTabId) => {
            setActiveTab(newTabId);
            console.log('clicked tab id:', newTabId);
          }}
          variant="sliding"
          tabs={[
            { id: '1', title: 'صدور' },
            { id: '4', title: 'ابطال' },
            { id: '4', title: 'خالص صدور و ابطال' },
          ]}
        />
      </div>
    </div>
  );
};
