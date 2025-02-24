import { faker } from '@faker-js/faker'

export type Person = {
  nameFund: string,
  unitCount: number
  profitPerUnit: number
  netAssetValue: number
  monstatisticalPriceth: number
  cancellationPrice: number
  issuancePrice: number
  progress: number
}

const range = (len: number) => {
  const arr: number[] = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}

const newPerson = (): Person => {
  return {
    nameFund: faker.person.fullName(),
    unitCount: faker.number.int(40),
    profitPerUnit: faker.number.int(9000000),
    netAssetValue: faker.number.int(999000000),
    monstatisticalPriceth: faker.number.int(90000),
    cancellationPrice: faker.number.int(40),
    issuancePrice: faker.number.int(1000),
    progress: faker.number.int(100),
  }
}

export function makeData(...lens: number[]) {
  const makeDataLevel = (depth = 0): Person[] => {
    const len = lens[depth]!
    return range(len).map((d): Person => {
      return {
        ...newPerson(),
      }
    })
  }

  return makeDataLevel()
}
