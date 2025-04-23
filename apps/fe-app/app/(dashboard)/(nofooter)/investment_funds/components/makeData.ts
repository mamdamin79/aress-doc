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
  hasVideo: boolean;
  logo: string;
  investmentMethod: 'T' | 'I&C';
};

const range = (len: number) => {
  const arr: number[] = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newPerson = (): Person => {
  const investmentMethods: ['T', 'I&C'] = ['T', 'I&C'];
  const fixedNow = new Date('2020-01-01').getTime(); // fixed reference point to avoid hydration error

  return {
    investmentMethod: faker.helpers.arrayElement(investmentMethods),
    hasVideo: faker.datatype.boolean(),
    logo: faker.image.avatar(),
    nameFund: faker.person.fullName(),
    startDate:
      fixedNow -
      faker.number.int({ min: 0, max: 1000 * 60 * 60 * 24 * 365 * 5 }), // deterministic
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
  // Use the same seed every time this function runs
  faker.seed(123);

  const makeDataLevel = (depth = 0): Person[] => {
    const len = lens[depth]!;
    return range(len).map((): Person => {
      return {
        ...newPerson(),
      };
    });
  };

  return makeDataLevel();
}
