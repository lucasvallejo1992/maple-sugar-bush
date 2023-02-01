import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import { Product } from '../../types/product.type';

type CardCatalogActions = {
  onAddToCart: () => void;
  onProductClick: () => void;
}

type CardCatalogProps = Product & CardCatalogActions;

const CatalogCard = ({
  name,
  image,
  price,
  onAddToCart,
  onProductClick
}: CardCatalogProps) => {
  return (
    <Card sx={{ width: 320 }}>
      <CardMedia
        sx={{ height: 180, cursor: 'pointer' }}
        image={image}
        title={name}
        onClick={onProductClick}
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, cursor: 'pointer' }}
          onClick={onProductClick}
        >
          { name }
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ${price.toString()}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          startIcon={<ShoppingCartIcon />}
          onClick={onAddToCart}
          fullWidth
        >Add to cart</Button>
      </CardActions>
    </Card>
  );
}

export default CatalogCard;