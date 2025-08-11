export function RelationReportSkeleton () {
    return (
        <div className="w-[416px] h-[308px] relative rounded-2xl">
            <div className="w-full h-full skeleton-shimmer rounded-2xl absolute top-0 z-0" />
            <div className="w-[384px] h-[200px] bg-white rounded-2xl absolute z-10 top-4 right-4" />
            <div className="w-[384px] bg-white rounded-2xl mt-4 h-[22px] absolute shadow-none z-10 top-[220px] mr-4" />
            <div className="flex items-center gap-4 my-4 absolute z-10 bottom-0 mr-4">
                <div className="bg-white w-[54px] h-[22px] rounded-2xl" />
                <div className="bg-white w-[94px] h-[22px] rounded-2xl" />
                <div className="bg-white w-[37px] h-[22px] rounded-2xl" />
                <div className="bg-white w-[37px] h-[22px] rounded-2xl" />
            </div>
        </div>
    )
}