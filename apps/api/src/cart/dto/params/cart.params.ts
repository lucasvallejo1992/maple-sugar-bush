import { IsInt, IsMongoId, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CartParams {
  @IsMongoId()
  @IsString()
  productId: string;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  newQty?: string;
}
