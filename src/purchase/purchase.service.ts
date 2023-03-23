import { Injectable } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { PrismaService } from 'src/prisma/prisma.service';
import { IntoPurchaseDto } from './dto/into-purchase';

@Injectable()
export class PurchaseService {
  constructor(private prisma: PrismaService) {}

  // 購入履歴を追加
  async intoPurchaseData(userId: number, dto: IntoPurchaseDto) {
    await this.prisma.purchaseHistories.create({
      data: {
        userId: Number(userId),
        item: dto.item,
      },
    });
    return {
      message: 'done',
    };
    console.log(dto.item);
  }

  // 購入履歴の取得
  async getUserPurchase(userId: number) {
    const purchaseUser = await this.prisma.purchaseHistories.findMany({
      where: {
        userId: userId,
      },
    });
    if (!purchaseUser) {
      throw new UnauthorizedException('ユーザー情報の取得に失敗しました');
    }
    const purchaseData = purchaseUser.map((item: { item: any }) => item.item);
    console.log(purchaseData);
    return purchaseData;
  }
}
