import { AppBar, Toolbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { useCart } from '../hooks/useCart';
import CartButton from './common/CartButton';

const NavBar = () => {
  const navigate = useNavigate();
  const { productsCount } = useCart();

  return (
    <AppBar position="static" color="transparent" elevation={4}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" component="div" sx={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
          Maple Sugar
        </Typography>
        <CartButton count={productsCount} onClick={() => navigate('/cart')} />
      </Toolbar>
    </AppBar>
  )
}

export default NavBar;