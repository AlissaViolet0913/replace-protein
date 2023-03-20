import { IsNotEmpty, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

export class FavoriteDto {
  @IsNotEmpty()
  @Type(() => Number)
  itemId?: number;
}
