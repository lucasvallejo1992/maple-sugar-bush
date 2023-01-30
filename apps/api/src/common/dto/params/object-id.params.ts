import { IsMongoId, IsString } from 'class-validator';

export class ObjectIdParams {
  @IsMongoId()
  @IsString()
  id: string;
}
