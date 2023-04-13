import {
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
  CircularProgress,
} from '@mui/material';
import { useQuery } from 'react-query';
import CallMadeRoundedIcon from '@mui/icons-material/CallMadeRounded';
import React from 'react';
import SearchCoin from './SearchCoin';
import { getCoinList } from '../services/api';
import { useCoinStore } from '../store/coinStore';

const CoinList = () => {
  const [page, setPage] = React.useState(1);
  const updateMarkgets = useCoinStore((state) => state.updateMarkgets);
  const selectedCoinId = useCoinStore((state) => state.selectedCoinId);
  const updateSelectedCoinId = useCoinStore(
    (state) => state.updateSelectedCoinId
  );
  const markets = useCoinStore((state) => state.markets);
  const selectedSearchCoinId = useCoinStore(
    (state) => state.selectedSearchCoinId
  );
  const searchCoinDetail = useCoinStore((state) => state.searchCoinDetail);
  const { isFetching } = useQuery({
    queryKey: ['get-coin-list', page],
    queryFn: () => fetch(getCoinList(page)).then((res) => res.json()),
    initialData: [],
    onSuccess: updateMarkgets,
  });

  const dataMemoized = React.useMemo(() => {
    if (selectedSearchCoinId && searchCoinDetail) {
      return [searchCoinDetail];
    }
    return markets;
  }, [markets, searchCoinDetail]);

  const handleSelectCoin = (coinId: string) => {
    updateSelectedCoinId(coinId);
  };

  const handleLoadMore = () => {
    setPage((prevState) => prevState + 1);
  };

  return (
    <Box height='100%' minWidth={300}>
      {dataMemoized.length === 0 && isFetching ? (
        <Box>
          <CircularProgress size={20} />
        </Box>
      ) : (
        <>
          <Box mb={1}>
            <SearchCoin />
          </Box>

          {dataMemoized.length === 0 ? (
            <Typography textAlign='center'>No data</Typography>
          ) : (
            <Box
              component={Paper}
              borderRadius={4}
              sx={{
                height: '100%',
                overflow: 'hidden',
                overflowY: 'auto',
              }}
            >
              <List sx={{ py: 0 }}>
                {dataMemoized.map((coin) => {
                  const positive = coin.price_change_percentage_24h > 0;
                  return (
                    <ListItem key={coin.id} disablePadding>
                      <ListItemButton
                        sx={{
                          py: 0,
                          px: 2,
                          gap: 2,
                        }}
                        onClick={() => handleSelectCoin(coin.id)}
                        selected={
                          coin.id === selectedCoinId ||
                          coin.id === selectedSearchCoinId
                        }
                      >
                        <ListItemIcon sx={{ minWidth: 0 }}>
                          <img src={coin.image} alt={coin.name} width={20} />
                        </ListItemIcon>
                        <ListItemText
                          primary={coin.symbol}
                          secondary={coin.name}
                          primaryTypographyProps={{
                            textTransform: 'uppercase',
                          }}
                          secondaryTypographyProps={{
                            color: 'textSecondary',
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis',
                          }}
                          sx={{
                            maxWidth: 80,
                            minWidth: 80,
                          }}
                        />
                        <ListItemText
                          primary={
                            <Typography
                              sx={{
                                color: positive ? 'success.main' : 'error.main',
                                whiteSpace: 'nowrap',
                                display: 'flex',
                                alignItems: 'center',
                              }}
                              variant='caption'
                              component='p'
                            >
                              <CallMadeRoundedIcon
                                sx={{
                                  fontSize: 14,
                                  typography: 'inherite',
                                  transform: positive
                                    ? 'none'
                                    : 'rotate(90deg)',
                                }}
                              />
                              <span>
                                {`${coin.price_change_percentage_24h?.toFixed(
                                  2
                                )}%`}
                              </span>
                            </Typography>
                          }
                        />

                        <Typography variant='caption' component='p'>
                          {new Intl.NumberFormat(undefined, {
                            style: 'currency',
                            currency: 'USD',
                            maximumFractionDigits: 2,
                          }).format(coin.current_price)}
                        </Typography>
                      </ListItemButton>
                    </ListItem>
                  );
                })}
                {!selectedSearchCoinId && (
                  <ListItem
                    sx={{ justifyContent: 'center', my: 1 }}
                    disablePadding
                  >
                    <Button onClick={handleLoadMore}>Load More</Button>
                  </ListItem>
                )}
              </List>
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default CoinList;
