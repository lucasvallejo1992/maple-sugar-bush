import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ProductType } from '../enums/product-type.enum';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  _id: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: String, required: true })
  image: string;

  @Prop({ type: Number, required: true })
  price: number;

  @Prop({ type: Number, required: true })
  stock: number;

  @Prop({ type: String, enum: ProductType, required: true })
  type: ProductType;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Boolean, default: true })
  active: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
