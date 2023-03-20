// import { AuthGuard } from '@nestjs/passport';
import {
  Body,
  Controller,
  Get,
  Req,
  UseGuards,
  Patch,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { Request } from 'express';
import { IntoCartDto } from './dto/into-Cart.dto';
import { CartService } from './cart.service';
import { DeleteCartDto } from './dto/delete-cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}
  // カートに商品を追加
  @Patch()
  updateCart(@Req() req: Request, @Body() dto: IntoCartDto) {
    const idToNumber = Number(req.cookies.id);
    return this.cartService.intoCart(idToNumber, dto);
  }
  // ログインしているユーザーのカート情報を取得
  @Get()
  getUserCart(@Req() req: Request) {
    const idToNumber = Number(req.cookies.id);
    return this.cartService.getUserCart(idToNumber);
  }

  // カートの商品を削除
  // :idはtoServixe.deleteCart
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete()
  deleteCart(
    @Req() req: Request,
    // @Param('id', ParseIntPipte) itemId: number,
    @Body() dto: DeleteCartDto,
  ): Promise<void> {
    const idToNumber = Number(req.cookies.id);
    return this.cartService.deleteCart(idToNumber, dto);
  }
}
