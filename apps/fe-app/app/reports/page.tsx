import { ReportCard } from 'design-system';
import chartPNG from '../../assets/images/chart.png';
import chartPNG2 from '../../assets/images/chart2.png';

// import  from "design-system";
export default function ReportsPage() {
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
    // {
    //   title: 'سهم تأثیر بازدهی صنایع در شاخص',
    //   brief:
    //     'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد',
    //   reportSubscription: 'سهامی',
    //   categoryType: 'سهامی',
    //   newBadge: true,
    //   videoBadge: false,
    //   image: chartPNG,
    //   fixedBrief: false,
    // },
    // {
    //   title: 'شاخص کل و ورود و خروج سرمایه گذار حقیقی',
    //   brief:
    //     'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد',
    //   reportSubscription: 'سهامی',
    //   categoryType: 'سهامی',
    //   newBadge: false,
    //   videoBadge: false,
    //   image: chartPNG2,
    //   fixedBrief: false,
    // },
    // {
    //   title: 'ورود و خروج تجمعی سرمایه‌گذاران حقیقی به سهام و درآمد ثابت',
    //   brief:
    //     'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد',
    //   reportSubscription: 'درآمد ثابت',
    //   categoryType: 'درآمد ثابت',
    //   newBadge: true,
    //   videoBadge: false,
    //   image: chartPNG,
    //   fixedBrief: false,
    // },
    // {
    //   title: 'سهم تأثیر صنایع در شاخص',
    //   brief:
    //     'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد',
    //   reportSubscription: 'سهامی',
    //   categoryType: 'سهامی',
    //   newBadge: false,
    //   videoBadge: true,
    //   image: chartPNG2,
    //   fixedBrief: false,
    // },
    // {
    //   title: 'شاخص کل و ورود و خروج سرمایه',
    //   brief:
    //     'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد',
    //   reportSubscription: 'سهامی',
    //   categoryType: 'سهامی',
    //   newBadge: false,
    //   videoBadge: false,
    //   image: chartPNG,
    //   fixedBrief: false,
    // },
    // {
    //   title: 'ورود سرمایه‌گذاران حقیقی به ۵ صنعت برتر',
    //   brief:
    //     'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد',
    //   reportSubscription: 'سهامی',
    //   categoryType: 'سهامی',
    //   newBadge: false,
    //   videoBadge: false,
    //   image: chartPNG2,
    // },
    // {
    //   title: 'نرخ بازده تا سررسید',
    //   brief:
    //     'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد',
    //   reportSubscription: 'صندوق‌های سهامی',
    //   categoryType: 'صندوق‌های سهامی',
    //   newBadge: false,
    //   videoBadge: false,
    //   image: chartPNG,
    //   fixedBrief: false,
    // },
  ];
  return (
    <div className="container mx-auto max-w-7xl">
      {/* <h1>لیست گزارش ها </h1> */}
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-9 grid h-screen grid-cols-2 gap-8 bg-red-100">
          {cards.map((card, index) => (
            <ReportCard
              key={index}
              brief={card.brief}
              title={card.title}
              reportSubscription={card.reportSubscription}
              categoryType={card.categoryType}
              newBadge={card.newBadge}
              videoBadge={card.videoBadge}
              image={card.image}
              fixedBrief={card.fixedBrief}
            />
          ))}
        </div>
        <div className="col-span-3 h-screen bg-blue-100"></div>
      </div>
    </div>
  );
}
