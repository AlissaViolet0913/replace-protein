import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getLoginUser(loginUser: number) {
    const detailUser = await this.prisma.user.findUnique({
      where: {
        id: loginUser,
      },
    });
    if (!detailUser) {
      throw new UnauthorizedException('ユーザーの認証に失敗しました');
    }
    delete detailUser.hashedPassword;
    return detailUser;
  }

  // ユーザー情報内容を更新
  async updateUser(
    userId: number,
    dto: UpdateUserDto,
  ): Promise<Omit<User, 'hashedPassword'>> {
    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...dto,
      },
    });

    delete user.hashedPassword;
    return user;
  }
}
