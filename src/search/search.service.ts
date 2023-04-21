import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CategoryDto } from './dto/category.dto';
import { FlavorDto } from './dto/flavor.dto';
import { SearchDto } from './dto/search.dto';

@Injectable()
export class SearchService {
  constructor(private readonly prisma: PrismaService) {}

  // 両方検索
  async searchItems(dto: SearchDto) {
    const allItems = await this.prisma.item.findMany({
      where: {
        flavor: {
          has: dto.flavor,
        },
        category: dto.category,
      },
    });
    if (!allItems) throw new ForbiddenException('該当商品はありません');
    return allItems;
  }

  // カテゴリ検索
  async searchCategory(dto: CategoryDto) {
    const allItems = await this.prisma.item.findMany({
      where: {
        category: dto.category,
      },
    });
    if (!allItems) throw new ForbiddenException('該当商品はありません');
    return allItems;
  }
  // フレーバー検索
  async searchFlavor(dto: FlavorDto) {
    const allItems = await this.prisma.item.findMany({
      where: {
        flavor: {
          has: dto.flavor,
        },
      },
    });
    if (!allItems) throw new ForbiddenException('該当商品はありません');
    return allItems;
  }
}
