import { Container, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import CatalogCard from '../components/cards/CatalogCard';
import CatalogCardSkeleton from '../components/cards/CatalogCardSkeleton';
import { useCart } from '../hooks/useCart';
import { useCatalog } from '../hooks/useCatalog';

const Catalog = () => {
  const navigate = useNavigate();
  const { products, isLoading } = useCatalog();
  const { addItemToCart, isLoadingAddToCart } = useCart();

  return (
    <Container sx={{ marginY: 4 }}>
      <Grid container>
        <Typography>
          Filter
        </Typography>
      </Grid>
      <Grid container spacing={4} justifyContent="space-around">
        {
          isLoading ? (
            Array.from(new Array(6)).map(() => (
              <Grid item>
                <CatalogCardSkeleton />
              </Grid>
            ))
          ) : (
            products?.map((product: any) => (
              <Grid item>
                <CatalogCard
                  {...product}
                  isLoading={isLoadingAddToCart.id === product.id}
                  onAddToCart={() => addItemToCart(product.id)}
                  onProductClick={() => navigate(`/product/${product.id}`)}
                />
              </Grid>
            ))
          )
        }
      </Grid>
    </Container>
  )
}

export default Catalog;