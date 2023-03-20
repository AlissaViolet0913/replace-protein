import { IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { json } from 'stream/consumers';

export class IntoPurchaseDto {
  @IsNotEmpty()
  item?: object;
}
