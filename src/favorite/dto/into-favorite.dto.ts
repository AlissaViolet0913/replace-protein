import { IsNotEmpty, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

export class IntoFavoriteDto {
  @IsNotEmpty()
  @Type(() => Number)
  @IsArray()
  itemId?: number[];
}
