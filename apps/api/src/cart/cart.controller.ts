import { Controller, Get, Body, Patch, Delete, Query } from '@nestjs/common';
import { CartService } from './cart.service';
import { ProductIdParams } from './dto/params/product-id.params';
import { UpdateOrCreateCartDto } from './dto/update-or-create-cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  findAll() {
    return this.cartService.findAll();
  }

  @Patch()
  update(
    @Query() params: ProductIdParams,
    @Body() updateCartDto: UpdateOrCreateCartDto,
  ) {
    return this.cartService.updateOrCreate(params.productId, updateCartDto);
  }

  @Delete()
  remove(@Query() params: ProductIdParams) {
    return this.cartService.remove(params.productId);
  }
}
