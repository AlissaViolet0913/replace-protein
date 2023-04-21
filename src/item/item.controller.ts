import { Controller, Post, Body, Res, Req, Get, Param } from '@nestjs/common';
import { Msg } from 'src/auth/interfaces/auth.interface';
import { Request } from 'express';
import { ItemService } from './item.service';
import { Item } from '@prisma/client';
import { ItemDto } from './dto/itemup.dto';
import { FlavorDto } from '../search/dto/flavor.dto';
import { CategoryDto } from '../search/dto/category.dto';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  // 商品詳細情報取得
  // 「:id」を使用することで動的な変数を受け取ることができ、@Param()デコレータを使用することでアクセスすることができる
  // @parmasに引数を指定することで特定のキーの値のみを取得
  @Get(':id')
  getItemDetail(@Param() params: Item) {
    const paramsId = params.id;
    return this.itemService.itemDetail(paramsId);
    // console.log(paramsId);
  }

  // 全商品情報取得
  @Get()
  getItems() {
    return this.itemService.itemAll();
  }

  // 商品情報追加
  @Post()
  itemUp(@Body() dto: ItemDto): Promise<Msg> {
    console.log('itemUp');
    return this.itemService.itemUp(dto);
  }
}
