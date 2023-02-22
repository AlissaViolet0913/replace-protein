import { IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  userId?: number;
  itemId?: number;
}
