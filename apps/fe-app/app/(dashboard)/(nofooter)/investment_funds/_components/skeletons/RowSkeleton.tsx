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
    <tr className="animate-pulse border-b">
      <td>
        <div className="h-6 w-9 rounded-md bg-gray-200" />
      </td>
      <td>
        <div className="h-6 w-[62px] rounded-md bg-gray-200" />
      </td>
      <td>
        <div className="h-8 w-8 rounded-full bg-gray-200" />
      </td>
      <td>
        <div className="h-[26px] w-[74px] rounded-xl bg-gray-200" />
      </td>
      {[...Array(columnCount)].map((_, index) => (
        <td key={index}>
          <div className="h-[26px] w-[74px] rounded-xl bg-gray-200" />
        </td>
      ))}
    </tr>
  );
}
