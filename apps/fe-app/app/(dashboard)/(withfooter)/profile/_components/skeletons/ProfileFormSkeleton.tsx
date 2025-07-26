import { ProfileInputFormSkeleton } from "./ProfileInputFormSkeleton";

export function ProfileFormSkeleton () {
    return (
        <div className="w-full flex justify-center max-w-[1032px] flex-col gap-12">
            <div className="w-32 h-32 skeleton-shimmer rounded-full mx-auto" />
            <div className="grid grid-cols-2 grid-rows-3 gap-6">
                <ProfileInputFormSkeleton />
                <ProfileInputFormSkeleton />
                <ProfileInputFormSkeleton />
                <ProfileInputFormSkeleton />
                <ProfileInputFormSkeleton />
            </div>
            <div className="w-[152px] h-12 skeleton-shimmer rounded-lg" />
        </div>
    )
}