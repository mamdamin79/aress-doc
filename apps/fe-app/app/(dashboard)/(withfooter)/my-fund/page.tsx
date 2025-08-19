'use client';
import { Breadcrumb, Button, FundsLogo, Tabs } from 'design-system';
import { Summary } from './_components/Summary';
import { useState } from 'react';

export default function FundPage() {
  const [hoveredData, setHoveredData] = useState<HoverData | null>(null);

  const handleChartHover = (data: HoverData | null) => {
    setHoveredData(data);
  };
  const data = {
    data: [
      {
        mean: 7.05653181542992,
        points: [
          { date: '2025-06-28', value: 30788784785779 },
          { date: '2025-06-29', value: 30405281689754 },
          { date: '2025-06-30', value: 87194219214295 },
          { date: '2025-07-01', value: 117202322640183 },
          { date: '2025-07-02', value: 242103985257960 },
          { date: '2025-07-03', value: 106557396483695 },
          { date: '2025-07-04', value: 69988139907382 },
          { date: '2025-07-05', value: 9566794851250 },
          { date: '2025-07-06', value: 73321292901219 },
          { date: '2025-07-07', value: 58848569449577 },
          { date: '2025-07-08', value: 80458353616971 },
          { date: '2025-07-09', value: 75856680940561 },
          { date: '2025-07-10', value: 7869499505404 },
          { date: '2025-07-11', value: 8909196706610 },
        ],
      },
    ],
  };

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
            {
              title: 'خلاصه',
              id: '0',
              content: (
                <Summary
                  data={data}
                  defaultQuantity={560000000}
                  defaultValueChange={100000}
                  defaultPercentageChange={5.3}
                  onHover={handleChartHover}
                  hoveredData={hoveredData}
                />
              ),
            },
            { title: 'تحلیل بازدهی', id: '1', content: '' },
            { title: 'ارزیابی ریسک', id: '2', content: '' },
          ]}
        />
      </div>
    </div>
  );
}
