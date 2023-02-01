import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import CartButton from './common/CartButton';

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static" color="transparent" elevation={4}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" component="div" sx={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
          Maplr
        </Typography>
        <CartButton count={5} onClick={() => navigate('/cart')} />
      </Toolbar>
    </AppBar>
  )
}

export default NavBar;