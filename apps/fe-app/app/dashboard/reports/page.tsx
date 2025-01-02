import chartPNG from '@aress-assets/chart.png';
import chartPNG2 from '@aress-assets/chart2.png';
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  PopoverBackdrop,
} from '@headlessui/react';

import {
  Button,
  Checkbox,
  cn,
  FileUpload,
  Icon,
  Pagination,
  ReportCard,
  TextField,
} from 'design-system';
const cards = [
  {
    title: 'ورود سرمایه‌گذاران حقیقی به ۵ صنعت برتر',
    brief:
      'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد',

    reportSubscription: 'سهامی',
    categoryType: 'سهامی',
    newBadge: false,
    videoBadge: false,
    image: chartPNG,
    fixedBrief: false,
  },
  {
    title: 'نرخ بازده تا سررسید',
    brief:
      'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد',
    reportSubscription: 'صندوق‌های سهامی',
    categoryType: 'صندوق‌های سهامی',
    newBadge: false,
    videoBadge: false,
    image: chartPNG2,
    fixedBrief: false,
  },
  {
    title: 'سهم تأثیر بازدهی صنایع در شاخص',
    brief:
      'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد',
    reportSubscription: 'سهامی',
    categoryType: 'سهامی',
    newBadge: true,
    videoBadge: false,
    image: chartPNG,
    fixedBrief: false,
  },
  {
    title: 'شاخص کل و ورود و خروج سرمایه گذار حقیقی',
    brief:
      'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد',
    reportSubscription: 'سهامی',
    categoryType: 'سهامی',
    newBadge: false,
    videoBadge: false,
    image: chartPNG2,
    fixedBrief: false,
  },
  {
    title: 'ورود و خروج تجمعی سرمایه‌گذاران حقیقی به سهام و درآمد ثابت',
    brief:
      'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد',
    reportSubscription: 'درآمد ثابت',
    categoryType: 'درآمد ثابت',
    newBadge: true,
    videoBadge: false,
    image: chartPNG,
    fixedBrief: false,
  },
  {
    title: 'سهم تأثیر صنایع در شاخص',
    brief:
      'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد',
    reportSubscription: 'سهامی',
    categoryType: 'سهامی',
    newBadge: false,
    videoBadge: true,
    image: chartPNG2,
    fixedBrief: false,
  },
  {
    title: 'شاخص کل و ورود و خروج سرمایه',
    brief:
      'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد',
    reportSubscription: 'سهامی',
    categoryType: 'سهامی',
    newBadge: false,
    videoBadge: false,
    image: chartPNG,
    fixedBrief: false,
  },
  {
    title: 'ورود سرمایه‌گذاران حقیقی به ۵ صنعت برتر',
    brief:
      'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد',
    reportSubscription: 'سهامی',
    categoryType: 'سهامی',
    newBadge: false,
    videoBadge: false,
    image: chartPNG2,
  },
  {
    title: 'نرخ بازده تا سررسید',
    brief:
      'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد',
    reportSubscription: 'صندوق‌های سهامی',
    categoryType: 'صندوق‌های سهامی',
    newBadge: false,
    videoBadge: false,
    image: chartPNG,
    fixedBrief: false,
  },
];
const categories = [
  {
    title: 'همه ی گزارش ها',
    id: '1',
    quantity: 168,
  },
  {
    title: 'سهام',
    id: '2',
    quantity: 46,
  },
  {
    title: 'در آمد ثابت',
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
export default function ReportMenuPage() {
  return (
    <div className="container mx-auto max-w-7xl">
      <div className="flex items-center justify-start gap-6">
        <h1 className="text-3xl font-medium">لیست گزارش ها</h1>
        <TextField
          className="w-[416px]"
          mergeTitleAndPlaceholder={false}
          mode="outline"
          leadingIcon={{ name: 'search', size: 'lg' }}
          trailingIcons={[{ name: 'x', size: 'lg' }]}
          placeholder="جستجو گزارش..."
        />
      </div>
      <div className="flex items-start justify-between gap-8">
        <div className="w-[1048px]">
          <div className="flex flex-wrap gap-8">
            {cards.map((card) => (
              <ReportCard
                key={card.title}
                {...card}
                fixedBrief={true}
                isLiked={true}
              />
            ))}
          </div>
          {/* <div className="bg-brand-600 fixed bottom-[72px] left-[216px] flex h-14 w-14 items-center justify-center rounded-full text-white">
            <Icon name="clipboard-plus" size="lg" />
          </div> */}
          <Popover className="z-10">
            <PopoverButton className="bg-brand-600 fixed bottom-[72px] left-[216px] z-10 my-6 flex h-14 w-14 items-center justify-center rounded-full text-white">
              <Icon name="clipboard-plus" size="lg" />
            </PopoverButton>
            <PopoverBackdrop className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
            <PopoverPanel
              transition
              anchor="bottom end"
              className="fixed -mt-4 w-[584px] rounded-3xl bg-white p-6 transition duration-300 ease-in-out [--anchor-gap:var(--spacing-10)] data-[closed]:-translate-y-1 data-[closed]:opacity-0"
            >
              <h3 className="text-center text-lg font-medium">
                درخواست گزارش جدید
              </h3>
              <form>
                <TextField
                  label="عنوان گزارش"
                  mergeTitleAndPlaceholder={false}
                  placeholder="عنوان گزارش مدنظر خود را اینجا وارد کنید..."
                  mode="outline"
                  trailingIcons={[]}
                />
                <TextField
                  label="شرح گزارش"
                  mergeTitleAndPlaceholder={false}
                  placeholder="میتواند شامل محور افقی و عمودی،روابط آماری و ریاضی و تشریح مدل های مالی باشد..."
                  mode="outline"
                  trailingIcons={[]}
                />
                <div className="mb-6">
                  <h3 className="mb-2 text-sm font-medium">
                    پیوست فایل اکسل فرآیند طراحی نمودار را تسهیل
                    میکنید.(اختیاری)
                  </h3>
                  <FileUpload types={['xls', 'xlsx']} maxSize={1000000000} />
                </div>
                <div className="mb-8">
                  <Checkbox content="در مورد تشریح جزئیات گزارش احتیاج دارم با من تماس گرفته شود." />
                </div>
                <Button
                  align="center"
                  type="button"
                  isLoading={false}
                  mode="primary"
                  disabled
                  size="sm"
                >
                  ثبت درخواست
                </Button>
              </form>
            </PopoverPanel>
          </Popover>
          {/* <Button size='sm' className='rounded-full fixed left-[216px] bottom-[72px]' align='center' isLoading={false} mode='primary'><Icon name='CustomAlpha'/></Button> */}
          <Pagination currentPage={1} pageCount={6} pageSize={10} />
        </div>
        <div className="sticky top-0 h-screen w-[200px] p-2">
          <div className="mb-4 flex items-center gap-2">
            <Icon name="layers-2" size="lg" />
            <div className="text-lg font-medium">دسته بندی ها</div>
          </div>
          <ul>
            {categories.map((category) => (
              <>
                <li
                  key={category.id}
                  className={cn(
                    'mb-4 flex items-center gap-2 rounded-md text-sm font-medium',
                  )}
                >
                  <div
                    className={cn('h-4 w-[2px] rounded-md bg-gray-300', {
                      'bg-brand-600 h-5 w-1': category.id === '1',
                    })}
                  ></div>
                  {category.title} ({category.quantity})
                </li>
              </>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
