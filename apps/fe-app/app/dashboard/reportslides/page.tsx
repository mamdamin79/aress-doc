import React from 'react';
import { DashboardNumberAndName, SlidersBox } from './_components';
import { HorizontalScrollBar } from 'design-system';
import { AutoScroll } from 'compositions';

const page = () => {
  return (
    <div className="relative flex w-full flex-row">
      <div>
        <div className="flex justify-between">
          <DashboardNumberAndName number={2} title="صندوق کالایی" />
          <AutoScroll />
        </div>

        <section className="mt-8 flex w-full justify-center">
          <SlidersBox />
        </section>
      </div>
    </div>
  );
};

export default page;
