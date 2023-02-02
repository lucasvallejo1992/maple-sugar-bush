import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { ProductsService } from '../products.service';
import { productList } from './data/product-list';

@Injectable()
export class ProductsSeed {
  constructor(private readonly productsService: ProductsService) {}

  @Command({
    command: 'seed:products',
    describe: 'create products',
  })
  async create() {
    for (const product of productList) {
      await this.productsService.create(product);
    }
    console.log('[SUCCESS]: products collection seeded');
  }
}
