import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
// PrismaClientのインスタンス化とデータベースへの接続を行う
export class PrismaService extends PrismaClient {
  constructor(private readonly config: ConfigService) {
    super({
      datasources: {
        db: {
          url: config.get('DATABASE_URL'),
        },
      },
    });
  }
}
// PrismaClient:データベースに接続するための処理などが記載されている
// ConfigService:.envをロードする
