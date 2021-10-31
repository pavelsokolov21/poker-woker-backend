import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { JwtTokensService } from '../../jwt-tokens/services/jwt-tokens.service';
import { UserService } from '../../user/user.service';
import { UserDocument } from '../../user/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtTokensService: JwtTokensService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findUserByEmail(email);

    if (!user) {
      throw new NotFoundException('User with this email does not exist');
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      throw new UnauthorizedException('Password mismatch');
    }

    return user;
  }

  async login(user: UserDocument) {
    const payload = { id: user.id, email: user.email };

    return {
      access_token: this.jwtTokensService.getAccessToken(payload),
      refresh_token: this.jwtTokensService.getRefreshToken(user.id),
    };
  }
}
