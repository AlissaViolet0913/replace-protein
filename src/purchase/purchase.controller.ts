import { Body, Controller, Get, Req, Post } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { Request } from 'express';
import { IntoPurchaseDto } from './dto/into-purchase';

@Controller('purchase')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @Post()
  updatePurchase(@Req() req: Request, @Body() dto: IntoPurchaseDto) {
    const idToNumber = Number(req.cookies.id);
    return this.purchaseService.intoPurchaseData(idToNumber, dto);
  }

  @Get()
  getUserPurchase(@Req() req: Request) {
    const idToNumber = Number(req.cookies.id);
    return this.purchaseService.getUserPurchase(idToNumber);
  }
}
