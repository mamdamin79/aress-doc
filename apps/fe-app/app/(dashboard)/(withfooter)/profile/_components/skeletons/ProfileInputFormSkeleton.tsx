export function ProfileInputFormSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      <div className="skeleton-shimmer h-[22px] w-[70px] rounded-2xl" />
      <div className="skeleton-shimmer h-14 w-full rounded-xl" />
    </div>
  );
}
