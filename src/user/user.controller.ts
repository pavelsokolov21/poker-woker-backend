import { CreateUserDto } from './dto/createUserDto.dto';
import { Body, Controller, Post } from '@nestjs/common';

import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  async createUser(@Body() createUserDto: CreateUserDto) {
    await this.userService.createUser(createUserDto);

    return 'User has been created';
  }
}
