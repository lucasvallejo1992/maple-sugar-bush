import { IsMongoId, IsString } from 'class-validator';

export class IdParams {
  @IsMongoId()
  @IsString()
  id: string;
}
