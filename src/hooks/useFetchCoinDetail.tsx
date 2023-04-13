import { useQuery } from 'react-query';
import { getCoinDetail } from '../services/api';
import { useCoinStore } from '../store/coinStore';
import type { TCoin, TCoinDetail } from '../types/coin';

export const useFetchCoinDetail = (coinId: TCoin['id'] | null) => {
  const updateSearchCoinDetail = useCoinStore(
    (state) => state.updateSearchCoinDetail
  );

  useQuery({
    queryKey: ['get-coin-detail', coinId],
    queryFn: () =>
      fetch(getCoinDetail(coinId as string)).then((res) => res.json()),
    select: (data: TCoinDetail | null) => {
      if (data !== null) {
        return {
          id: data.id,
          name: data.name,
          symbol: data.symbol,
          image: data.image?.large,
          price_change_percentage_24h:
            data.market_data?.price_change_percentage_24h,
          current_price: data.market_data?.current_price.usd,
        };
      }
      return null;
    },
    onSuccess: (data) => {
      updateSearchCoinDetail(data);
    },

    initialData: null,
    enabled: !!coinId,
  });
};
