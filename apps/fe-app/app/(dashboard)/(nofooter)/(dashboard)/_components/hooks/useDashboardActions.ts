import {
  DashboardDetailsApiModel,
  FinancialReportCalculationApiModel,
  useDashboardsServiceDeleteDashboardsByDashboardIdItemsByDashboardItemId,
  useDashboardsServicePostDashboardsByDashboardIdItemsByDashboardItemIdCalculations,
  useDashboardsServicePostDashboardsByDashboardIdItemsByDashboardItemIdReorder,
  useDashboardsServicePutDashboardsByDashboardId,
} from '@openapi';

const MAX_INITIAL_SLOTS = 4;

interface UseDashboardActionsParams {
  dashboardId: number | null;
  dashboardData?: DashboardDetailsApiModel;
  setSlotsToRender: React.Dispatch<React.SetStateAction<number[]>>;
  setDashboardData: React.Dispatch<
    React.SetStateAction<DashboardDetailsApiModel | undefined>
  >;

  setReportDataMap: React.Dispatch<
    React.SetStateAction<
      Record<
        number,
        {
          data: FinancialReportCalculationApiModel['calculation'];
          filters: FinancialReportCalculationApiModel['filters'];
        }
      >
    >
  >;
  setIsRemoveReportOpen: React.Dispatch<
    React.SetStateAction<{
      open: boolean;
      dashboardName: string;
      dashboardItemID: number;
    }>
  >;
  showToast: (args: {
    message: string;
    type: 'error' | 'warning' | 'success';
  }) => void;
}

export function useDashboardActions({
  dashboardId,
  dashboardData,
  setSlotsToRender,
  setReportDataMap,
  setIsRemoveReportOpen,
  showToast,
  setDashboardData,
}: UseDashboardActionsParams) {
  const { mutateAsync: updateCalculation } =
    useDashboardsServicePostDashboardsByDashboardIdItemsByDashboardItemIdCalculations();

  const { mutate: removeReportMutation } =
    useDashboardsServiceDeleteDashboardsByDashboardIdItemsByDashboardItemId();

  const { mutateAsync: addReportToDashboard } =
    useDashboardsServicePutDashboardsByDashboardId();

  const { mutate: updateOrder } =
    useDashboardsServicePostDashboardsByDashboardIdItemsByDashboardItemIdReorder();

  // Update report filters/calculation
  const handleSubmit = async (
    dashboardItemId: number,
    changedOptions: Record<string, { id: number | string }>,
  ) => {
    if (!dashboardId) return false;

    try {
      const updatedReport = await updateCalculation({
        dashboardId,
        dashboardItemId,
        requestBody: {
          selectedFilters: Object.fromEntries(
            Object.entries(changedOptions).map(([key, { id }]) => [
              key,
              String(id),
            ]),
          ),
        },
      });

      setReportDataMap((prev) => ({
        ...prev,
        [dashboardItemId]: {
          data: updatedReport.report.reportCalculation
            ?.calculation as FinancialReportCalculationApiModel['calculation'],
          filters: updatedReport.report.reportCalculation?.filters ?? [],
        },
      }));

      return true;
    } catch (error) {
      console.error('Error submitting report update', error);
      return false;
    }
  };

  // Remove a report from dashboard
  const handleRemoveReport = (dashboardItemID: number) => {
    if (!dashboardId) return;

    removeReportMutation(
      {
        dashboardId,
        dashboardItemId: dashboardItemID,
      },
      {
        onSuccess: () => {
          setIsRemoveReportOpen({
            open: false,
            dashboardName: '',
            dashboardItemID: 0,
          });

          setReportDataMap((prev) => {
            const newMap = { ...prev };
            delete newMap[dashboardItemID];
            return newMap;
          });

          if (dashboardData) {
            // It's better if dashboardData.items is managed outside and passed in as state
            // Here, just update slotsToRender accordingly

            setSlotsToRender((prev) => {
              const removedOrder = dashboardData.items?.find(
                (item) => item.identifier === dashboardItemID,
              )?.order;
              if (removedOrder === undefined) return prev;
              return prev.filter((order) => order !== removedOrder);
            });
          }
        },
      },
    );
  };

  // Add a new report to dashboard
  const handleAddNewReport = async (
    identifier: string,
    activeReportPlacementOrder: string | null,
    options: Record<string, { id: number | string }>,
  ) => {
    if (!dashboardId) return;

    try {
      const newlyAddedItem = await addReportToDashboard({
        dashboardId,
        requestBody: {
          order: Number(
            activeReportPlacementOrder?.replace('slot-', '') ?? '0',
          ),
          reportIdentifier: identifier,
          selectedFilters: Object.fromEntries(
            Object.entries(options).map(([key, { id }]) => [key, String(id)]),
          ),
        },
      });

      if (!newlyAddedItem?.report) return;

      setReportDataMap((prev) => ({
        ...prev,
        [newlyAddedItem.identifier]: {
          data: newlyAddedItem.report?.reportCalculation
            ?.calculation as FinancialReportCalculationApiModel['calculation'],
          filters: newlyAddedItem.report.reportCalculation?.filters ?? [],
        },
      }));

      if (dashboardData) {
        const newItems = [...(dashboardData.items ?? []), newlyAddedItem];

        setDashboardData({
          ...dashboardData,
          items: newItems,
        });

        const currentOrders = newItems.map((item) => item.order);
        const maxOrder = Math.max(...currentOrders, MAX_INITIAL_SLOTS - 1);

        setSlotsToRender((prev) => {
          const neededSlots: number[] = [];
          for (let i = 0; i <= maxOrder; i++) {
            if (!prev.includes(i)) {
              neededSlots.push(i);
            }
          }

          return [...prev, ...neededSlots].sort((a, b) => a - b);
        });
      }
    } catch (error) {
      console.error('Error adding new report', error);
      showToast({
        message: 'خطا در افزودن گزارش جدید',
        type: 'error',
      });
    }
  };

  // Handle drag and reorder reports
  const handleDragEnd = (event: {
    active: { id: string };
    over: { id: string } | null;
  }) => {
    if (!dashboardData || !dashboardId) return;

    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const from = parseInt(active.id.replace('slot-', ''), 10);
    const to = parseInt(over.id.replace('slot-', ''), 10);

    const fromReport = dashboardData.items?.find((r) => r.order === from);
    const toReport = dashboardData.items?.find((r) => r.order === to);

    if (!fromReport) return;

    const updatedItems = dashboardData.items?.map((item) => {
      if (item.identifier === fromReport.identifier) {
        return { ...item, order: to };
      }
      if (toReport && item.identifier === toReport.identifier) {
        return { ...item, order: from };
      }
      return item;
    });

    if (!updatedItems) return;

    // Send update requests for changed orders
    const changedReports = updatedItems.filter((updated) => {
      const original = dashboardData.items?.find(
        (originalItem) => originalItem.identifier === updated.identifier,
      );
      return original?.order !== updated.order;
    });

    changedReports.forEach((changedReport) => {
      updateOrder({
        dashboardId,
        dashboardItemId: changedReport.identifier,
        requestBody: {
          order: changedReport.order,
        },
      });
    });

    // Update slot render order visually (caller hook/component should handle this)
    return {
      updatedSlotsToRender: (prev: number[]) => {
        const fromIdx = prev.indexOf(from);
        const toIdx = prev.indexOf(to);
        if (fromIdx === -1 || toIdx === -1) return prev;
        const newSlots = [...prev];
        const temp = newSlots[fromIdx];
        newSlots[fromIdx] = newSlots[toIdx];
        newSlots[toIdx] = temp;
        return newSlots;
      },
    };
  };

  return {
    handleSubmit,
    handleRemoveReport,
    handleAddNewReport,
    handleDragEnd,
  };
}
