import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { IntoFavoriteDto } from './dto/into-favorite.dto';

@Injectable()
export class FavoriteService {
  constructor(private prisma: PrismaService) {}

  async intoFavorite(userId: number, dto: IntoFavoriteDto) {
    const toNumberItemId = Number(dto.itemId[0]);
    const favorite = await this.prisma.favorite.upsert({
      where: {
        id: Number(`${userId}.${toNumberItemId}`),
        // userId: userId,
      },
      update: {
        // id: toNumberItemId,
        id: Number(`${userId}.${toNumberItemId}`),
        itemId: Number(dto.itemId),
      },
      create: {
        userId: userId,
        id: Number(`${userId}.${toNumberItemId}`),
        itemId: Number(dto.itemId),
      },
    });
    return console.log(favorite);
  }

  async getUserFavorites(loginUser: number) {
    const favoritesUser = await this.prisma.favorite.findMany({
      where: {
        userId: loginUser,
      },
    });
    if (!favoritesUser) {
      throw new UnauthorizedException('ユーザー情報の取得に失敗しました');
    }
    console.log(favoritesUser);
    return favoritesUser.map((item) => item.itemId[0]);
  }
}
