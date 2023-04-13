export const getCoinList = (page = 1) =>
  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=${page}&sparkline=false&locale=en`;

export const getHistoricalChart = (id: string, days = 365) =>
  `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}`;

export const searchCoins = (query = '') =>
  `https://api.coingecko.com/api/v3/search?query=${query}`;

export const getTrendingCoins = () =>
  'https://api.coingecko.com/api/v3/search/trending';

export const getCoinDetail = (id: string) =>
  `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`;
