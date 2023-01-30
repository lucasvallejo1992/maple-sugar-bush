import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from 'src/products/schema/product.schema';
import { UpdateOrCreateCartDto } from './dto/update-or-create-cart.dto';
import { Cart, CartDocument } from './schema/cart.schema';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name)
    private cartModel: Model<CartDocument>,
    @InjectModel(Product.name)
    private productModel: Model<ProductDocument>,
  ) {}

  async findAll() {
    return await this.cartModel.find().populate('productId');
  }

  async updateOrCreate(
    productId: string,
    updateCartDto: UpdateOrCreateCartDto,
  ): Promise<Cart> {
    const existingCartItem = await this.cartModel
      .findOne({ productId })
      .populate('productId');

    if (!existingCartItem) {
      return await this.createCartItem(productId, updateCartDto);
    }

    if (existingCartItem.productId.stock < updateCartDto.qty) {
      this.throwProductStockError(existingCartItem.productId.stock);
    }

    existingCartItem.qty = updateCartDto.qty;
    existingCartItem.save();

    return existingCartItem;
  }

  remove(id: string) {
    return `This action removes a #${id} cart`;
  }

  private throwProductStockError(productStock: number) {
    throw new BadRequestException(`The product stock is ${productStock}`);
  }

  private async createCartItem(
    productId: string,
    updateCartDto: UpdateOrCreateCartDto,
  ): Promise<Cart> {
    const existingProduct = await this.productModel.findById(productId).exec();

    if (!existingProduct) {
      throw new NotFoundException(`Product with id ${productId} not found`);
    }

    if (existingProduct.stock < updateCartDto.qty) {
      this.throwProductStockError(existingProduct.stock);
    }

    const cartItemCreated = await this.cartModel.create({
      productId,
      ...updateCartDto,
    });

    return cartItemCreated;
  }
}
