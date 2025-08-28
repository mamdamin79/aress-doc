import { useEffect, useState } from 'react';

export function RowSkeleton() {
  const [columnCount, setColumnCount] = useState(6);

  useEffect(() => {
    const calcColumnCount = () => {
      const screenWidth = window.innerWidth;
      const availableWidth = screenWidth - 450;
      const count = Math.floor(availableWidth / 144);
      setColumnCount(count > 0 ? count : 1);
    };

    calcColumnCount();
    window.addEventListener('resize', calcColumnCount);
    return () => window.removeEventListener('resize', calcColumnCount);
  }, []);

  return (
    <tr className="flex h-12 animate-pulse items-center border-b pr-8">
      <td className="flex gap-1">
        <div className="h-6 w-9 rounded-md bg-gray-200" />
        <div className="h-6 w-[62px] rounded-md bg-gray-200" />
      </td>
      <td className="ml-[140px] mr-[26px] flex gap-2">
        <div className="h-8 w-8 rounded-full bg-gray-200" />
        <div className="h-[26px] w-[74px] rounded-xl bg-gray-200" />
      </td>

      {[...Array(columnCount)].map((_, index) => (
        <td key={index}>
          <div className="ml-[70px] h-[26px] w-[74px] rounded-xl bg-gray-200" />
        </td>
      ))}
    </tr>
  );
}
