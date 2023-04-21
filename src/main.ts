import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.enableCors({
    credentials: true,
    // リクエストを許可するHTTPメソッド(何も指定していない場合、GETとHEADのみが許可される)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    origin: ['http://localhost:3000'],
  });
  // nestJSでリクエストのcookieを利用する
  app.use(cookieParser());
  await app.listen(3005);
}
bootstrap();
