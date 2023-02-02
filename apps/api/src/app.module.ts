import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';
import { MongooseModule } from '@nestjs/mongoose';
import { configs } from './config';
import { CommandModule } from 'nestjs-command';

@Module({
  imports: [
    MongooseModule.forRoot(configs.mongoDbConnectionString, {
      dbName: configs.mongoDbDatabaseName,
    }),
    CommandModule,
    ProductsModule,
    CartModule,
    OrderModule,
  ],
})
export class AppModule {}
