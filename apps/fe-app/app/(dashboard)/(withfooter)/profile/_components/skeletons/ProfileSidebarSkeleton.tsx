export function ProfileSidebarSkeleton() {
  return (
    <div className="border-border-neutral-tertiary h-[213px] w-[264px] rounded-2xl border-2 p-4">
      <div className="flex items-center gap-3">
        <div className="skeleton-shimmer h-12 w-12 rounded-2xl" />
        <div className="flex flex-col gap-3">
          <div className="skeleton-shimmer h-6 w-[105px] rounded-2xl" />
          <div className="skeleton-shimmer h-5 w-[82px] rounded-2xl" />
        </div>
      </div>
      <div className="skeleton-shimmer my-4 h-[1px] w-full" />
      <div className="skeleton-shimmer h-9 w-[232px] rounded-sm" />
      <div className="skeleton-shimmer mb-3 mt-2 h-9 w-[232px] rounded-sm" />
    </div>
  );
}
