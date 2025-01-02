import React from 'react';
import { SlidersBox } from './_components';
import { HorizontalScrollBar } from 'design-system';
import { AutoScroll } from 'compositions';

const page = () => {
  return (
    <>
      <h1 className="fixed left-1/2 top-6 z-50 -translate-x-1/2 text-xl font-medium">
        <span className="text-md">داشبورد 1:</span>
        <span> </span>
        تحلیل صنعت پتروشیمی
      </h1>
      <div className="fixed right-6 top-1/2 -mt-16 -translate-x-1/2">
        <AutoScroll />
      </div>
      <section className="mt-8 flex w-full justify-center px-20">
        <SlidersBox />
      </section>
    </>
  );
};

export default page;
