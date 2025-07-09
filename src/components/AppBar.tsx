import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import SearchBar from './SearchBar';
import { useNavigate } from 'react-router-dom';

const ResponsiveAppBar = () => {
  const navigate = useNavigate();

  const handleSearch = (newQuery: string) => {
    const newParams = new URLSearchParams();
    newParams.set('q', newQuery);

    navigate({
      pathname: '/',
      search: newParams.toString(),
    });
  };

  return (
    <AppBar
      position='fixed'
      sx={{ width: '100%', background: '#beb2966b' }}
      dir='rtl'
    >
      <Container maxWidth='xl'>
        <Toolbar disableGutters sx={{ display: 'flex', width: '100%' }}>
          {/* <Box
            sx={{
              flex: 1,
              display: 'flex',
              justifyContent: 'space-around',
              flexDirection: 'column',
              ml: 4,
            }}
          >
            <Typography
              variant='h6'
              noWrap
              component='a'
              href='/'
              sx={{
                display: 'flex',
                fontFamily: 'monospace',
                fontWeight: 600,
                letterSpacing: '.1rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              אפילוג
            </Typography>

            <Typography
              variant='body2'
              sx={{
                fontFamily: 'monospace',
                fontSize: '1rem',
                color: 'inherit',
                display: { xs: 'none', md: 'block' },
              }}
            >
              ספרי יד שניה
            </Typography>
          </Box> */}

          <img src='/epilogue.png' width='100' height='50' />

          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <SearchBar onSearch={handleSearch} />
          </Box>
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <Tooltip title='Open settings'>
              <IconButton sx={{ p: 0 }}>
                <Avatar alt='Remy Sharp' src='/static/images/avatar/2.jpg' />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
