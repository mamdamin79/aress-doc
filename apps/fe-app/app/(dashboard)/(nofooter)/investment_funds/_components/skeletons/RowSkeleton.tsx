import { useEffect, useState } from 'react';

export function RowSkeleton() {
  const [columnCount, setColumnCount] = useState(6);

  useEffect(() => {
    const calcColumnCount = () => {
      const screenWidth = window.innerWidth;

      const availableWidth = screenWidth - 450;
      const count = Math.floor(availableWidth / 120);

      setColumnCount(count > 0 ? count : 1);
    };

    calcColumnCount();
    window.addEventListener('resize', calcColumnCount);

    return () => window.removeEventListener('resize', calcColumnCount);
  }, []);

  return (
    <div className="mr-6 flex h-12 w-screen animate-pulse items-center justify-start gap-2 border-b">
      <div className="h-6 w-9 rounded-md bg-gray-200" />
      <div className="h-6 w-[62px] rounded-md bg-gray-200" />
      <div className="mr-4 h-8 w-8 rounded-full bg-gray-200" />
      <div className="ml-36 mr-2 h-[26px] w-[74px] rounded-xl bg-gray-200" />
      <div className="flex items-center gap-[70px]">
        {[...Array(columnCount)].map((_, index) => (
          <div
            key={index}
            className="h-[26px] w-[74px] rounded-xl bg-gray-200"
          />
        ))}
      </div>
    </div>
  );
}
