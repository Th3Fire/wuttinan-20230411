import React from 'react';
import { Box, Button, Paper, Typography, useTheme } from '@mui/material';
import { Line } from 'react-chartjs-2';
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  ArcElement,
  Legend,
} from 'chart.js';
import timeframes from '../constants/timeframes';
import { useCoinStore } from '../store/coinStore';
import { useFetchHistoricalChart } from '../hooks/useFetchHistoricalChart';

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  ArcElement,
  Legend
);

const CoinChart = () => {
  const theme = useTheme();
  const [timeframe, setTimeframe] = React.useState(timeframes[0].value);
  const selectedCoinId = useCoinStore((state) => state.selectedCoinId);
  const selectedSearchCoinId = useCoinStore(
    (state) => state.selectedSearchCoinId
  );
  const searchCoinDetail = useCoinStore((state) => state.searchCoinDetail);
  const markets = useCoinStore((state) => state.markets);
  const coinId = selectedSearchCoinId || selectedCoinId;

  const { coins } = useFetchHistoricalChart(coinId, timeframe);

  const chartData = {
    labels: coins?.prices.map((coin) => {
      const date = new Date(coin[0]);
      const time =
        date.getHours() > 12
          ? `${date.getHours() - 12}:${date.getMinutes()} PM`
          : `${date.getHours()}:${date.getMinutes()} AM`;
      return timeframe === 1 ? time : date.toLocaleDateString();
    }),
    datasets: [
      {
        data: coins?.prices.map((coin) => coin[1]),
        label: `Price`,
        borderColor: theme.palette.primary.main,
      },
    ],
  };
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },

    scales: {
      y: {
        display: true,
        position: 'right' as const,
      },
    },
    elements: {
      point: {
        radius: 1,
      },
    },
  };

  const coinName = React.useMemo(() => {
    if (selectedSearchCoinId) {
      return searchCoinDetail?.name;
    }
    const found = markets.find((market) => market.id === coinId);
    if (found) {
      return found.name;
    }
    return 'Loading...';
  }, [coinId, markets, searchCoinDetail, selectedSearchCoinId]);

  return (
    <Box
      component={Paper}
      sx={{
        borderRadius: 4,
        p: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant='h6'>{coinName}</Typography>
        <Box>
          {timeframes.map(({ label, value }) => (
            <Button
              key={`${value}`}
              variant={timeframe === value ? 'contained' : 'outlined'}
              size='small'
              onClick={() => setTimeframe(value)}
            >
              {label}
            </Button>
          ))}
        </Box>
      </Box>
      <Box height="calc(100vh - 155px)">{<Line data={chartData} options={chartOptions} />}</Box>
    </Box>
  );
};

export default CoinChart;
