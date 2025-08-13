'use client';

import React, { useState, useMemo } from 'react';
import {
  BarStickyBtn,
  MyFundsTable,
  Piechart,
  TradePopup,
} from '../../../../components';
import { cn, Icon, OptionsDropdown, Tabs } from 'design-system';
import { LineChart } from '../../../../components/Charts/LineChart';
import { AssetInfoBox } from '../../../../components/AssetInfoBox';
import { EmptyPortfolioModal } from './EmptyPortfolioModal';
import {
  categoryFundsData,
  detailedFundsData,
  type FundData,
} from './data/fundsData';

interface HoverData {
  date: string;
  value: number;
}

interface MyPortfolioPageProps {
  points: {
    date: string;
    value: number;
  }[];
  defaultQuantity: number;
  defaultValueChange: number;
  defaultPercentageChange: number;
}

export const MyPortfolioPage: React.FC<MyPortfolioPageProps> = ({
  points,
  defaultQuantity,
  defaultValueChange,
  defaultPercentageChange,
}) => {
  // Chart state
  const [hoveredData, setHoveredData] = useState<HoverData | null>(null);
  const [hiddenContent, setHiddenContent] = useState(false);

  // Tabs state
  const [chartActiveTab, setChartActiveTab] = useState(0);
  const [fundsActiveTab, setFundsActiveTab] = useState(0);

  // Fund selection state
  const [selectedFundType, setSelectedFundType] = useState<number | null>(null);
  const [isDetailView, setIsDetailView] = useState(false);
  const [selectedFund, setSelectedFund] = useState<FundData | null>(null);

  // Modal state
  const [showEmptyModal, setShowEmptyModal] = useState(false);
  const [emptyCategory, setEmptyCategory] = useState<number | null>(null);

  // Trade popup state
  const [showTradePopup, setShowTradePopup] = useState(false);
  const [tradeMode, setTradeMode] = useState<'buy' | 'sell'>('buy');

  // Check if selected category has no funds
  const checkCategoryEmpty = (typeID: number) => {
    const categoryFunds = detailedFundsData[typeID] || [];
    return categoryFunds.every((fund) => fund.userInvestValue === 0);
  };

  // Chart handlers
  const handleChartHover = (data: HoverData | null) => {
    setHoveredData(data);
  };

  const handleToggleHiddenContent = () => {
    setHiddenContent(!hiddenContent);
  };

  // Fund selection handlers
  const handleCategoryClick = (fund: FundData) => {
    if (!isDetailView) {
      // Check if this category has any funds
      if (checkCategoryEmpty(fund.typeID)) {
        setEmptyCategory(fund.typeID);
        setShowEmptyModal(true);
        return;
      }

      setSelectedFundType(fund.typeID);
      setIsDetailView(true);
    }
  };

  const handleFundSelect = (fund: FundData) => {
    setSelectedFund(fund);
  };

  const handleBackClick = () => {
    setIsDetailView(false);
    setSelectedFundType(null);
    setSelectedFund(null);
  };

  // Modal handlers
  const handleCloseModal = () => {
    setShowEmptyModal(false);
    setEmptyCategory(null);
  };

  const handleBuyFunds = () => {
    // Navigate to funds purchase page or trigger purchase flow
    console.log('Navigate to funds purchase page');
    // You can add actual navigation logic here
  };

  // Fund type mappings for badges
  const fundTypeMaps: Record<number, { title: string; theme: string }> = {
    0: {
      title: 'سهامی',
      theme: 'green',
    },
    1: {
      title: 'درآمد ثابت',
      theme: 'blue',
    },
    2: {
      title: 'مختلط',
      theme: 'purple',
    },
    3: {
      title: 'کالایی',
      theme: 'yellow',
    },
  };

  // Trade popup handlers
  const handleBuyClick = () => {
    setTradeMode('buy');
    setShowTradePopup(true);
  };

  const handleSellClick = () => {
    setTradeMode('sell');
    setShowTradePopup(true);
  };

  const handleTradeClose = () => {
    setShowTradePopup(false);
  };

  // Fund link handler
  const handleFundLinkClick = (fund: FundData) => {
    // Navigate to fund details page - you can implement actual navigation logic here
    console.log('Navigate to fund details:', fund.name, fund.code);
    // Example: router.push(`/funds/${fund.code}`)
  };

  // Computed values
  const displayQuantity = hoveredData ? hoveredData.value : defaultQuantity;
  const displayValueChange = defaultValueChange;
  const displayPercentageChange = defaultPercentageChange;

  const currentFundsData =
    isDetailView && selectedFundType !== null
      ? detailedFundsData[selectedFundType] || []
      : categoryFundsData;

  // Dynamic pie chart data based on current view
  const currentPieChartData = useMemo(() => {
    if (isDetailView && selectedFundType !== null) {
      // Show individual funds in the selected category
      const categoryFunds = detailedFundsData[selectedFundType] || [];
      return categoryFunds
        .filter((fund) => fund.dailyValue > 0) // Only show funds with value
        .map((fund) => ({
          name: fund.name || 'نامشخص',
          value: fund.dailyValue,
        }));
    } else {
      // Show category-level data
      return categoryFundsData
        .filter((fund) => fund.dailyValue > 0) // Only show categories with value
        .map((fund) => {
          const categoryNames: Record<number, string> = {
            0: 'سهامی',
            1: 'درآمد ثابت',
            2: 'مختلط',
            3: 'کالایی',
          };
          return {
            name: categoryNames[fund.typeID] || 'نامشخص',
            value: fund.dailyValue,
          };
        });
    }
  }, [isDetailView, selectedFundType]);

  // Check if pie chart should show empty state
  const isPieChartEmpty =
    currentPieChartData.length === 0 ||
    currentPieChartData.every((item) => item.value === 0);

  return (
    <>
      <div className="text-text-neutral-primary relative flex w-full max-w-[1680px] flex-col gap-1 px-8 pt-6 lg:px-20">
        <div className="flex flex-col gap-4 pb-12">
          <h1 className="w-full text-right text-xl font-semibold">دارایی من</h1>

          {/* Chart Section */}
          <div className="flex flex-col items-center gap-6">
            <div className="flex h-[66px] w-full items-start justify-end gap-3">
              <div className="pt-1">
                <OptionsDropdown
                  initialSelectedIndex={0}
                  dropDownList={[
                    {
                      text: 'ارزش کل دارایی',
                    },
                    {
                      text: 'ارزش دارایی درآمد ثابت',
                    },
                    {
                      text: 'ارزش دارایی سهامی',
                    },
                    {
                      text: 'ارزش دارایی مختلط',
                    },
                    {
                      text: 'ارزش دارایی کالایی',
                    },
                  ]}
                  dropDownStyles={{
                    anchor: 'bottom',
                    emphasize: 'medium',
                    size: 'md',
                  }}
                />
              </div>

              <AssetInfoBox
                hiddenContent={hiddenContent}
                onToggleHiddenContent={handleToggleHiddenContent}
                quantity={displayQuantity}
                valueChange={displayValueChange}
                percentageChange={displayPercentageChange}
              />
            </div>
            <LineChart
              points={points}
              onHover={handleChartHover}
              hiddenContent={hiddenContent}
            />
          </div>

          {/* Chart Tabs */}
          <div className="flex w-full flex-col items-center justify-center gap-12">
            <Tabs
              tabs={[
                { id: 'one_month', title: 'یک ماهه' },
                { id: 'three_month', title: 'سه ماهه' },
                { id: 'six_month', title: 'شش ماهه' },
                { id: 'nine_month', title: 'نه ماهه' },
                { id: 'one_year', title: 'یک ساله' },
              ]}
              variant="sliding"
              activeTab={chartActiveTab}
              onClickTab={setChartActiveTab}
            />
            <div className="border-border-neutral-primary w-full border border-dashed"></div>
          </div>
        </div>

        {/* Funds Summary Section */}
        <div className="flex w-full flex-col gap-6">
          <div className="text-xl font-medium">خلاصه دارایی</div>

          {/* Funds Table and Chart */}
          <div className="flex max-w-full flex-row gap-8">
            <div className="flex w-full flex-col items-end gap-5">
              <div className="flex w-full flex-row justify-between">
                {/* Header with back button and tabs */}
                <div className="flex flex-row items-center justify-between gap-8">
                  {isDetailView ? (
                    <div
                      className="text-md hover:text-text-brand-primary-600 flex cursor-pointer items-center gap-2 font-medium transition-colors"
                      onClick={handleBackClick}
                    >
                      <Icon name="chevron-right" size="lg" />
                      <span>بازگشت</span>
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>
                <Tabs
                  className="pt-2"
                  tabs={[
                    { id: 'rial', title: 'ریال' },
                    { id: 'toman', title: 'تومان' },
                  ]}
                  variant="sliding"
                  activeTab={fundsActiveTab}
                  onClickTab={setFundsActiveTab}
                />
              </div>

              <MyFundsTable
                hiddenContent={hiddenContent}
                data={currentFundsData}
                onRowClick={handleCategoryClick}
                onFundSelect={handleFundSelect}
                onFundLinkClick={handleFundLinkClick}
                isDetailView={isDetailView}
              />
            </div>

            <div className="hidden w-[300px] items-center justify-center xl:flex">
              <div className="flex flex-col items-start gap-5">
                <div className="-mt-14 hidden flex-row items-center xl:flex">
                  <span
                    className={cn(
                      isDetailView &&
                        'text-text-neutral-secondary transition-colors',
                    )}
                  >
                    وزن دارایی
                  </span>
                  <div className="relative overflow-hidden">
                    <div
                      className={`mr-1 flex items-center gap-1 transition-all duration-300 ease-in-out ${
                        isDetailView
                          ? 'translate-x-0 opacity-100'
                          : 'translate-x-4 opacity-0'
                      }`}
                    >
                      <div className="text-text-neutral-secondary">
                        <Icon name={'chevron-left'} />
                      </div>
                      <span>وزن صندوق سهامی</span>
                    </div>
                  </div>
                </div>
                <div className="mt-24">
                  <Piechart
                    data={currentPieChartData}
                    state={isPieChartEmpty ? 'empty' : 'default'}
                    showValues={!hiddenContent}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Button */}
        <div className="sticky -bottom-7 z-50 flex justify-center pb-[52px] pt-8">
          <BarStickyBtn
            title={
              selectedFund?.name
                ? selectedFund.name
                : 'یک صندوق برای سرمایه‌گذاری انتخاب کنید'
            }
            fundSelected={selectedFund !== null}
            sellAble={selectedFund?.sellable || false}
            fundLogo={selectedFund?.logo}
            onBuyClick={handleBuyClick}
            onSellClick={handleSellClick}
          />
        </div>
      </div>

      {/* Empty Portfolio Modal */}
      <EmptyPortfolioModal
        isOpen={showEmptyModal}
        onClose={handleCloseModal}
        onBuyFunds={handleBuyFunds}
        categoryType={emptyCategory}
      />

      {/* Trade Popup */}
      <TradePopup
        isOpen={showTradePopup}
        onClose={handleTradeClose}
        mode={tradeMode}
        fundName={selectedFund?.name || 'صندوق انتخاب شده'}
        badge={{
          title:
            selectedFund?.typeID !== undefined
              ? fundTypeMaps[selectedFund.typeID].title
              : 'سهامی',
          theme:
            selectedFund?.typeID !== undefined
              ? (fundTypeMaps[selectedFund.typeID].theme as
                  | 'green'
                  | 'disabled'
                  | 'blue'
                  | 'purple'
                  | 'yellow'
                  | 'red')
              : 'green',
        }}
        estismatedBuyPrice={selectedFund?.dailyValue || 0}
        estismatedUnit={selectedFund?.fundWeight || 0}
      />
    </>
  );
};
