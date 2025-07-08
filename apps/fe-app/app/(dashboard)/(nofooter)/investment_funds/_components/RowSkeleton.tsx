import { useEffect, useState } from "react";

export function RowSkeleton() {
  const [columnCount, setColumnCount] = useState(6);

  useEffect(() => {
    const calcColumnCount = () => {
      const screenWidth = window.innerWidth;

      const availableWidth = screenWidth - 200;
      const count = Math.floor(availableWidth / 120);

      setColumnCount(count > 0 ? count : 1);
    };

    calcColumnCount();
    window.addEventListener("resize", calcColumnCount);

    return () => window.removeEventListener("resize", calcColumnCount);
  }, []);

  return (
    <div className="flex h-12 items-center animate-pulse justify-start border-b mr-6 w-screen gap-2">
      <div className="h-7 w-10 rounded-md bg-gray-200" />
      <div className="h-7 w-16 rounded-md bg-gray-200" />
      <div className="w-9 h-9 mr-4 rounded-full bg-gray-200" />
      <div className="flex items-center gap-[40px]">
        {[...Array(columnCount)].map((_, index) => (
          <div
            key={index}
            className="h-3 w-20 rounded-md bg-gray-200"
          />
        ))}
      </div>
    </div>
  );
}
