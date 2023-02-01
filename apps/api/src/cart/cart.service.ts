import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from 'src/products/schema/product.schema';
import { CartLineDto } from './dto/cart-line.dto';
import { Cart, CartDocument } from './schema/cart.schema';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name)
    private cartModel: Model<CartDocument>,
    @InjectModel(Product.name)
    private productModel: Model<ProductDocument>,
  ) {}

  async findAll(): Promise<CartLineDto[]> {
    const cartItems = await this.cartModel.find().populate('productId');

    return cartItems.map((cartItem) => this.entityToDto(cartItem));
  }

  async addToCart(productId: string): Promise<CartLineDto> {
    const existingCartItem = await this.findCartItemByProductId(productId);

    if (!existingCartItem) {
      const createdCartItem = await this.createCartItem(productId);

      return this.entityToDto(createdCartItem);
    }

    if (existingCartItem.productId.stock < existingCartItem.qty + 1) {
      this.throwProductStockError(existingCartItem.productId.stock);
    }

    existingCartItem.qty += 1;
    existingCartItem.save();
  }

  async updateOrCreate(productId: string, qty = 1): Promise<CartLineDto> {
    const existingCartItem = await this.findCartItemByProductId(productId);

    if (!existingCartItem) {
      const createdCartItem = await this.createCartItem(productId, qty);

      return this.entityToDto(createdCartItem);
    }

    if (existingCartItem.productId.stock < qty) {
      this.throwProductStockError(existingCartItem.productId.stock);
    }

    existingCartItem.qty = qty;
    existingCartItem.save();

    return this.entityToDto(existingCartItem);
  }

  async remove(productId: string): Promise<{ deleted: boolean }> {
    const existingCartItem = await this.cartModel.findOneAndRemove({
      productId,
    });

    if (!existingCartItem) {
      throw new NotFoundException(
        `No cart item found with product id ${productId}`,
      );
    }

    return { deleted: true };
  }

  private entityToDto(cart: Cart): CartLineDto {
    return {
      productId: cart.productId._id,
      name: cart.productId.name,
      image: cart.productId.image,
      price: cart.productId.price,
      qty: cart.qty,
    };
  }

  private throwProductStockError(productStock: number) {
    throw new BadRequestException('MAX_STOCK_ERROR');
  }

  private async findCartItemByProductId(
    productId: string,
  ): Promise<CartDocument> {
    return await this.cartModel.findOne({ productId }).populate('productId');
  }

  private async createCartItem(productId: string, qty = 1): Promise<Cart> {
    const existingProduct = await this.productModel.findById(productId).exec();

    if (!existingProduct) {
      throw new NotFoundException(`Product with id ${productId} not found`);
    }

    if (existingProduct.stock < qty) {
      this.throwProductStockError(existingProduct.stock);
    }

    const cartItemCreated = await this.cartModel.create({
      productId,
      qty,
    });

    return cartItemCreated;
  }
}
