import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderItemDto } from './dto/order-item.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @HttpCode(200)
  checkOrder(@Body() orderItemDto: OrderItemDto[]) {
    return this.orderService.checkOrder(orderItemDto);
  }
}
