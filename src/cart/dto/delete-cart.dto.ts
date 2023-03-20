import { IsNotEmpty, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

export class DeleteCartDto {
  @IsNotEmpty()
  @Type(() => Number)
  itemId?: number;
}
