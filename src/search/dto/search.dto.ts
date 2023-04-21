import { Type } from 'class-transformer';
import { IsNumber, IsNotEmpty, IsString, IsArray } from 'class-validator';

export class SearchDto {
  static filter(flavor: string): any {
    throw new Error('Method not implemented.');
  }
  @IsString()
  flavor: string;

  @IsString()
  category: string;
}
