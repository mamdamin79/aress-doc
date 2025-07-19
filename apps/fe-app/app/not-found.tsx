import Image from 'next/image';
import { FooterLite } from './(layout)';
import { Header } from './(layout)/(header)';
import { Button } from 'design-system';
import Link from 'next/link';

export default function NotFound() {
  return (
    <>
      <Header />
      <div className="text-text-neutral-primary flex flex-col items-center justify-center gap-8 pb-16 pt-8">
        <Image alt="404 error" src={'/404.png'} width={400} height={307} />
        <div className="flex flex-col items-center justify-center gap-3">
          <h1 className="text-3xl font-medium">خطای 404</h1>
          <h2 className="text-text-neutral-secondary text-xl font-medium">
            صفحه مورد نظر یافت نشد.
          </h2>
        </div>
        <Button
          align="center"
          isLoading={false}
          mode="primary"
          size="md"
          className="w-fit"
        >
          <Link href="/">بازگشت به صفحه اصلی</Link>
        </Button>
      </div>
      <FooterLite />
    </>
  );
}
