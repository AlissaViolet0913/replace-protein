import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';

@Module({
  controllers: [ItemController],
  providers: [ItemService, PrismaService],
  imports: [PrismaModule],
})
export class ItemModule {}
