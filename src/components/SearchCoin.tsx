import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import {
  Autocomplete,
  Grid,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import useDebounce from '../hooks/useDebounce';
import { useCoinStore } from '../store/coinStore';
import { useSearchCoin } from '../hooks/useSearchCoin';
import { useFetchTrendingCoins } from '../hooks/useFetchTrendingCoins';
import { useFetchCoinDetail } from '../hooks/useFetchCoinDetail';
import type { TCoin } from '../types/coin';

type TValue = TCoin & {
  type?: string;
};

const SearchCoin = () => {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const [value, setValue] = React.useState<TValue | null>(null);
  const debouncedSearchText = useDebounce<string>(search);
  const updateSelectedSearchCoinId = useCoinStore(
    (state) => state.updateSelectedSearchCoinId
  );
  const selectedSearchCoinId = useCoinStore(
    (state) => state.selectedSearchCoinId
  );
  const updateSearchCoinDetail = useCoinStore(
    (state) => state.updateSearchCoinDetail
  );

  const { coins, isFetchingCoins } = useSearchCoin(debouncedSearchText);
  const { trendingCoins, isFetchingTrendingCoins } =
    useFetchTrendingCoins(open);
  useFetchCoinDetail(selectedSearchCoinId);

  const options = React.useMemo(
    () => (debouncedSearchText === '' ? trendingCoins : coins),
    [debouncedSearchText, trendingCoins, coins]
  );

  return (
    <div>
      <Autocomplete
        disablePortal
        id='search-coin-combo-box'
        sx={{
          width: 300,
          '& .MuiAutocomplete-clearIndicator': {
            color: 'common.white',
          },
        }}
        options={options || []}
        loading={isFetchingTrendingCoins || isFetchingCoins}
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        value={value}
        PaperComponent={(props) => (
          <Paper
            {...props}
            sx={{
              bgcolor: 'common.white',
              borderRadius: 2,
              '& .MuiAutocomplete-groupLabel': {
                bgcolor: 'transparent',
                position: 'unset',
              },
            }}
          />
        )}
        noOptionsText='No Data'
        loadingText='Loading...'
        forcePopupIcon={false}
        isOptionEqualToValue={(option: any, value: any) =>
          option.id === value.id
        }
        groupBy={(option) => option?.type || ''}
        getOptionLabel={(option) => `${option.name}`}
        onChange={(_event, newValue: TValue | null) => {
          setValue(newValue);
          if (newValue) {
            updateSelectedSearchCoinId(newValue.id);
          } else {
            updateSelectedSearchCoinId(null);
            updateSearchCoinDetail(null);
          }
        }}
        onInputChange={(_event, newInputValue) => {
          setSearch(newInputValue);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            size='small'
            sx={{
              color: 'common.white',
              '& .MuiInputBase-root': {
                bgcolor: '#171429',
                borderRadius: 3,
              },
            }}
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchIcon sx={{ color: 'primary.main' }} />
                </InputAdornment>
              ),
            }}
            autoComplete='off'
            fullWidth
          />
        )}
        renderOption={(props, option) => {
          return (
            <li {...props}>
              <Grid container alignItems='center' sx={{ height: 30 }}>
                <Grid item sx={{ display: 'flex', width: 44 }}>
                  <img src={option.image} alt={option.name} width={20} />
                </Grid>
                <Grid
                  item
                  sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}
                >
                  <Typography variant='body2' color='text.secondary'>
                    {`${option.name} (${option.symbol})`}
                  </Typography>
                </Grid>
              </Grid>
            </li>
          );
        }}
      />
    </div>
  );
};

export default SearchCoin;
