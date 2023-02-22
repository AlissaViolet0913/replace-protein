import { IsOptional } from 'class-validator';

export class IntoFavoriteDto {
  userId?: number;
  itemIdFav?: number;
  id: number;
}
