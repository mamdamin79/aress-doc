export function ReportTitleSkeleton() {
    return (
        <div className="flex justify-between items-center">
            <div className="w-[188px] h-10 skeleton-shimmer rounded-tl-xl rounded-br-xl" />
            <div className="rounded-full skeleton-shimmer w-10 h-10" />
        </div>
    )
}