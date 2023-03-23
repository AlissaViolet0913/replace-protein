import { SubscriptionService } from './subscription.service';
import { Body, Controller, Get, Req, Post } from '@nestjs/common';
import { Request } from 'express';
import { IntoSubscriptionHtDto } from './dto/into-subscriptionHt.dto';
import { IntoSubscriptionDto } from './dto/into-subscription.dto';

@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  // 購入履歴
  @Post('/history')
  updateSubscriptionHt(
    @Req() req: Request,
    @Body() dto: IntoSubscriptionHtDto,
  ) {
    const idToNumber = Number(req.cookies.id);
    return this.subscriptionService.intoSubscriptionHtData(idToNumber, dto);
  }

  @Get('/history')
  getUserSubscriptionHt(@Req() req: Request) {
    const idToNumber = Number(req.cookies.id);
    return this.subscriptionService.getUserSubscriptionHt(idToNumber);
  }

  // 定期購入
  @Post()
  updateSubscripsion(@Req() req: Request, @Body() dto: IntoSubscriptionDto) {
    const idToNumber = Number(req.cookies.id);
    return this.subscriptionService.intoSubscriptionData(idToNumber, dto);
  }

  @Get()
  getUserSubscription(@Req() req: Request) {
    const idToNumber = Number(req.cookies.id);
    return this.subscriptionService.getUserSubscription(idToNumber);
  }

  // サブスク購入カート
  @Post('/cart')
  updateSubscripsionCart(
    @Req() req: Request,
    @Body() dto: IntoSubscriptionDto,
  ) {
    const idToNumber = Number(req.cookies.id);
    return this.subscriptionService.intoSubscriptionCartData(idToNumber, dto);
  }

  @Get('/cart')
  getUserSubscriptionCart(@Req() req: Request) {
    const idToNumber = Number(req.cookies.id);
    return this.subscriptionService.getUserSubscriptionCart(idToNumber);
  }
}
