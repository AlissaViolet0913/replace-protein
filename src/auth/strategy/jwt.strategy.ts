import { Injectable } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../../prisma/prisma.service';

// jwtFromRequestを使ってtokenを取得し、secretOrKeyを使ってtokenを検証。
// validateメソッドでTokenのpayload(ペイロード)が有効であることを検証

// JWTをカスタマイズする（super()の引数にjwtFromrequest:jwt、ignoreExpiration, secretOrKeyの3つが入っている）
// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
//   constructor(
//     private readonly config: ConfigService,
//     private readonly prisma: PrismaService,
//   ) {
//     // super()＝PassportStrategyクラスのconstructor()？？？
//     super({
//       // JWTの抽出
//       jwtFromRequest: ExtractJwt.fromExtractors([
//         (req) => {
//           let jwt = null;
//           if (req && req.cookies) {
//             jwt = req.cookies['access_token'];
//           }
//           return jwt;
//         },
//       ]),
//       // 有効期限を無視しない
//       ignoreExpiration: false,
//       // envファイルから秘密鍵を渡す（configservice.get()で環境変数を取得）
//       secretOrKey: config.get('JWT_SECRET'),
//     });
//   }
// payloadを使ったバリデーション処理の実行
// payloadはauth.serviceのloginところで(JWTを生成する際に使用された)定義された値
// ログイン時JWT生成した時に使用したuserIdと一致するuserを探す
//   async validate(payload: { sub: number; email: string }) {
//     const user = await this.prisma.user.findUnique({
//       where: {
//         id: payload.sub,
//       },
//     });
//     if (!user) {
//       throw new UnauthorizedException('ユーザーの認証に失敗しました');
//     }
//     delete user.hashedPassword;
//     return user;
//   }
// }

// AuthGuard：validateのメソッドの返り値のユーザーオブジェクト（JWTを解析）
// AuthGuardとは、認証しているか判定していない場合はサインイン画面に遷移させたりする機能のこと

// ＝ログインしているユーザーのユーザーオブジェクトをreturnで返してくれる
// このユーザーオブジェクトを自動的にリクエストに含めてくれる
//
// このInjektableを使用できるようにするにはauth.module.tsに追記が必要
