export function SidebarSkeleton({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-border-neutral-secondary 3xl:block 3xl:w-[380px] h-[970px] w-[296px] rounded-2xl border-2 p-4">
      <div className="skeleton-shimmer h-[46px] w-full rounded-2xl" />
      <div className="mt-2 flex w-full items-center justify-between">
        <div className="skeleton-shimmer h-[34px] w-[127px] rounded-2xl" />
        <div className="skeleton-shimmer h-[34px] w-[76px] rounded-2xl" />
      </div>
      <div className="skeleton-shimmer mt-3 h-0.5 w-full" />
      <div className="mt-2 flex w-full items-center justify-between">
        <div className="skeleton-shimmer h-[22px] w-[167px] rounded-2xl" />
        <div className="skeleton-shimmer h-[22px] w-[88px] rounded-2xl" />
        <div className="skeleton-shimmer h-[22px] w-[88px] rounded-2xl" />
      </div>
      {children}
    </div>
  );
}
