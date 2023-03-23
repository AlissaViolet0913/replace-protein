import { IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class IntoSubscriptionDto {
  @IsNotEmpty()
  @Type(() => Number)
  itemId?: number;

  @IsNotEmpty()
  @Type(() => Number)
  countity?: number;
}
