export function ReportTitleSectinoSkeleton() {
    return (
        <div className="w-full">
            <div className="w-full skeleton-shimmer h-[38px] rounded-2xl" />
            <div className="flex items-center justify-between my-6">
                <div className="flex items-center gap-3">
                    <div className="skeleton-shimmer h-[22px] w-[54px] rounded-2xl" />
                    <div className="skeleton-shimmer h-[22px] w-[94px] rounded-2xl" />
                    <div className="skeleton-shimmer h-[22px] w-[37px] rounded-2xl" />
                    <div className="w-[37px] h-[22px] skeleton-shimmer rounded-2xl" />
                </div>
                <div className="flex items-center gap-3">
                    <div className="rounded-full skeleton-shimmer w-[32px] h-[32px]" />
                    <div className="rounded-md skeleton-shimmer w-[163px] h-[38px]" />
                </div>
            </div>
            <div className="w-full skeleton-shimmer h-[2px] mb-4" />
            <div className="flex flex-col gap-2">
                <div className="w-[82px] h-[30px] skeleton-shimmer rounded-2xl" />
                <div className="w-full h-[26px] skeleton-shimmer rounded-2xl" />
                <div className="w-[335px] h-[26px] skeleton-shimmer rounded-2xl" />
            </div>
        </div>
    )
}