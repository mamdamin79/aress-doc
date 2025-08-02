export function SwitchBtnSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      <div className="skeleton-shimmer h-14 w-4 rounded-2xl" />
      <div className="skeleton-shimmer h-4 w-4 rounded-full" />
    </div>
  );
}
