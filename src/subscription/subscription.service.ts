import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { IntoSubscriptionDto } from './dto/into-subscription.dto';
import { IntoSubscriptionHtDto } from './dto/into-subscriptionHt.dto';

@Injectable()
export class SubscriptionService {
  constructor(private prisma: PrismaService) {}

  // サブスク購入履歴を追加
  async intoSubscriptionHtData(userId: number, dto: IntoSubscriptionHtDto) {
    await this.prisma.subscriptionHistories.create({
      data: {
        userId: Number(userId),
        item: dto.item,
      },
    });
    console.log(dto.item);
    return {
      message: 'done',
    };
  }

  // サブスク購入履歴の取得
  async getUserSubscriptionHt(userId: number) {
    const purchaseUser = await this.prisma.subscriptionHistories.findMany({
      where: {
        userId: userId,
      },
    });
    if (!purchaseUser) {
      throw new UnauthorizedException('ユーザー情報の取得に失敗しました');
    }
    const purchaseData = purchaseUser.map((item) => item.item);
    console.log(purchaseData);
    return purchaseData;
  }

  // サブスク購入を追加(定期購入の停止で使用)
  async intoSubscriptionData(userId: number, dto: IntoSubscriptionDto) {
    await this.prisma.subscription.create({
      data: {
        userId: Number(userId),
        itemId: Number(dto.itemId),
        countity: Number(dto.countity),
      },
    });
    console.log(dto.itemId);
    return {
      message: 'done',
    };
  }

  // サブスク購入の取得（定期購入の停止で使用）
  async getUserSubscription(userId: number) {
    const purchaseUser = await this.prisma.subscription.findMany({
      where: {
        userId: userId,
      },
    });
    if (!purchaseUser) {
      throw new UnauthorizedException('ユーザー情報の取得に失敗しました');
    }
    const purchaseData = purchaseUser.map((item) => item.itemId);
    console.log(purchaseData);
    return purchaseData;
  }

  // サブスクカートを追加
  async intoSubscriptionCartData(userId: number, dto: IntoSubscriptionDto) {
    await this.prisma.subscriptionCart.create({
      data: {
        userId: Number(userId),
        itemId: Number(dto.itemId),
        countity: Number(dto.countity),
      },
    });
    console.log(dto.itemId);
    return {
      message: 'done',
    };
  }

  // サブスクカートの取得
  async getUserSubscriptionCart(userId: number) {
    const purchaseUser = await this.prisma.subscriptionCart.findMany({
      where: {
        userId: userId,
      },
    });
    if (!purchaseUser) {
      throw new UnauthorizedException('ユーザー情報の取得に失敗しました');
    }
    const purchaseData = purchaseUser.map((item) => item.itemId);
    console.log(purchaseData);
    return purchaseData;
  }
}
