import { IconButton } from "@mui/material";
import Badge, { BadgeProps } from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

type CartButtonProps = {
  count: number;
  onClick: () => void;
}

const CartButton = ({ count, onClick}: CartButtonProps) => (
  <IconButton aria-label="cart" onClick={onClick}>
    <StyledBadge badgeContent={count} color="primary">
      <ShoppingCartIcon color="primary" />
    </StyledBadge>
  </IconButton>
)

export default CartButton;

