import { FavoriteService } from './favorite.service';
import { Request } from 'express';
import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { IntoFavoriteDto } from './dto/into-favorite.dto';
import { User } from '@prisma/client';
import { Delete, Post } from '@nestjs/common/decorators';

@Controller('favorite')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Patch()
  updateFavorite(@Req() req: Request, @Body() dto: IntoFavoriteDto) {
    // : Promise<Omit<User, 'hashedPassword'>>
    const idToNumber = Number(req.cookies.id);
    return this.favoriteService.intoFavorite(idToNumber, dto);
  }

  @Get()
  getUserFavorites(@Req() req: Request) {
    const idToNumber = Number(req.cookies.id);
    return this.favoriteService.getUserFavorites(idToNumber);
  }

  // @Delete()
  // deleteUserFavs(@Req() req:Request){

  // }
}
