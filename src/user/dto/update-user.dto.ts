// ユーザーの内容を更新するためのエンドポイントにクライアントからトランスファーされてくるオブジェクトをdtoとして定義する

import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  firstName?: string;
  lastName?: string;
  firsrNameKana?: string;
  lastNameKana?: string;
  middleName?: string;
  email?: string;
  postCode?: string;
  prefecture?: string;
  city?: string;
  aza?: string;
  building?: string;
  tel?: string;
}
