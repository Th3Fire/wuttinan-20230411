const getmaxProfit = (prices: number[]): number => {
  let min = prices[0];
  let maxProfit = 0;

  for (let i = 1; i < prices.length; i++) {
    min = Math.min(min, prices[i]);
    maxProfit = Math.max(maxProfit, prices[i] - min);
  }
  return maxProfit;
};

export default getmaxProfit