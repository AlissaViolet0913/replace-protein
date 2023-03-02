import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { FavoriteController } from './favorite.controller';
import { FavoriteService } from './favorite.service';

@Module({
  controllers: [FavoriteController],
  providers: [FavoriteService],
  imports: [PrismaModule],
})
export class FavoriteModule {}
