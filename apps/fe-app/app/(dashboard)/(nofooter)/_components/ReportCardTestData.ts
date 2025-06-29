export const tempData = {
  title: 'شاخص کل، ورود و خروج ماهانه سرمایه‌گذاران حقیقی به سهام',
  switchIcons: {
    items: [
      {
        icon: { name: 'grid-3x3' },
      },
      {
        icon: { name: 'chart-scatter' },
      },
    ],
    onChange(value: number) {
      console.log(value);
    },
    size: 'sm',
    bgWhite: false,
    initialIndex: 1,
  },
  settingOptions: [
    {
      type: 'nestedDropdown',
      props: {
        title: 'نمودار خطی',
        items: [
          {
            title: 'نام شاخص:',
            icon: { name: 'square-mouse-pointer', size: 'sm' },
            status: 'normal',
            selectedOption: 'شاخص کل',
            optionsListProps: {
              selectedItemId: 1,
              searchable: false,
              title: 'نام شاخص',
              items: {
                items: [
                  {
                    id: 1,
                    title: 'ذغال سنگ',
                  },
                  {
                    id: 2,
                    title: 'شاخص کل (هم‌وزن)',
                  },
                  {
                    id: 3,
                    title: 'شاخص قیمت (وزنی-ارزشی)',
                  },
                  {
                    id: 4,
                    title: 'شاخص قیمت (هم‌وزن)',
                  },
                ],
              },
            },
          },
        ],
      },
    },
    {
      type: 'nestedDropdown',
      props: {
        title: 'نمودار میله‌ای',
        items: [
          {
            title: 'نوع سرمایه‌گذار:',
            icon: { name: 'square-mouse-pointer', size: 'sm' },
            status: 'normal',
            selectedOption: 'حقیقی',
            optionsListProps: {
              selectedItemId: 1,
              searchable: false,
              title: 'نوع سرمایه‌گذار',
              items: {
                items: [
                  {
                    id: 1,
                    title: 'حقیقی',
                  },
                  {
                    id: 2,
                    title: 'حقوقی',
                  },
                ],
              },
            },
          },
        ],
      },
    },
    {
      props: {
        title: 'تفکیک زمانی: ',
        icon: { name: 'square-mouse-pointer', size: 'sm' },
        status: 'normal',
        selectedOption: 'ماهانه',
        optionsListProps: {
          selectedItemId: 3,
          searchable: false,
          title: 'تفکیک زمانی',
          items: {
            items: [
              {
                id: 1,
                title: 'روزانه',
              },
              {
                id: 2,
                title: 'هفتگی',
              },
              {
                id: 3,
                title: 'ماهانه',
              },
              {
                id: 4,
                title: 'سالانه',
              },
            ],
          },
        },
      },
      type: 'basicSelection',
    },
  ],
};
