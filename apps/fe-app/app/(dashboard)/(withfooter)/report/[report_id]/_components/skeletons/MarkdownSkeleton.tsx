export function MarkdownSkeleton() {
  return (
    <div className="w-full">
      <div className="skeleton-shimmer h-9 w-[148px] rounded-2xl" />
      <div className="skeleton-shimmer mb-2 mt-4 h-[30px] w-full rounded-2xl" />
      <div className="skeleton-shimmer h-[30px] w-[335px] rounded-2xl" />
    </div>
  );
}
