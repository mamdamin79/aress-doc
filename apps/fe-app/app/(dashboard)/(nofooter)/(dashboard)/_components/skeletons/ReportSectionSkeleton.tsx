export function ReportSectionSkeleton () {
    return (
        <div className="border-2 p-2 rounded-2xl border-border-neutral-secondary h-[336px] w-[616px]">
            <div className="skeleton-shimmer w-1/2 h-[34px] rounded-2xl" />
            <div className="skeleton-shimmer w-full h-[1px] mt-2 rounded-2xl" />
            <div className="skeleton-shimmer w-full mt-5 h-[34px] rounded-2xl" />
        </div>
    )
}