import { IsEnum, IsOptional } from 'class-validator';
import { ProductType } from 'src/products/enums/product-type.enum';

export class TypeParams {
  @IsEnum(ProductType, {
    message: 'type must be a valid enum value [AMBER, GOLD, CLEAR]',
  })
  @IsOptional()
  type?: string;
}
