import AppBar from './components/AppBar';
import { Box } from '@mui/material';
import CoinList from './components/CoinList';
import CoinChart from './components/CoinChart';

function App() {
  return (
    <>
      <AppBar />
      <Box
        sx={{
          display: 'flex',
          padding: 2,
          height: 'calc(100vh - 64px)',
          flexDirection: 'column',
        }}
      >
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Box flex={0} height='calc(100vh - 140px)'>
            <CoinList />
          </Box>
          <Box flex={1}>
            <CoinChart />
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default App;
