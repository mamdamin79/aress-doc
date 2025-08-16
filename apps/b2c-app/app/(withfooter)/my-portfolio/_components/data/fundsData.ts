/**
 * DEMO SWITCHING GUIDE:
 * ====================
 *
 * To switch between full and empty states, change lines 383-384:
 *
 * FOR FULL STATE (with data):
 * export const categoryFundsData = fullCategoryFundsData;
 * export const detailedFundsData = fullDetailedFundsData;
 *
 * FOR EMPTY STATE (all zeros):
 * export const categoryFundsData = emptyCategoryFundsData;
 * export const detailedFundsData = emptyDetailedFundsData;
 */

export interface FundData {
  typeID: number;
  dailyValue: number;
  userInvestValue: number;
  profitLoss: number;
  profitLossPercentage: number;
  fundWeight: number;
  fundWeightPercentage: number;
  isStock?: boolean;
  name?: string; // For individual funds
  code?: string; // Fund code for individual funds
  sellable?: boolean; // Whether the fund can be sold
  logo?: string; // Fund logo URL
}

// DEMO DATA CONFIGURATIONS
// =========================

// Full state - with actual fund values
export const fullCategoryFundsData: FundData[] = [
  {
    typeID: 1, // درآمد ثابت
    dailyValue: 156785000,
    userInvestValue: 150000000,
    profitLoss: 6785000,
    profitLossPercentage: 4.52,
    fundWeight: 3,
    fundWeightPercentage: 42.5,
  },
  {
    typeID: 0, // سهامی
    dailyValue: 89450000,
    userInvestValue: 95000000,
    profitLoss: -5550000,
    profitLossPercentage: -5.84,
    fundWeight: 2,
    fundWeightPercentage: 24.3,
  },
  {
    typeID: 2, // مختلط
    dailyValue: 73920000,
    userInvestValue: 70000000,
    profitLoss: 3920000,
    profitLossPercentage: 5.6,
    fundWeight: 4,
    fundWeightPercentage: 20.1,
  },
  {
    typeID: 3, // کالایی
    dailyValue: 48150000,
    userInvestValue: 45000000,
    profitLoss: 3150000,
    profitLossPercentage: 7.0,
    fundWeight: 1,
    fundWeightPercentage: 13.1,
  },
];

// Empty state - all zeros
export const emptyCategoryFundsData: FundData[] = [
  {
    typeID: 1, // درآمد ثابت
    dailyValue: 0,
    userInvestValue: 0,
    profitLoss: 0,
    profitLossPercentage: 0,
    fundWeight: 0,
    fundWeightPercentage: 0,
  },
  {
    typeID: 0, // سهامی
    dailyValue: 0,
    userInvestValue: 0,
    profitLoss: 0,
    profitLossPercentage: 0,
    fundWeight: 0,
    fundWeightPercentage: 0,
  },
  {
    typeID: 2, // مختلط
    dailyValue: 0,
    userInvestValue: 0,
    profitLoss: 0,
    profitLossPercentage: 0,
    fundWeight: 0,
    fundWeightPercentage: 0,
  },
  {
    typeID: 3, // کالایی
    dailyValue: 0,
    userInvestValue: 0,
    profitLoss: 0,
    profitLossPercentage: 0,
    fundWeight: 0,
    fundWeightPercentage: 0,
  },
];

// Full detailed fund data
export const fullDetailedFundsData: Record<number, FundData[]> = {
  // سهامی funds (typeID: 0)
  0: [
    {
      typeID: 0,
      name: 'صندوق سهامی فولاد',
      code: 'STEEL001',
      dailyValue: 45200000,
      userInvestValue: 48000000,
      profitLoss: -2800000,
      profitLossPercentage: -5.83,
      fundWeight: 1,
      fundWeightPercentage: 50.5,
      isStock: true,
      sellable: true,
    },
    {
      typeID: 0,
      name: 'صندوق سهامی پتروشیمی',
      code: 'PETRO001',
      dailyValue: 44250000,
      userInvestValue: 47000000,
      profitLoss: -2750000,
      profitLossPercentage: -5.85,
      fundWeight: 1,
      fundWeightPercentage: 49.5,
      isStock: true,
      sellable: true,
    },
  ],

  // درآمد ثابت funds (typeID: 1)
  1: [
    {
      typeID: 1,
      name: 'صندوق درآمد ثابت بانک ملی',
      code: 'MELLI001',
      dailyValue: 52261667,
      userInvestValue: 50000000,
      profitLoss: 2261667,
      profitLossPercentage: 4.52,
      fundWeight: 1,
      fundWeightPercentage: 33.3,
      sellable: true,
    },
    {
      typeID: 1,
      name: 'صندوق اوراق بهادار دولتی',
      code: 'GOVT001',
      dailyValue: 52261667,
      userInvestValue: 50000000,
      profitLoss: 2261667,
      profitLossPercentage: 4.52,
      fundWeight: 1,
      fundWeightPercentage: 33.3,
      sellable: false, // Government bonds might not be sellable
    },
    {
      typeID: 1,
      name: 'صندوق درآمد ثابت تجارت',
      code: 'TEJARAT001',
      dailyValue: 52261666,
      userInvestValue: 50000000,
      profitLoss: 2261666,
      profitLossPercentage: 4.52,
      fundWeight: 1,
      fundWeightPercentage: 33.4,
      sellable: true,
    },
  ],

  // مختلط funds (typeID: 2)
  2: [
    {
      typeID: 2,
      name: 'صندوق مختلط آتیه',
      code: 'FUTURE001',
      dailyValue: 18480000,
      userInvestValue: 17500000,
      profitLoss: 980000,
      profitLossPercentage: 5.6,
      fundWeight: 1,
      fundWeightPercentage: 25.0,
      sellable: true,
    },
    {
      typeID: 2,
      name: 'صندوق مختلط پیشرو',
      code: 'PIONEER001',
      dailyValue: 18480000,
      userInvestValue: 17500000,
      profitLoss: 980000,
      profitLossPercentage: 5.6,
      fundWeight: 1,
      fundWeightPercentage: 25.0,
      sellable: true,
    },
    {
      typeID: 2,
      name: 'صندوق مختلط توسعه',
      code: 'DEVELOP001',
      dailyValue: 18480000,
      userInvestValue: 17500000,
      profitLoss: 980000,
      profitLossPercentage: 5.6,
      fundWeight: 1,
      fundWeightPercentage: 25.0,
      sellable: true,
    },
    {
      typeID: 2,
      name: 'صندوق مختلط رشد',
      code: 'GROWTH001',
      dailyValue: 18480000,
      userInvestValue: 17500000,
      profitLoss: 980000,
      profitLossPercentage: 5.6,
      fundWeight: 1,
      fundWeightPercentage: 25.0,
      sellable: true,
    },
  ],

  // کالایی funds (typeID: 3)
  3: [
    {
      typeID: 3,
      name: 'صندوق کالایی طلا',
      code: 'GOLD001',
      dailyValue: 48150000,
      userInvestValue: 45000000,
      profitLoss: 3150000,
      profitLossPercentage: 7.0,
      fundWeight: 1,
      fundWeightPercentage: 100.0,
      sellable: true,
    },
  ],
};

// Empty detailed fund data
export const emptyDetailedFundsData: Record<number, FundData[]> = {
  // سهامی funds (typeID: 0)
  0: [
    {
      typeID: 0,
      name: 'صندوق سهامی فولاد',
      code: 'STEEL001',
      dailyValue: 0,
      userInvestValue: 0,
      profitLoss: 0,
      profitLossPercentage: 0,
      fundWeight: 0,
      fundWeightPercentage: 0,
      isStock: true,
      sellable: true,
    },
    {
      typeID: 0,
      name: 'صندوق سهامی پتروشیمی',
      code: 'PETRO001',
      dailyValue: 0,
      userInvestValue: 0,
      profitLoss: 0,
      profitLossPercentage: 0,
      fundWeight: 0,
      fundWeightPercentage: 0,
      isStock: true,
      sellable: true,
    },
  ],

  // درآمد ثابت funds (typeID: 1)
  1: [
    {
      typeID: 1,
      name: 'صندوق درآمد ثابت بانک ملی',
      code: 'MELLI001',
      dailyValue: 0,
      userInvestValue: 0,
      profitLoss: 0,
      profitLossPercentage: 0,
      fundWeight: 0,
      fundWeightPercentage: 0,
      sellable: true,
    },
    {
      typeID: 1,
      name: 'صندوق اوراق بهادار دولتی',
      code: 'GOVT001',
      dailyValue: 0,
      userInvestValue: 0,
      profitLoss: 0,
      profitLossPercentage: 0,
      fundWeight: 0,
      fundWeightPercentage: 0,
      sellable: false, // Government bonds might not be sellable
    },
    {
      typeID: 1,
      name: 'صندوق درآمد ثابت تجارت',
      code: 'TEJARAT001',
      dailyValue: 0,
      userInvestValue: 0,
      profitLoss: 0,
      profitLossPercentage: 0,
      fundWeight: 0,
      fundWeightPercentage: 0,
      sellable: true,
    },
  ],

  // مختلط funds (typeID: 2)
  2: [
    {
      typeID: 2,
      name: 'صندوق مختلط آتیه',
      code: 'FUTURE001',
      dailyValue: 0,
      userInvestValue: 0,
      profitLoss: 0,
      profitLossPercentage: 0,
      fundWeight: 0,
      fundWeightPercentage: 0,
      sellable: true,
    },
    {
      typeID: 2,
      name: 'صندوق مختلط پیشرو',
      code: 'PIONEER001',
      dailyValue: 0,
      userInvestValue: 0,
      profitLoss: 0,
      profitLossPercentage: 0,
      fundWeight: 0,
      fundWeightPercentage: 0,
      sellable: true,
    },
    {
      typeID: 2,
      name: 'صندوق مختلط توسعه',
      code: 'DEVELOP001',
      dailyValue: 0,
      userInvestValue: 0,
      profitLoss: 0,
      profitLossPercentage: 0,
      fundWeight: 0,
      fundWeightPercentage: 0,
      sellable: true,
    },
    {
      typeID: 2,
      name: 'صندوق مختلط رشد',
      code: 'GROWTH001',
      dailyValue: 0,
      userInvestValue: 0,
      profitLoss: 0,
      profitLossPercentage: 0,
      fundWeight: 0,
      fundWeightPercentage: 0,
      sellable: true,
    },
  ],

  // کالایی funds (typeID: 3)
  3: [
    {
      typeID: 3,
      name: 'صندوق کالایی طلا',
      code: 'GOLD001',
      dailyValue: 0,
      userInvestValue: 0,
      profitLoss: 0,
      profitLossPercentage: 0,
      fundWeight: 0,
      fundWeightPercentage: 0,
      sellable: true,
    },
  ],
};

// CURRENT ACTIVE DATA (change these to switch between full/empty)
// ===============================================================
export const categoryFundsData = fullCategoryFundsData; // Change to emptyCategoryFundsData for empty state
export const detailedFundsData = fullDetailedFundsData; // Change to emptyDetailedFundsData for empty state

// Fund type names mapping
export const fundTypeNames: Record<number, string> = {
  0: 'سهامی',
  1: 'درآمد ثابت',
  2: 'مختلط',
  3: 'کالایی',
};

// Note: Pie chart data is now generated dynamically based on current view
