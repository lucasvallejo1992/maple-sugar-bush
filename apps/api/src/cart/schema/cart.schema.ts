import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Product } from 'src/products/schema/product.schema';

export type CartDocument = HydratedDocument<Cart>;

@Schema()
export class Cart {
  _id: string;

  @Prop({ type: Number, required: true })
  qty: number;

  @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
  productId: Product;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
