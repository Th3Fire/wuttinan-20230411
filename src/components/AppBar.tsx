import { AppBar as AppBarMui, Box, Toolbar, Typography } from '@mui/material';

function AppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBarMui position='static' sx={{ bgcolor: 'background.paper' }}>
        <Toolbar>
          <Typography
            variant='h6'
            component='div'
            color='primary'
            sx={{ flexGrow: 1 }}
          >
            Wuttinan.C
          </Typography>
        </Toolbar>
      </AppBarMui>
    </Box>
  );
}

export default AppBar;
