import { useQuery } from 'react-query';
import { getTrendingCoins } from '../services/api';
import type { TTrendingCoins } from '../types/coin';

export const useFetchTrendingCoins = (triggered: boolean) => {
  const { data, isFetching } = useQuery({
    queryKey: ['search', 'trending'],
    queryFn: () => fetch(getTrendingCoins()).then((res) => res.json()),
    select: (data: TTrendingCoins) => {
      const newData = data?.coins?.map((coin) => ({
        ...coin.item,
        type: 'Trending Search 🔥',
        image: coin.item.large,
      }));
      return newData || [];
    },
    initialData: {} as TTrendingCoins,
    enabled: triggered,
  });
  return {
    trendingCoins: data,
    isFetchingTrendingCoins: isFetching,
  };
};
