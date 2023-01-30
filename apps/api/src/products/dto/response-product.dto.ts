import { ProductType } from '../enums/product-type.enum';

export class ResponseProductDto {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  stock: number;
  type: ProductType;
}
