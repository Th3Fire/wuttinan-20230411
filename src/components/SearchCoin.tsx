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

const topFilms = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'Pulp Fiction', year: 1994 },
  {
    title: 'The Lord of the Rings: The Return of the King',
    year: 2003,
  },
  { title: 'The Good, the Bad and the Ugly', year: 1966 },
  { title: 'Fight Club', year: 1999 },
  {
    title: 'The Lord of the Rings: The Fellowship of the Ring',
    year: 2001,
  },
  {
    title: 'Star Wars: Episode V - The Empire Strikes Back',
    year: 1980,
  },
  { title: 'Forrest Gump', year: 1994 },
  { title: 'Inception', year: 2010 },
  {
    title: 'The Lord of the Rings: The Two Towers',
    year: 2002,
  },
  { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { title: 'Goodfellas', year: 1990 },
  { title: 'The Matrix', year: 1999 },
  { title: 'Seven Samurai', year: 1954 },
  {
    title: 'Star Wars: Episode IV - A New Hope',
    year: 1977,
  },
  { title: 'City of God', year: 2002 },
  { title: 'Se7en', year: 1995 },
  { title: 'The Silence of the Lambs', year: 1991 },
  { title: "It's a Wonderful Life", year: 1946 },
  { title: 'Life Is Beautiful', year: 1997 },
  { title: 'The Usual Suspects', year: 1995 },
  { title: 'Léon: The Professional', year: 1994 },
  { title: 'Spirited Away', year: 2001 },
  { title: 'Saving Private Ryan', year: 1998 },
  { title: 'Once Upon a Time in the West', year: 1968 },
  { title: 'American History X', year: 1998 },
  { title: 'Interstellar', year: 2014 },
];

export default SearchCoin;
