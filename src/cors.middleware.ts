// middlewareはNestJSのコア機能
// HTTPリクエストに対して前処理や後処理を実行できる機能
// リクエストに対してフィルタリング、ログ出力、認証、キャッシュ制御などの処理を行える
// クラスとして定義
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class CorsMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // 全てのドメインからのリクエストを許可する
    // res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Origin', 'http://frontend:3000');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept',
    );
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
    // 現在のmiddleware処理が終わり、次のmiddlewareに処理を渡すために呼び出される
    next();
  }
}
