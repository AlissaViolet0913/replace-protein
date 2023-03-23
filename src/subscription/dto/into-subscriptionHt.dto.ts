import { IsNotEmpty } from 'class-validator';

export class IntoSubscriptionHtDto {
  @IsNotEmpty()
  item?: object;
}
