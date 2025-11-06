import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.usersService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email };

    const access_token = await this.jwtService.signAsync(
      payload as any,
      {
        secret: process.env.JWT_SECRET || 'super_secret_change_me',
        expiresIn: process.env.JWT_EXPIRES || '7d',
      } as JwtSignOptions,
    );

    return {
      access_token,
      user: {
        id: user.id,
        email: user.email,
      },
      expires_in: process.env.JWT_EXPIRES || '7d',
      token_type: 'Bearer',
    };
  }
}
