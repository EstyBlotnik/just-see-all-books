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
    <AppBar position='fixed' sx={{ width: '100%' }} dir='rtl'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters sx={{ display: 'flex', width: '100%' }}>
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-start' }}>
            <Typography
              variant='h6'
              noWrap
              component='a'
              href='/'
              sx={{
                ml: 4,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 600,
                letterSpacing: '.2rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              החנות של מוטי
            </Typography>
          </Box>
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
