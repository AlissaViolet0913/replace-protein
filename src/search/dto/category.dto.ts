import { Type } from 'class-transformer';
import { IsNumber, IsNotEmpty, IsString, IsArray } from 'class-validator';

export class CategoryDto {
  @IsString()
  category: string;
}
