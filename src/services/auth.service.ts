import { UsersRepository } from '@root/repository/users.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from '@root/shared/types';
import { JWT_SECRET } from '@root/shared/constantes';
interface Credentials {
  email: string;
  password: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly UsersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}
  public async login(credentials: Credentials): Promise<string> {
    const { email, password } = credentials;
    const user = await this.UsersRepository.getUserByEmail(email);
    const passWordMatch = await compare(password, user?.password ?? '');
    if (!user || !passWordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: TokenPayload = {
      sub: user.id,
      name: user.name,
      email: user.email,
      exp: Math.floor(Date.now() / 1000) + 60 * 60, // 1 hour
      iat: Math.floor(Date.now() / 1000),
      aud: 'ifood-freelancer',
    };

    const token = await this.jwtService.signAsync(payload, {
      secret: JWT_SECRET,
    });
    return token;
  }
}
