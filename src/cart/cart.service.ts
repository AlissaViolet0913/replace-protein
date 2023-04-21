import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ForbiddenException } from '@nestjs/common/exceptions';
import { Msg } from 'src/auth/interfaces/auth.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { DeleteCartDto } from './dto/delete-cart.dto';
import { IntoCartDto } from './dto/into-Cart.dto';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  // カートに商品を追加
  async intoCart(userId: number, dto: IntoCartDto) {
    const toNumberItemId = Number(dto.itemId);
    const toNumberCountity = Number(dto.countity);
    const cart = await this.prisma.cart.upsert({
      where: {
        id: Number(`${userId}.${dto.itemId}`),
      },
      update: {
        itemId: toNumberItemId,
        countity: toNumberCountity,
      },
      create: {
        userId: userId,
        id: Number(`${userId}.${dto.itemId}`),
        itemId: toNumberItemId,
        countity: toNumberCountity,
      },
    });
    return cart;
  }

  async getUserCart(userId: number) {
    const cartUser = await this.prisma.cart.findMany({
      where: {
        userId: userId,
      },
    });
    if (!cartUser) {
      throw new UnauthorizedException('ユーザー情報の取得に失敗しました');
    }
    console.log(cartUser);
    return cartUser;
    // return cartUser.map((item) => item.itemId);
  }

  async deleteCart(userId: number, dto: DeleteCartDto): Promise<void> {
    const wannaDelete = await this.prisma.cart.findUnique({
      where: {
        id: Number(`${userId}.${dto.itemId}`),
      },
    });
    if (!wannaDelete || wannaDelete.id !== Number(`${userId}.${dto.itemId}`)) {
      throw new ForbiddenException('No permission to delete');
    }

    await this.prisma.cart.delete({
      where: {
        id: Number(`${userId}.${dto.itemId}`),
      },
    });
  }
}
