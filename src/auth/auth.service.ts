import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { ConfigService } from '@nestjs/config';
// import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto/auth.dto';
import { LoginDto } from './dto/login.dto';
import { Msg, Jwt } from './interfaces/auth.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    // private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  // ユーザー新規作成機能
  async signUp(dto: AuthDto): Promise<Msg> {
    console.log(dto);
    let hashed = '';
    if (dto.password === dto.passwordConfirmation) {
      hashed = await bcrypt.hash(dto.password, 12);
    } else {
      throw new ForbiddenException(
        'password and passwordConfimation are diffent',
      );
    }
    try {
      await this.prisma.user.create({
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
      return {
        message: 'done',
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'p2002') {
          throw new ForbiddenException('This email is already taken');
        }
      }

      throw error;
    }
  }

  // ログイン機能
  // : Promise<Jwt>
  async login(dto: LoginDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        email: dto.email,
      },
    });

    if (!user) throw new ForbiddenException("you don't have your accountt");

    // ハッシュ化されたパスワードと、入力されたパスワードが一致しなかったら、エラーを出す
    const isValid = await bcrypt.compare(dto.password, user.hashedPassword);
    if (!isValid) throw new ForbiddenException('Email or password incorrect');
    return this.generatePayload(user.id);
  }
  // this.generateJwt(user.id, user.email);

  async generatePayload(id: number) {
    const payload = {
      id: id,
    };
    return {
      accessToken: payload,
    };
  }
}

// ログイン時にJWT生成機能
// async generateJwt(userId: number, email: string): Promise<Jwt> {
//   const payload = {
//     sub: userId,
//     email,
//   };
//   const secret = this.config.get('JWT_SECRET');
//   const token = await this.jwt.signAsync(payload, {
//     expiresIn: '120m',
//     secret: secret,
//   });
//   console.log(token);
//   console.log(payload);
//   return {
//     accessToken: token,
//   };
// }
