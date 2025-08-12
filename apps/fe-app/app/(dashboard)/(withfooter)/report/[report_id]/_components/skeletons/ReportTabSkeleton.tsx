export function ReportTabSkeleton () {
    return (
        <div className="flex items-center gap-2 w-full justify-center">
            <div className="rounded-full skeleton-shimmer w-32 h-[42px]" />
            <div className="rounded-full skeleton-shimmer w-32 h-[42px]" />
            <div className="rounded-full skeleton-shimmer w-32 h-[42px]" />
        </div>
    )
}