import { describe, it, expect } from 'vitest';
import getmaxProfit from './getMaxProfit';

describe('You are given an array of prices where the value in each index is the price of the given stock of a given day.', () => {
  it('should return max profit 4', () => {
    const stockPriceList = [2, 3, 6, 4, 3];
    const actualResult = getmaxProfit(stockPriceList);
    // Buy on day 1 (stockPriceList[0]) and sell on day 3 (stockPriceList[2])
    // 6 - 2 = 4
    expect(actualResult).toBe(4);
  });

  it('should return max profit 4', () => {
    const stockPriceList = [8, 2, 3, 6, 4, 3];
    const actualResult = getmaxProfit(stockPriceList);
    // Buy on day 2 (stockPriceList[1]) and sell on day 4 (stockPriceList[3])
    // 6 - 2 = 4
    // Note: buying on day 2 and selling on day 1 is not allowed because you must buy before you sell
    expect(actualResult).toBe(4);
  });

  it('should return max profit 0', () => {
    const stockPriceList = [6, 5, 4, 3, 2, 1];
    const actualResult = getmaxProfit(stockPriceList);
    // Cannot achieve any profit, selling price must be larger than buying price
    expect(actualResult).toBe(0);
  });
});
