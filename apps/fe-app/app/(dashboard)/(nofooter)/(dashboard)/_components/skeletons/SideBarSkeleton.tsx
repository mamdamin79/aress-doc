export function SidebarSkeleton ({children}: {children: React.ReactNode}) {
    return (
        <div className="w-[375px] h-[970px] border-2 rounded-2xl p-4 border-border-neutral-secondary">
            <div className="w-full h-[46px] rounded-2xl skeleton-shimmer" />
            <div className="flex justify-between w-full items-center mt-2">
                <div className="w-[127px] h-[34px] skeleton-shimmer rounded-2xl" />
                <div className="w-[76px] h-[34px] skeleton-shimmer rounded-2xl" />
            </div>
            <div className="w-full h-0.5 mt-3 skeleton-shimmer" />
            <div className="flex justify-between items-center w-full mt-2">
                <div className="skeleton-shimmer rounded-2xl h-[22px] w-[167px]" />
                <div className="skeleton-shimmer rounded-2xl h-[22px] w-[88px]" />
                <div className="skeleton-shimmer rounded-2xl h-[22px] w-[88px]" />
            </div>
            {children}
        </div>
    )
}