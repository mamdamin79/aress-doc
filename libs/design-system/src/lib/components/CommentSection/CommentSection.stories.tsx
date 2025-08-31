import { Meta, StoryObj } from '@storybook/nextjs';
import { CommentSection } from './CommentSection';
import { ParentCommentProps } from './CommentSection.types';
const meta: Meta<typeof CommentSection> = {
  component: CommentSection,
  title: 'Components/CommentSection',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CommentSection>;

const sampleComments: ParentCommentProps[] = [
  {
    id: '1',
    author: {
      name: 'آرش پاکزاد',
      profileImage: undefined,
    },
    content: `سلام، من در مورد نحوه پرداخت سود در صندوق سهم آشنا سوال داشتم. سود به صورت ماهانه پرداخت می‌شود یا سالانه؟
همچنین، می‌خواستم بدونم اگر در طول دوره سرمایه‌گذاری، نیاز داشته باشم نوع سرمایه‌گذاری‌ام رو تغییر بدم یا بخشی از سرمایه‌ام رو برداشت کنم، آیا چنین امکانی فراهم هست؟ اگر بله، چه شرایط و محدودیت‌هایی برای این تغییرات وجود داره و آیا این کار ممکنه منجر به کاهش سوددهی بشه؟ لطفاً توضیح بدید که این تغییرات چه تأثیری روی سود نهایی من خواهد داشت و آیا توصیه‌ای در این زمینه دارید؟`,
    timestamp: '1 تیر 1403 - 11:47',
    reply: {
      id: '1-1',
      author: {
        name: 'مدیر صندوق سهم آشنا',
      },
      content: `سلام، سپاس از سوال شما. سود صندوق سهم آشنا به صورت دوره‌ای و بر اساس عملکرد صندوق پرداخت می‌شود. دوره‌های پرداخت سود ممکن است ماهانه، سه‌ماهه یا سالانه باشد. برای اطلاعات دقیق‌تر، می‌توانید به بخش شرایط و مقررات صندوق در وبسایت مراجعه کنید یا با تیم پشتیبانی ما تماس بگیرید.در مورد تغییر نوع سرمایه‌گذاری یا برداشت بخشی از سرمایه در طول دوره، بله این امکان وجود دارد. با این حال، شرایط و محدودیت‌هایی نیز وجود دارد که باید مدنظر قرار گیرد. این تغییرات ممکن است بسته به زمان‌بندی و نوع سرمایه‌گذاری جدید، تأثیری روی سوددهی نهایی شما داشته باشد. برای مثال، برداشت سرمایه پیش از موعد ممکن است باعث کاهش سوددهی شود یا تغییر نوع سرمایه‌گذاری ممکن است بسته به شرایط بازار، بازدهی متفاوتی به همراه داشته باشد.
پیشنهاد ما این است که قبل از انجام هرگونه تغییر، حتماً با مشاوران ما مشورت کنید تا بهترین تصمیم را بر اساس شرایط فعلی بازار و اهداف بلندمدت خود بگیرید. تیم پشتیبانی ما همواره آماده است تا شما را در این مسیر راهنمایی کند و پاسخگوی تمامی سوالات شما باشد.`,
      timestamp: '1 تیر 1403 - 11:47',
    },
    onReply(commentId) {
      console.log(commentId);
    },
    onEdit(commentId) {
      console.log(commentId);
    },
    onDelete(commentId) {
      console.log(commentId);
    },
  },
];

export const Default: Story = {
  args: {
    comments: sampleComments,
    className: 'w-[800px]',
    onEdit(commentId) {
      console.log(commentId);
    },
    onDelete(commentId) {
      console.log(commentId);
    },
  },
};
