import { ReportTitleSettingSkeleton } from './_components/skeletons/ReportTitleSettingSkeleton';
import { ReportTitleSectinoSkeleton } from './_components/skeletons/ReportTitleSectionSkeleton';
import { ReportTabSkeleton } from './_components/skeletons/ReportTabSkeleton';
import { SectionTitleSkeleton } from './_components/skeletons/SectionTitleSkeleton';
import { VideoPlayerSkeleton } from './_components/skeletons/VideoPlayerSkeleton';
import { MarkdownSkeleton } from './_components/skeletons/MarkdownSkeleton';
import { RelationReportSkeleton } from './_components/skeletons/RelationReportSkeleton';
import { ReportSectionSkeleton } from './_components/skeletons/ReportSectionSkeleton';

export default function loading() {
  return (
    <div className="max-w-[1680px]">
      <div className="mb-16 flex w-full flex-col-reverse items-center gap-8 px-20 pt-6 xl:flex-row xl:items-start xl:justify-around">
        <div className="flex w-full flex-col gap-6">
          <ReportSectionSkeleton />
          <ReportTitleSettingSkeleton />
        </div>
        <ReportTitleSectinoSkeleton />
      </div>
      <ReportTabSkeleton />
      <div className="mt-10 flex w-full justify-center">
        <SectionTitleSkeleton />
      </div>
      <div className="flex w-full flex-col items-center px-20" id="0">
        <div className="mt-10">
          <VideoPlayerSkeleton />
        </div>
      </div>
      <div className="relative flex flex-col items-center justify-center overflow-hidden px-4 pt-[112px] sm:px-10 md:px-20">
        <SectionTitleSkeleton />
        <div className="mt-2 flex w-full flex-col text-right">
          <div className="flex flex-col gap-[100px]">
            <MarkdownSkeleton />
            <MarkdownSkeleton />
            <MarkdownSkeleton />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-12 pb-20 pt-[112px]" id="2">
        <SectionTitleSkeleton />
        <div className="flex items-center justify-center gap-3 px-10">
          <RelationReportSkeleton />
          <RelationReportSkeleton />
          <RelationReportSkeleton />
        </div>
      </div>
    </div>
  );
}
