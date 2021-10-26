import { Body, Controller, Post, UseFilters } from '@nestjs/common';

import { ValidationExceptionFilter } from '../../filters/validation-exception.filter';
import { CreateUserDto } from './dto/createUserDto.dto';
import { UserService } from './user.service';
import { ValidationPipe } from '../../pipes/validation.pipe';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  @UseFilters(new ValidationExceptionFilter())
  async createUser(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    const result = await this.userService.createUser(createUserDto);

    return result;
  }
}
