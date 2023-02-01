import { Box, Button, Card, CardActions, CardContent, CardMedia, Skeleton, Typography } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

type CardCatalogProps = {
  name: string;
  image: string;
  price: number;
  stock: number;
  onAddToCart: () => void;
  onProductClick: () => void;
}

const CatalogCard = ({ name, image, price, stock, onAddToCart, onProductClick }: CardCatalogProps) => {
  return (
    <Card sx={{ width: 320 }}>
      <CardMedia
        sx={{ height: 180 }}
        image="https://i.cbc.ca/1.5913747.1613256030!/cumulusImage/httpImage/image.jpg_gen/derivatives/16x9_780/maple-syrup-shutterstock.jpg"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div" sx={{ flexGrow: 1 }}>
          { name }
        </Typography>
        <Typography variant="body2" color="text.secondary">
          $150
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" startIcon={<ShoppingCartIcon />} fullWidth>Add to cart</Button>
      </CardActions>
    </Card>
  );
}

export default CatalogCard;