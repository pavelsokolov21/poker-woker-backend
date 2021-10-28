import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findUserByEmail(email);

    if (!user) {
      throw new NotFoundException('User with this email does not exist');
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
