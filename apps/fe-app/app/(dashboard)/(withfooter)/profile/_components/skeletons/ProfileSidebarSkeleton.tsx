export function ProfileSidebarSkeleton () {
    return (
        <div className="border-2 rounded-2xl w-[264px] h-[213px] border-border-neutral-tertiary p-4">
            <div className="flex items-center gap-3">
                <div className="rounded-2xl w-12 h-12 skeleton-shimmer" />
                <div className="flex flex-col gap-3">
                    <div className="skeleton-shimmer rounded-2xl w-[105px] h-6" />
                    <div className="skeleton-shimmer rounded-2xl w-[82px] h-5" />
                </div>
            </div>
            <div className="w-full h-[1px] skeleton-shimmer my-4" />
            <div className="skeleton-shimmer h-9 w-[232px] rounded-sm" />
            <div className="skeleton-shimmer h-9 w-[232px] rounded-sm mt-2 mb-3" />
        </div>
    )
}