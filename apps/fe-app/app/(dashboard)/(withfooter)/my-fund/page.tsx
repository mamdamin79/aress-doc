import { Breadcrumb, FundsLogo } from 'design-system';
import { AddRemoveToWatchList } from './_components/AddRemoveToWatchList';
import { FundsService, OpenAPI } from '@openapi';
import { cookies } from 'next/headers';
import { FundTabs } from './_components/FundsTab';

export default async function FundPage() {
  const fundId = 283;
  const cookieStore = await cookies();

  OpenAPI.TOKEN = cookieStore.get('access_token')?.value;
  const {
    fundBasicInfo,
    fundSummaryBasicInfo,
    fundSummaryCaseByCase,
    fundVideoPlaylist,
  } = await FundsService.getFundsStockByFundIdSummary({
    fundId,
  });
  const baseURL = process.env.NEXT_PUBLIC_API_URL ?? '';

  console.log(fundVideoPlaylist);

  return (
    <div>
      <div className="mb-7 mr-8 mt-3">
        <Breadcrumb
          items={[
            { icon: 'home' },
            { title: 'صندوق من' },
            { title: `${fundBasicInfo.name}` },
          ]}
        />
      </div>
      <div className="mx-auto max-w-[1680px] px-8 lg:px-20">
        <div className="mb-6 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-0">
          <div className="flex items-center justify-start gap-2">
            <FundsLogo
              color="green"
              src={
                fundBasicInfo.logoThumbnail
                  ? baseURL + fundBasicInfo.logoThumbnail
                  : ''
              }
              hasTag={true}
              size="md"
            />
            <div className="text-text-neutral-primary text-xl font-semibold">
              {fundBasicInfo.name}
            </div>
          </div>
          <AddRemoveToWatchList
            fundId={fundId}
            isInWatchListInitialValue={fundBasicInfo.isWatched}
          />
        </div>
        {/* <Tabs
          activeTab={activeTab}
          onClickTab={(newTabId) => {
            setActiveTab(newTabId);
            console.log('clicked tab id:', newTabId);
          }}
          variant="lined"
          fullWidthDivider={true}
          tabs={[
            {
              title: 'خلاصه',
              id: '0',
              content: (
                <Summary
                  points={[
                    { date: '2025-06-28', value: 307887847 },
                    { date: '2025-06-29', value: 304052816 },
                    { date: '2025-06-30', value: 871942192 },
                    { date: '2025-07-01', value: 117202326 },
                    { date: '2025-07-02', value: 242103982 },
                    { date: '2025-07-03', value: 106557394 },
                    { date: '2025-07-04', value: 699881399 },
                    { date: '2025-07-05', value: 956679485 },
                    { date: '2025-07-06', value: 733212929 },
                    { date: '2025-07-07', value: 588485694 },
                  ]}
                  defaultQuantity={560000000}
                  defaultValueChange={100000}
                  defaultPercentageChange={5.3}
                />
              ),
            },
            { title: 'تحلیل بازدهی', id: '1', content: <RiskAssessment /> },
            { title: 'ارزیابی ریسک', id: '2', content: <ReturnAnalysis /> },
          ]}
        /> */}
        <FundTabs
          summary={{
            points: fundSummaryCaseByCase!.navHistory.map((item) => ({
              date: item.jdt,
              value: item.revokeNavRials,
            })),
            defaultQuantity: fundSummaryCaseByCase!.navEndOfPeriodRials,
            defaultValueChange: fundSummaryCaseByCase!.returnEndOfPeriodRials,
            defaultPercentageChange:
              fundSummaryCaseByCase!.returnEndOfPeriodPercent,
            fundSummaryBasicInfo: fundSummaryBasicInfo!,
            fundSummaryCaseByCase: fundSummaryCaseByCase!,
            fundVideoPlaylist: fundVideoPlaylist!,
          }}
        />
      </div>
    </div>
  );
}
