'use client';

import {
  useFundsServiceGetFunds,
  useFundsServicePostFundsStockByFundIdReturnAnalysisRiskReturnAnalysis,
} from '@openapi';
import {
  Button,
  OptionsListExplorer,
  Dialog,
  SelectionChips,
  OptionItem,
  useCustomToast,
  Checkbox,
  ChipItem,
} from 'design-system';
import React, { useMemo, useState } from 'react';

interface ChangeComparisonFundsProps {
  onDataUpdate: React.Dispatch<
    React.SetStateAction<
      | {
          x: number;
          y: number;
          z: number;
          name: string;
          nav: string;
        }[]
      | undefined
    >
  >;

  selectedFunds: ChipItem[];
}

export const ChangeComparisonFunds: React.FC<ChangeComparisonFundsProps> = ({
  onDataUpdate,
  selectedFunds,
}) => {
  const [isOpenChangeComparisonFunds, setIsOpenChangeComparisonFunds] =
    useState(false);
  const { data, isLoading } = useFundsServiceGetFunds();
  const { showToast } = useCustomToast();
  const [selectedChips, setSelectedChips] = useState<ChipItem[]>(selectedFunds);

  const { mutate } =
    useFundsServicePostFundsStockByFundIdReturnAnalysisRiskReturnAnalysis({
      onSuccess: (res) => {
        showToast({
          message: 'تغییرات با موفقیت اعمال شد',
          type: 'success',
        });
        const bubbleData = res?.chartItems?.map((item) => ({
          x: item.risk,
          y: item.returnPercent,
          z: item.netAssetsRials / 1e9,
          name: item.abbreviatedName,
          nav: (item.netAssetsRials / 1e9).toFixed(0),
        }));
        onDataUpdate?.(bubbleData);
        setIsOpenChangeComparisonFunds(false);
      },
      onError: () => {
        showToast({
          message: 'خطا در ارسال تغییرات',
          type: 'error',
        });
      },
    });

  const mappedItems = useMemo(() => {
    if (!data) return { categories: [], items: [] };

    const categories = [
      { id: 1, title: 'همه' },
      ...Array.from(
        new Map(
          data.map((fund) => [fund.fundType.identifier, fund.fundType.title]),
        ).entries(),
      ).map(([id, title]) => ({
        id,
        title,
      })),
    ];

    const items: OptionItem[] = data.map((fund) => ({
      id: String(fund.identifier), // 👈 تبدیل به string
      title: fund.name,
      categoryId: fund.fundType.identifier, // 👈 تبدیل به string
      type: fund.fundType.title,
      priceRials: Math.floor(Math.random() * (500000 - 100000) + 100000),
      priceChangePercent: parseFloat((Math.random() * 10 - 5).toFixed(2)),
    }));

    return { categories, items };
  }, [data]);

  return (
    <>
      <Button
        mode="secondary"
        onClick={() => setIsOpenChangeComparisonFunds(true)}
        size="sm"
        className="mb-4 w-[151px]"
        iconRight={{ name: 'pencil', size: 'md' }}
      >
        تغییر صندوق ها
      </Button>
      <Dialog
        className="bg-surface-neutral-secondary w-[852px] rounded-3xl text-right"
        isOpen={isOpenChangeComparisonFunds}
        showCloseBtn={true}
        onClose={() => setIsOpenChangeComparisonFunds(false)}
      >
        <div className="text-text-neutral-primary mb-4 text-right text-xl font-medium">
          تغییر صندوق‌های مقایسه
        </div>
        <div className="text-text-neutral-primary mb-2 text-sm font-medium">
          صندوق های انتخاب شده ({selectedChips.length}/10)
        </div>
        <div className="text-text-neutral-tertiary text-md bg-surface-neutral-primary mb-2 w-full rounded-2xl p-4 font-normal">
          {selectedChips.length === 0 ? (
            'صندوق‌های دلخواه خود را از لیست زیر انتخاب کنید یا نام آن‌ها را جست‌وجو کنید...'
          ) : (
            <SelectionChips
              variant="input"
              items={selectedChips}
              onItemRemove={(id) => {
                setSelectedChips((prev) =>
                  prev.filter((c) => c.id !== String(id)),
                );
              }}
            />
          )}
        </div>
        <div className="mb-2">
          {isLoading ? (
            <p>در حال بارگذاری...</p>
          ) : (
            <OptionsListExplorer
              selectedIds={selectedChips.map((chip) => chip.id)}
              multiple={true}
              inputSize="default"
              inputClasses="rounded-t-none rounded-b-none border-r-0 border-t-0 border-l-0 focus:border-r-0  focus:border-t-0  focus:border-l-0 transition-none duration-0 focus:border-b focus:border-b-border-neutral-primary "
              fullWidthTextField={true}
              className="border-border-neutral-primary overflow-hidden rounded-2xl border"
              searchable
              search={{ placeholder: 'نام صندوق رو وارد کنید...' }}
              items={mappedItems}
              onChange={(selected) => {
                const chips = (selected as OptionItem[]).map((item) => ({
                  id: `${item.id}`,
                  label: item.title,
                  removable: true,
                }));
                setSelectedChips(chips);
              }}
            />
          )}
        </div>
        <div className="bg-surface-neutral-primary flex items-center justify-center rounded-xl px-6 py-4">
          <Checkbox
            onChange={() => console.log('checked')}
            checked={true}
            content="موارد انتخاب شده ذخیره شود"
          />
          <Button
            className="w-[107px] text-nowrap"
            mode="primary"
            disabled={isLoading}
            size="sm"
            onClick={() => {
              if (selectedChips.length === 0) {
                showToast({ message: 'هیچ صندوقی انتخاب نشده', type: 'error' });
                return;
              }

              const comparedFundIds = selectedChips.map((chip) =>
                Number(chip.id),
              );

              mutate({
                fundId: 283,
                requestBody: {
                  riskCriteria: 1,
                  calculationPeriod: 1,
                  calculationCustomPeriodStartJdate: null,
                  calculationCustomPeriodEndJdate: null,
                  comparedFundIds,
                },
              });
            }}
          >
            اعمال تغییرات
          </Button>
        </div>
      </Dialog>
    </>
  );
};
