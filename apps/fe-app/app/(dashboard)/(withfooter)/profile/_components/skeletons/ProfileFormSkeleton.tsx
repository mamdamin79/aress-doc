import { ProfileInputFormSkeleton } from './ProfileInputFormSkeleton';

export function ProfileFormSkeleton() {
  return (
    <div className="flex w-full max-w-[1032px] flex-col justify-center gap-12">
      <div className="skeleton-shimmer mx-auto h-32 w-32 rounded-full" />
      <div className="grid grid-cols-2 grid-rows-3 gap-6">
        <ProfileInputFormSkeleton />
        <ProfileInputFormSkeleton />
        <ProfileInputFormSkeleton />
        <ProfileInputFormSkeleton />
        <ProfileInputFormSkeleton />
      </div>
      <div className="skeleton-shimmer h-12 w-[152px] rounded-lg" />
    </div>
  );
}
