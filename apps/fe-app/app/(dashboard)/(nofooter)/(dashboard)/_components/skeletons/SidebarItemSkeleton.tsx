export function SidebarItemSkeleton() {
    return (
        <div>
            <div className="flex items-center justify-between mt-3 mb-[9px]">
                <div className="skeleton-shimmer h-[26px] w-[74px] rounded-2xl" />
                <div className="flex items-center justify-center gap-[47px]">
                    <div className="w-[88px] h-[43px] skeleton-shimmer rounded-2xl" />
                    <div className="skeleton-shimmer w-[41px] h-[22px] rounded-2xl" />
                </div>
            </div>
            <div className="skeleton-shimmer w-full h-[1px] rounded-2xl" />
        </div>
    )
}