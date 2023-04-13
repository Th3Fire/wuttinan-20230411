import { create } from 'zustand';
import type { TCoin, TCoinStore } from '../types/coin';

export const useCoinStore = create<TCoinStore>((set, get) => ({
  markets: [],
  selectedCoinId: '',
  selectedSearchCoinId: '',
  searchCoinDetail: {} as TCoin,
  updateSelectedCoinId: (coinId) => {
    set({ selectedCoinId: coinId });
  },
  updateMarkgets: (markets) => {
    const selectedCoinId = get().selectedCoinId;

    if (!selectedCoinId) {
      set({ markets, selectedCoinId: markets[0].id });
    } else {
      set((state) => ({
        markets: [...state.markets, ...markets],
      }));
    }
  },
  updateSelectedSearchCoinId: (coinId) => {
    set({ selectedSearchCoinId: coinId });
  },

  updateSearchCoinDetail: (coin) => {
    set({ searchCoinDetail: coin as TCoin });
  },
}));
