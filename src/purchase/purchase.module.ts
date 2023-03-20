import { Module } from '@nestjs/common';
import { PurchaseController } from './purchase.controller';
import { PurchaseService } from './purchase.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [PurchaseController],
  providers: [PurchaseService],
  imports: [PrismaModule],
})
export class PurchaseModule {}
