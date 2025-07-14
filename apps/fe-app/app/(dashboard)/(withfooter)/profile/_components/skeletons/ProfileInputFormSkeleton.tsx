export function ProfileInputFormSkeleton () {
    return (
        <div className="flex flex-col gap-2">
            <div className="skeleton-shimmer rounded-2xl w-[70px] h-[22px]" />
            <div className="skeleton-shimmer rounded-xl w-full h-14" />
        </div>
    )
}