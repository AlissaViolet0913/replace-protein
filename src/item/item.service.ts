import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { Msg } from 'src/auth/interfaces/auth.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { CategoryDto } from '../search/dto/category.dto';
import { FlavorDto } from '../search/dto/flavor.dto';
import { ItemDto } from './dto/itemup.dto';

@Injectable()
export class ItemService {
  constructor(private readonly prisma: PrismaService) {}

  // 商品詳細情報取得
  async itemDetail(paramsId: number) {
    const detail = await this.prisma.item.findFirst({
      where: {
        id: Number(paramsId),
      },
    });
    if (!detail) throw new ForbiddenException("the item isn't exist.");
    return detail;
  }

  // 商品情報を全て取得
  async itemAll() {
    const allItems = await this.prisma.item.findMany();
    if (!allItems) {
      console.log('Items not found');
    }
    console.log(allItems);
    return allItems;
  }

  // 商品情報追加
  async itemUp(dto: ItemDto): Promise<Msg> {
    console.log(dto);
    try {
      await this.prisma.item.create({
        data: {
          imageUrl: dto.imageUrl,
          name: dto.name,
          category: dto.category,
          flavor: dto.flavor,
          price: dto.price,
          description: dto.description,
          content: dto.content,
        },
      });
      return {
        message: 'created item',
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'p2002') {
          throw new ForbiddenException('This item is already registered');
        }
      }
      throw error;
    }
  }
}
