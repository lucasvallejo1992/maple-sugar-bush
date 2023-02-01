import { Box, Container, Divider, Grid, Typography } from '@mui/material';
import ProductCartCard from '../components/cards/ProductCartCard';

import { useCart } from '../hooks/useCart';

const Cart = () => {
  const { productList, updateItemFromCart, removeFromCart } = useCart();

  return (
    <Container sx={{ marginBottom: 4, marginTop: 2 }}>
      <Grid container sx={{ marginBottom: 1 }}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          width="100%"
        >
          <Typography>
            Cart
          </Typography>
        </Box>
        <Divider sx={{ width: '100%', marginY: 1 }} />
      </Grid>
      <Grid container flexDirection="column" spacing={4} justifyContent="flex-start" >
        {
          productList?.map(product => (
            <Grid item key={product.productId}>
              <ProductCartCard
                {...product}
                key={product.productId}
                onRemoveItem={() => removeFromCart(product.productId)}
                onUpdateQty={(qty) => updateItemFromCart(product.productId, qty)}
              />
            </Grid>
          ))
        }
        {
          !productList?.length ? (
            <Box display="flex" alignItems="center" justifyContent="center" height={180}>
              <Typography variant="h6" fontWeight={400}>
                There are no products in your cart
              </Typography>
            </Box>
          ) : undefined
        }
      </Grid>
    </Container>
  )
}

export default Cart;