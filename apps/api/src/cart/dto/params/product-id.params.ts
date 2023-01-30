import { IsMongoId, IsString } from 'class-validator';

export class ProductIdParams {
  @IsMongoId()
  @IsString()
  productId: string;
}
