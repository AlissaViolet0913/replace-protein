import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable, Req, UnauthorizedException } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class PayloadStratedy {
  constructor(private readonly prisma: PrismaService) {}

  async getLoginUser(loginUser: { id: number }) {
    const detailUser = await this.prisma.user.findUnique({
      where: {
        id: loginUser.id,
      },
    });
    if (!detailUser) {
      throw new UnauthorizedException('ユーザーの認証に失敗しました');
    }
    delete detailUser.hashedPassword;
    return detailUser;
  }
}
