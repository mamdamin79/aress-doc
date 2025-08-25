import { Breadcrumb } from 'design-system';

export default function MyFund() {
  return (
    <div>
      <div className="mr-32">
        <Breadcrumb
          items={[
            {
              icon: 'home',
            },
            {
              title: 'صندوق من',
              link: '/my-fund',
            },
            {
              title: 'صندوق سرمایه گذاری سهم آشنا',
            },
          ]}
        />
      </div>
    </div>
  );
}
