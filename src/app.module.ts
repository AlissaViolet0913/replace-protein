import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { CartModule } from './cart/cart.module';
import { FavoriteModule } from './favorite/favorite.module';
import { PurchaseModule } from './purchase/purchase.module';
import { ItemModule } from './item/item.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { SearchModule } from './search/search.module';
import { MiddlewareConsumer, RequestMethod } from '@nestjs/common';
// import { CorsMiddleware } from './cors.middleware';
// import { CorsMiddleware } from '@nestjs/platform-express';
import * as cors from 'cors';
import { CorsMiddleware } from './cors.middleware';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UserModule,
    PrismaModule,
    CartModule,
    FavoriteModule,
    PurchaseModule,
    ItemModule,
    SubscriptionModule,
    SearchModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      // .apply(cors())
      .apply(CorsMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
