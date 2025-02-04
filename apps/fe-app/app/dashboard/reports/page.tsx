import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';

import { Checkbox, Icon } from 'design-system';
import { ReportList } from './_components/ReportsList';
import { SideBar } from './_components/SideBar';
import { SearchBar } from './_components/SearchBar';
import CoursesSlugs from './_components/CourseSlugs';
import { DashboardService, GetDashboardReportsData, OpenAPI } from '../../openapi/requests';
import { DashboardServiceDeleteDashboardReportsByReportIdFavoriteMutationResult } from '../../openapi/queries';

const categories = [
  {
    title: 'سهام',
    id: '2',
    quantity: 46,
  },
  {
    title: 'درآمد ثابت',
    id: '3',
    quantity: 34,
  },
  {
    title: 'صندوق های سهامی',
    id: '4',
    quantity: 41,
  },
  {
    title: 'صندوق های درآمد ثابت',
    id: '5',
    quantity: 29,
  },
  {
    title: 'صندوق های کالایی',
    id: '6',
    quantity: 18,
  },
];

async function getData(searchParams: GetDashboardReportsData) {
  OpenAPI.HEADERS = {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0IiwiZXhwIjoxNzM4NzQ3ODE4fQ.80L6oheMX4xsIOZRDBDlLGdHKZ1xtHGzQ-RlO_574BQ`,
  };
  const result = await DashboardService.getDashboardReports({...searchParams,onlyFavorite:true});
  return result;
  // const res = await fetch(`http://185.141.213.190:8000/dashboard/reports`, {
  //   cache: 'no-store',
  //   headers: {
  //     Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0IiwiZXhwIjoxNzM4NjU5OTgwfQ.1CVA43b4s2NSkTD63XP1ywlY9TLlTQZSCYTfawSOIBg`,
  //     'Content-Type': 'application/json',
  //   },
  // });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // if (!res.ok) {
  //   // This will activate the closest `error.js` Error Boundary
  //   throw new Error('Failed to fetch data');
  // }

  // return res.json();
}
export default async function ReportMenuPage({ searchParams }: { searchParams: GetDashboardReportsData }) {
  // const { isHeaderVisible } = useHeaderVisibility();
  const reports = await getData(searchParams);
  console.log(reports);

  return (
    <div className="container mx-auto max-w-7xl">
      <div className="flex items-center justify-start gap-6">
        <h1 className="text-3xl font-medium">لیست گزارش ها</h1>
        <SearchBar />
        <Popover>
          <PopoverButton className="bg-brand-600 flex h-14 w-14 items-center justify-center rounded-xl text-white outline-none">
            <Icon name="filter" size="lg" />
          </PopoverButton>
          <PopoverPanel
            transition
            anchor="bottom start"
            className="z-20 mt-1 w-[204px] rounded-xl border border-gray-200 bg-white py-2 transition duration-300 ease-in-out [--anchor-gap:var(--spacing-10)] data-[closed]:-translate-y-1 data-[closed]:opacity-0"
          >
            <h4 className="text-md mb-1 py-1 pr-4 font-medium">فیلتر ها</h4>
            <h5 className="pr-4 pt-2 text-sm font-medium"> ویژگی های گزارش</h5>
            <div className="pr-4">
              <div className="py-2">
                <Checkbox content="جدید" />
              </div>
              <div className="py-2">
                <Checkbox content="مورد علاقه" />
              </div>
              <div className="py-2">
                <Checkbox content="با ویدیو بررسی" />
              </div>
            </div>
          </PopoverPanel>
        </Popover>
      </div>
      <div className="flex items-start justify-between gap-8">
        <div className="w-[1048px]">
          <ReportList reports={reports} /> 
           {/* <Pagination
            currentPage={meta.current_page}
            pageCount={meta.last_page}
            pageSize={meta.per_page}
          /> */}
        </div>
        {/* <SideBar categories={categories} /> */}
        <CoursesSlugs />
      </div>
    </div>
  );
}
