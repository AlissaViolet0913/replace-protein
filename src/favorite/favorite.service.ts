import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FavoriteDto } from './dto/into-favorite.dto';

@Injectable()
export class FavoriteService {
  constructor(private prisma: PrismaService) {}

  async intoFavorite(userId: number, dto: FavoriteDto) {
    const toNumberItemId = Number(dto.itemId);
    const favorite = await this.prisma.favorite.upsert({
      where: {
        id: Number(`${userId}.${dto.itemId}`),
      },
      update: {
        itemId: toNumberItemId,
      },
      create: {
        userId: userId,
        id: Number(`${userId}.${dto.itemId}`),
        itemId: toNumberItemId,
      },
    });
    return console.log(favorite);
  }

  async getUserFavorites(userId: number) {
    const favoritesUser = await this.prisma.favorite.findMany({
      where: {
        userId: userId,
      },
    });
    if (!favoritesUser) {
      throw new UnauthorizedException('ユーザー情報の取得に失敗しました');
    }
    console.log(favoritesUser);
    return favoritesUser.map((item) => item.itemId);
  }

  async deleteFavorite(userId: number, dto: FavoriteDto): Promise<void> {
    const wannaDelete = await this.prisma.favorite.findUnique({
      where: {
        id: Number(`${userId}.${dto.itemId}`),
      },
    });
    if (!wannaDelete || wannaDelete.id !== Number(`${userId}.${dto.itemId}`)) {
      throw new ForbiddenException('No permission to delete');
    }

    await this.prisma.favorite.delete({
      where: {
        id: Number(`${userId}.${dto.itemId}`),
      },
    });
  }
}
