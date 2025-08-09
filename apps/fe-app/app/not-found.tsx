import { FooterLite } from './(layout)';
import { Header } from './(layout)/(header)';
import { Button } from 'design-system';
import Link from 'next/link';

export default function NotFound() {
  return (
    <>
      <Header />
      <div
        className="text-text-neutral-primary relative flex flex-col items-center justify-center gap-8 px-8 pb-16 pt-8"
        style={{
          backgroundSize: '1200px 600px',
          backgroundPosition: '0 -200px',
        }}
      >
        <div className="absolute left-0 top-12 -z-10 max-h-[600px] min-h-[350px] w-full px-8 lg:min-h-[432px]">
          <img
            alt="pattern"
            src="/Pattern1.svg"
            className="h-full max-h-[450px] min-h-[250px] w-full object-cover px-8 lg:min-h-[350px]"
          />
        </div>

        <img
          alt="404 error"
          src={'/404-Error.svg'}
          className="z-10 h-[307px] w-[430px]"
        />
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
