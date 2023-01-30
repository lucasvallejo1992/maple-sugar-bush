import { IsInt, Min } from 'class-validator';

export class UpdateOrCreateCartDto {
  @IsInt()
  @Min(1)
  qty: number;
}
