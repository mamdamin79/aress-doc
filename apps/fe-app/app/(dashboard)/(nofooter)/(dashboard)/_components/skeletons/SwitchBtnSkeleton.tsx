export function SwitchBtnSkeleton () {
    return (
        <div className="flex flex-col gap-2">
            <div className="skeleton-shimmer w-4 h-14 rounded-2xl" />
            <div className="skeleton-shimmer w-4 h-4 rounded-full" />
        </div>
    )
}