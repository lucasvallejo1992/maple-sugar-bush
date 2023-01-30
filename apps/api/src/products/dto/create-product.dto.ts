import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
} from 'class-validator';
import { ProductType } from '../enums/product-type.enum';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  image: string;

  @IsPositive()
  price: number;

  @IsInt()
  @IsPositive()
  stock: number;

  @IsEnum(ProductType, {
    message: 'type must be a valid enum value [AMBER, DARK, CLEAR]',
  })
  @IsNotEmpty()
  type: ProductType;
}
