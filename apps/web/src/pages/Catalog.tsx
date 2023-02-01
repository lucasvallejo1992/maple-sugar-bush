import { Box, Container, Divider, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import CatalogCard from '../components/cards/CatalogCard';
import CatalogCardSkeleton from '../components/cards/CatalogCardSkeleton';
import CatalogFilter from '../components/CatalogFilter';
import { ProductType } from '../enums/ProductType.enum';
import { useCart } from '../hooks/useCart';
import { useCatalog } from '../hooks/useCatalog';

const productFilters = [
  {
    key: ProductType.ALL,
    value: 'All'
  },
  {
    key: ProductType.DARK,
    value: 'Dark'
  },
  {
    key: ProductType.AMBER,
    value: 'Amber'
  },
  {
    key: ProductType.CLEAR,
    value: 'Clear'
  },
];

const Catalog = () => {
  const [selectedFilter, setSelectedFilter] = useState(productFilters[0]);

  const navigate = useNavigate();
  const { products, isLoading, isError } = useCatalog(selectedFilter.key);
  const { addItemToCart, isLoadingAddToCart } = useCart();

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
            Products { selectedFilter.key !== 'ALL' ? `filtered by type: ${selectedFilter.value}` : '' }
          </Typography>
          <CatalogFilter
            filters={productFilters}
            handleFilterClick={(filterType) => setSelectedFilter(filterType)}
          />
        </Box>
        <Divider sx={{ width: '100%', marginY: 1 }} />
      </Grid>
      <Grid container spacing={4} justifyContent="center" >
        {
          isLoading ? (
            Array.from(new Array(6)).map((_, index) => (
              <Grid item key={index}>
                <CatalogCardSkeleton />
              </Grid>
            ))
          ) : (
            products?.map((product: any) => (
              <Grid item key={product.id}>
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
        {
          !isError && !products?.length ? (
            <Box display="flex" alignItems="center" justifyContent="center" height={180}>
              <Typography variant="h6" fontWeight={400}>
                There are no products to show { selectedFilter.key !==  ProductType.ALL ? `for type ${selectedFilter.value}` : '' }
              </Typography>
            </Box>
          ) : undefined
        }
      </Grid>
    </Container>
  )
}

export default Catalog;