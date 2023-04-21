import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Res,
  Req,
  Get,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { LoginDto } from './dto/login.dto';
import { Csrf, Msg } from './interfaces/auth.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // auth/csrfにGETでアクセスしたときにcsrftokenを返却するエンドポイント
  @Get('/csrf')
  getCsrfToken(@Req() req: Request): Csrf {
    // csrfTokenの名前をつけて渡す
    return { csrfToken: req.csrfToken() };
  }

  // ユーザー新規登録
  @Post('/signup')
  signUp(@Body() dto: AuthDto): Promise<Msg> {
    console.log('signUp');
    return this.authService.signUp(dto);
  }

  //  ログイン
  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const id = await this.authService.login(dto);
    res.cookie('access_token', id.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/',
      // maxAge: 86400,
    });
    const userIdToken = id.accessToken;
    res.setHeader('Set-Cookie', [
      `id=${userIdToken.id}; max-age=86400; path=/`,
      // max-age保持させる期限
    ]);
    console.log(userIdToken);
    // return {
    //   message: 'login success',
    // };
    return userIdToken.id;
  }

  // ログアウト
  @HttpCode(HttpStatus.OK)
  @Post('/logout')
  logout(@Req() req: Request, @Res({ passthrough: true }) res: Response): Msg {
    // ''空をセットすることでcoookieをリセット
    res.cookie('access_token', '', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/',
    });
    return {
      message: 'logout success',
    };
  }
}
