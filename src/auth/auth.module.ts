import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaModule } from 'src/prisma/prisma.module';
// import { PayloadStratedy } from './strategy/payload.strategy';
// import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  // PrismaModule:envにあるデータベースURLからデータを取得する
  // JwtModule.register:AuthサービスからJwtServiceを利用できるようにする
  // ※providersはServiceの登録を行う
  controllers: [AuthController],
  providers: [AuthService],
  // providers: [AuthService, JwtStrategy],
  imports: [PrismaModule],
  // imports: [PrismaModule, JwtModule.register({})],
})
export class AuthModule {}
