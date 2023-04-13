import { useQuery } from 'react-query';
import {  getHistoricalChart } from '../services/api';
import type { TCoin, THistoricalChart } from '../types/coin';

export const useFetchHistoricalChart = (
  coinId: TCoin['id'] | null,
  timeframe: number
) => {
  const { data } = useQuery<THistoricalChart>({
    queryKey: ['get-historical-chart', coinId, timeframe],
    queryFn: () =>
      fetch(getHistoricalChart(coinId as string, timeframe)).then((res) =>
        res.json()
      ),
    initialData: {
      prices: [],
    },
    enabled: !!coinId,
  });

  return {
    coins: data,
  };
};
