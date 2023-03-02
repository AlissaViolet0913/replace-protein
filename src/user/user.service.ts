import {
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { Msg } from 'src/auth/interfaces/auth.interface';

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
  // : Promise<Omit<User, 'hashedPassword'>>
  async updateUser(userId: number, dto: UpdateUserDto): Promise<Msg> {
    let hashed = '';
    if (dto.password === dto.passwordConfirmation) {
      hashed = await bcrypt.hash(dto.password, 12);
    } else {
      throw new ForbiddenException(
        'password and passwordConfimation are diffent',
      );
    }
    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        email: dto.email,
        hashedPassword: hashed,
        firstName: dto.firstName,
        lastName: dto.lastName,
        firstNameKana: dto.firstNameKana,
        lastNameKana: dto.lastNameKana,
        middleName: dto.middleName,
        postCode: dto.postCode,
        prefecture: dto.prefecture,
        city: dto.city,
        aza: dto.aza,
        building: dto.building,
        tel: dto.tel,
      },
    });
    delete user.hashedPassword;
    return {
      message: 'done',
    };
  }
}
