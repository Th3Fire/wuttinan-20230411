export type TCoin = {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
};

export type TCoinStore = {
  markets: TCoin[];
  selectedCoinId: string | null;
  selectedSearchCoinId: string | null;
  searchCoinDetail: TCoin;
  updateSelectedCoinId: (coinId: string | null) => void;
  updateMarkgets: (markets: TCoin[]) => void;
  updateSelectedSearchCoinId: (coinId: string | null) => void;
  updateSearchCoinDetail: (coin: TCoin | null) => void;
};

export type TSearchCoins = {
  coins: (TCoin & { large: string; type?: string })[];
};

export type TTrendingCoins = {
  coins: {
    item: TCoin & { large: string };
  }[];
};

export type TCoinDetail = {
  id: string;
  name: string;
  symbol: string;
  image: {
    large: string;
  };
  market_data: {
    price_change_percentage_24h: number;
    current_price: {
      usd;
    };
  };
};

export type THistoricalChart = {
  prices: [number, number][];
};
