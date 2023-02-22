import { AuthGuard } from '@nestjs/passport';
import { Body, Controller, Get, Req, UseGuards, Patch } from '@nestjs/common';
import { Request } from 'express';
import { UpdateUserDto } from './dto/update-cart.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('cart')
export class CartController {
  // // カートに商品を追加
  // @Patch()
  // updateCart(@Req() req: Request, @Body() dto: UpdateUserDto);
  // // ログインしているユーザーのカート情報を取得
  // @Get()
  // getUserCart(@Req() req: Request) {
  //   return req.cart;
  // }
}
