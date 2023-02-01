import { ProductType } from "../enums/ProductType.enum";

export type Product = {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  stock: number;
  type: ProductType;
}