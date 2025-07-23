'use client';
import { Button } from 'design-system';
import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FooterLite } from './(layout)';
import { Header } from './(layout)/(header)';

export default function GlobalError({
  error,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

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
          <Image
            alt="pattern"
            src="/Pattern1.svg"
            fill
            className="object-cover px-8"
          />
        </div>

        <Image
          alt="500 error"
          src={'/500-Error.svg'}
          width={400}
          height={307}
          className="z-10"
        />

        <div className="flex flex-col items-center justify-center gap-3">
          <h1 className="text-3xl font-medium">خطای 500</h1>
          <h2 className="text-text-neutral-secondary text-xl font-medium">
            به دلیل خطا در ارتباط با سرور صفحه مورد نظر در دسترس نیست.
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
