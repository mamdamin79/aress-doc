'use client';
export function ShareReportPopupSkeleton() {
  return (
    <div className="flex w-full flex-col gap-6">
      {/* Title skeleton */}
      <div className="skeleton-shimmer mx-auto h-[28px] w-[180px] rounded-2xl" />

      {/* Image skeleton */}
      <div className="flex w-full justify-center">
        <div className="skeleton-shimmer h-[234px] w-[400px] rounded-2xl" />
      </div>

      {/* "Send to:" label skeleton */}
      <div className="flex w-full flex-col">
        <div className="skeleton-shimmer mb-3 ml-auto h-[20px] w-[60px] rounded-2xl" />

        {/* Platform icons container */}
        <div className="relative flex w-full items-center overflow-hidden">
          <div className="flex">
            {/* Platform item skeletons */}
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="mx-2 flex w-16 flex-col items-center gap-2"
              >
                {/* Platform icon skeleton */}
                <div className="skeleton-shimmer h-14 w-14 rounded-full" />
                {/* Platform name skeleton */}
                <div className="skeleton-shimmer h-[16px] w-[50px] rounded-2xl" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
