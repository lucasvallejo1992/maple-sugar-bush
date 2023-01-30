import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ObjectIdParams } from 'src/common/dto/params/object-id.params';
import { TypeParams } from './dto/params/type.params';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll(@Query() params: TypeParams) {
    return this.productsService.findAll(params.type);
  }

  @Get(':id')
  findOne(@Param() params: ObjectIdParams) {
    return this.productsService.findOne(params.id);
  }

  @Patch(':id')
  update(
    @Param() params: ObjectIdParams,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(params.id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param() params: ObjectIdParams) {
    return this.productsService.remove(params.id);
  }
}
