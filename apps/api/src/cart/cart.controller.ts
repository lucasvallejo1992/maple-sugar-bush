import { Controller, Get, Patch, Delete, Query, Put } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartParams } from './dto/params/cart.params';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  findAll() {
    return this.cartService.findAll();
  }

  @Put()
  put(@Query() params: CartParams) {
    return this.cartService.addToCart(params.productId);
  }

  @Patch()
  update(@Query() params: CartParams) {
    return this.cartService.updateOrCreate(params.productId, +params.newQty);
  }

  @Delete()
  remove(@Query() params: CartParams) {
    return this.cartService.remove(params.productId);
  }
}
