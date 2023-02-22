import { IsOptional } from 'class-validator';

export class IntoCartDto {
  @IsOptional()
  userId?: number;
  itemId?: number;
  imageUrl?: string;
  name?: string;
  flavor?: string;
  price?: number;
  countity?: number;
}
