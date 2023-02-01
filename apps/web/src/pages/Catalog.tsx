import { Container, Grid, Typography } from '@mui/material';

import CatalogCard from '../components/cards/CatalogCard';
import CatalogCardSkeleton from '../components/cards/CatalogCardSkeleton';
import { useCatalog } from '../hooks/useCatalog';

const Catalog = () => {
  const { products, isLoading } = useCatalog();
  return (
    <Container sx={{ marginY: 4 }}>
      <Grid container>
        <Typography>
          Filter
        </Typography>
      </Grid>
      <Grid container spacing={4} justifyContent="center">
        {
          isLoading ? (
            Array.from(new Array(6)).map(() => (
              <Grid item>
                <CatalogCardSkeleton />
              </Grid>
            ))
          ) : (
            products.map((product: any) => (
              <Grid item>
                <CatalogCard {...product} />
              </Grid>
            ))
          )
        }
      </Grid>
    </Container>
  )
}

export default Catalog;