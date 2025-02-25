import { faker } from '@faker-js/faker';

export type Person = {
  nameFund: string;
  unitCount: number;
  profitPerUnit: number;
  netAssetValue: number;
  monstatisticalPriceth: number;
  cancellationPrice: number;
  dailyAlpha: number;
  weeklyAlpha: number;
  monthlyAlpha: number;
  quarterlyAlpha: number;
  issuancePrice: number;
  progress: number;
  monthlyReturn: number;
  quarterlyReturn: number;
  yearlyReturn: number;
  dailyReturn: number;
  weeklyReturn: number;
  startDate: number;
};

const range = (len: number) => {
  const arr: number[] = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newPerson = (): Person => {
  return {
    nameFund: faker.person.fullName(),
    startDate: faker.date.past().getTime(),
    monthlyReturn: faker.number.int(100),
    quarterlyReturn: faker.number.int(100),
    yearlyReturn: faker.number.int(100),
    dailyAlpha: faker.number.int(100),
    weeklyAlpha: faker.number.int(100),
    monthlyAlpha: faker.number.int(100),
    quarterlyAlpha: faker.number.int(100),
    dailyReturn: faker.number.int(100),
    weeklyReturn: faker.number.int(100),
    unitCount: faker.number.int(40),
    profitPerUnit: faker.number.int(9000000),
    netAssetValue: faker.number.int(999000000),
    monstatisticalPriceth: faker.number.int(90000),
    cancellationPrice: faker.number.int(40),
    issuancePrice: faker.number.int(1000),
    progress: faker.number.int(100),
  };
};

export function makeData(...lens: number[]) {
  const makeDataLevel = (depth = 0): Person[] => {
    const len = lens[depth]!;
    return range(len).map((d): Person => {
      return {
        ...newPerson(),
      };
    });
  };

  return makeDataLevel();
}
