import { useQuery } from 'react-query';
import { searchCoins } from '../services/api';
import type { TSearchCoins } from '../types/coin';

export const useSearchCoin = (searchText: string) => {
  const { data, isFetching } = useQuery({
    queryKey: ['search', searchText],
    queryFn: () => fetch(searchCoins(searchText)).then((res) => res.json()),
    select: (data: TSearchCoins) => {
      const newDate = data?.coins?.map((coin) => ({
        ...coin,
        image: coin.large,
      }));
      return newDate || [];
    },
    initialData: {} as TSearchCoins,
    enabled: !!searchText,
  });

  return {
    coins: data,
    isFetchingCoins: isFetching,
  };
};
