import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart, CartDocument } from 'src/cart/schema/cart.schema';
import { Product, ProductDocument } from 'src/products/schema/product.schema';
import { OrderItemDto } from './dto/order-item.dto';
import { OrderValidationResponseDto } from './dto/order-validation-response.dto';
import { OrderErrorType } from './enum/order-error-type.enum';

type ProductErrorType = {
  errorType: OrderErrorType;
  productId: string;
};

type ProductType = {
  qty: number;
  product: ProductDocument;
};

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Cart.name)
    private cartModel: Model<CartDocument>,
    @InjectModel(Product.name)
    private productModel: Model<ProductDocument>,
  ) {}

  async checkOrder(
    orderItemDto: OrderItemDto[],
  ): Promise<OrderValidationResponseDto> {
    const existingProductList: ProductType[] = [];
    const errors = [];

    for (const { productId, qty } of orderItemDto) {
      const product = await this.productModel.findById(productId).exec();

      if (!product) {
        const errorObject = {
          errorType: OrderErrorType.NOT_FOUND,
          productId,
        };

        errors.push(this.getProductErrorString(errorObject));
        continue;
      }

      if (product.stock < qty) {
        const errorObject = {
          errorType: OrderErrorType.NOT_ENOUGH_STOCK,
          productId,
        };

        errors.push(this.getProductErrorString(errorObject));
        continue;
      }

      existingProductList.push({ qty, product });
    }

    if (errors.length) {
      return { isOrderValid: false, errors };
    }

    await this.processCartItems(existingProductList);

    return { isOrderValid: true, errors: [] };
  }

  private async processCartItems(productIdList: ProductType[]) {
    for (const { product, qty } of productIdList) {
      await this.cartModel.findOneAndRemove({ productId: product.id });

      product.stock -= qty;
      await product.save();
    }
  }

  private getProductErrorString({
    errorType,
    productId,
  }: ProductErrorType): string {
    return {
      [OrderErrorType.NOT_FOUND]: `Product with id "${productId}" not found`,
      [OrderErrorType.NOT_ENOUGH_STOCK]: `The product stock for item id "${productId}" is not enough`,
    }[errorType];
  }
}
