import { IsNotEmpty } from 'class-validator';

export class IntoPurchaseDto {
  @IsNotEmpty()
  item?: object;
}
