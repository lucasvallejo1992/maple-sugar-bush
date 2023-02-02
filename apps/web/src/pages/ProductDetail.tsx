import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import { useCart } from '../hooks/useCart';
import { useCatalog } from '../hooks/useCatalog';

const ProductDetail = () => {
  const { id } = useParams();
  const { products } = useCatalog();
  const { addItemToCart, isLoading } = useCart();

  const product = useMemo(() => {
    const result = products?.filter((product) => product.id === id);

    if (result?.length) {
      return result[0];
    }
  }, [id, products])

  if (!product) {
    return <Box height={100} display="flex" justifyContent="center" alignItems="center">Loading...</Box>
  }

  return (
    <Grid container flexDirection="column" alignItems="center" mt={2}>
      <Grid item>
        <img
          height={200}
          width={300}
          style={{ objectFit: 'cover', borderRadius: 4 }}
          src={product?.image || ""}
        />
      </Grid>
      <Grid item>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          mb={0}
        >
          { product?.name }
        </Typography>
      </Grid>
      <Grid item>
        <Typography>  
          ${ product?.price }
        </Typography>
      </Grid>
      <Grid item mt={2} mb={3} maxWidth={600}>
        <Typography>  
          { product?.description }
        </Typography>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          startIcon={!isLoading ? <ShoppingCartIcon /> : undefined}
          onClick={() => addItemToCart(product?.id || '')}
          sx={{ height: 40 }}
          disabled={isLoading}
          fullWidth
        >
          {
            !isLoading ? (
              'Add to cart'
            ) : (
              <CircularProgress color="inherit" size={25} />
            )
          }
        </Button>
      </Grid>
    </Grid>
  )
}

export default ProductDetail;