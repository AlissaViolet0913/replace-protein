// JWTの認証をかけて有効なJWTがリクエストの中に含まれていればログインしているユーザーのユーザー情報を返すエンドポイント
// user.controllerはリクエストにアクセス⇒ユーザーオブジェクトを取り出す
import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';

// jwt.strategy.tsのJwtStrategy.validate()が実行される
// userルートを要求したときに認証を強制
// Nest.jsで認証を導入する場合ではGuardを使用
// ガード（Guard）とは、条件分岐のような意味を持つもので、処理を続けるためにはtrueと評価しなければならない式（認証成功時のみcontrollerの実施）
// AuthGuard＝Authorization guard。リクエストの認証と認可を実現するためのクラス
// useGuardsはミドルウェア。このミドルウェアにJWTtokenベースの認証を使用するためにインスタンス化して組み込んでいる

// @UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // ログインしているユーザーのオブジェクトを取得
  @Get()
  getLoginUser(@Req() req: Request) {
    console.log(req.cookies);
    const idToNumber = Number(req.cookies.id);
    console.log(idToNumber);
    return this.userService.getLoginUser(idToNumber);
  }
  // : Omit<User, 'hashedPassword'>

  // ユーザー情報アップデート
  @Patch()
  updateUser(@Req() req: Request, @Body() dto: UpdateUserDto) {
    const idToNumber = Number(req.cookies.id);
    console.log(idToNumber);
    return this.userService.updateUser(idToNumber, dto);
  }
}
