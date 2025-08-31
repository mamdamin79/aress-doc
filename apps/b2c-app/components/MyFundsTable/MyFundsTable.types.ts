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
