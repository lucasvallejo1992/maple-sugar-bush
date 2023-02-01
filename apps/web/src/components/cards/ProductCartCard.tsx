import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, Card, CardContent, CardMedia, FilledInput, FormControl, InputAdornment, TextField, Typography } from '@mui/material';

import { ProductCart } from '../../types/productCart.type';

const integerRegex = /^\d+$/;

type ProductCartCardActions = {
  onRemoveItem: () => void;
  onUpdateQty: (qty: number) => void;
} 

type ProductCartCardProps = ProductCart & ProductCartCardActions;

const ProductCartCard = ({ image, name, price, qty, onRemoveItem, onUpdateQty }: ProductCartCardProps) => {

  return (
    <Card sx={{ display: 'flex', maxWidth: 600 }}>
      <CardMedia
        component="img"
        sx={{ width: 150 }}
        image={image}
        alt="Live from space album cover"
      />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            { name }
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            ${ price }
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
          <FormControl sx={{ m: 1 }} variant="filled">
            <TextField
              label="Quantity"
              size="small"
              value={qty}
              onChange={({ target }) => {
                const value = integerRegex.test(target.value) ? Number(target.value) : 0;

                if (value > 0) {
                  onUpdateQty(value);
                }
              }}
            />
          </FormControl>
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={onRemoveItem}
          >
            Remove
          </Button>
        </Box>
      </Box>
    </Card>
  );
}

export default ProductCartCard;