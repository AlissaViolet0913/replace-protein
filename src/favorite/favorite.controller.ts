import { FavoriteService } from './favorite.service';
import { Request } from 'express';
import {
  Body,
  Controller,
  Get,
  Patch,
  Req,
  UseGuards,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { FavoriteDto } from './dto/into-favorite.dto';

@Controller('favorite')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Patch()
  updateFavorite(@Req() req: Request, @Body() dto: FavoriteDto) {
    // : Promise<Omit<User, 'hashedPassword'>>
    const idToNumber = Number(req.cookies.id);
    return this.favoriteService.intoFavorite(idToNumber, dto);
  }

  @Get()
  getUserFavorites(@Req() req: Request) {
    const idToNumber = Number(req.cookies.id);
    return this.favoriteService.getUserFavorites(idToNumber);
  }

  // お気に入り一覧から商品情報を削除
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete()
  deleteCart(
    @Req() req: Request,
    // @Param('id', ParseIntPipte) itemId: number,
    @Body() dto: FavoriteDto,
  ): Promise<void> {
    const idToNumber = Number(req.cookies.id);
    return this.favoriteService.deleteFavorite(idToNumber, dto);
  }
}
