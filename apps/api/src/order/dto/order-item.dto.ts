import { IsInt, IsMongoId, IsString, Min } from 'class-validator';

export class OrderItemDto {
  @IsInt()
  @Min(1)
  qty: number;

  @IsMongoId()
  @IsString()
  productId: string;
}
