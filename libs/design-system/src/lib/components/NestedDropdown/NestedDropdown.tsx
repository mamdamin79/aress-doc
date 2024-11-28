import React from 'react';
import { Field } from './Field/Field';
export const NestedDropdown = () => {
  return (
    <div className="flex w-[292px] h-fit gap-4 flex-col relative">
      <Field
        icon={{ name: 'list-tree', size: 'sm' }}
        status="opened"
        title="مبنای ارزش معاملات"
        activeIcon={{ name: 'list-minus', size: 'md' }}
        onClick={()=>console.log('clicked')}

      />
      {/* connection path shapes */}
<div className='absolute top-11 right-2 border-b-2 border-r-2 border-red-600 rounded-br-md w-7 h-[136px]'></div>
<div className='absolute top-11 right-2 border-b-2 border-r-2 border-brand-600 rounded-br-md w-5 h-[84px]'></div>
<div className='absolute top-11 right-2 border-b-2 border-r-2 border-brand-600 rounded-br-md w-3 h-8'></div>



          <div className="flex flex-col pr-6 gap-3 w-full ">
            <div>
          <Field
        icon={{ name: 'square-mouse-pointer', size: 'sm' }}
        status="normal"
        title="نوع بازار:"
        selectedOption='کل بازار'
        onClick={()=>console.log('clicked')}

      />
      </div>
      <div className='pr-2'>
        <Field
        icon={{ name: 'square-mouse-pointer', size: 'sm' }}
        status="normal"
        title="صنعت:"
        selectedOption="کانی‌ های فلزی"
        onClick={()=>console.log('clicked')}
      />
      </div>
      <div className='pr-4'>
              <Field
        icon={{ name: 'square-mouse-pointer', size: 'sm' }}
        status="error"
        title='ابزار مالی'
        placeHolder='یک مورد را انتخاب کنید...'
        onClick={()=>console.log('clicked')}

      />
      </div>
          </div>

    </div>
  );
};
