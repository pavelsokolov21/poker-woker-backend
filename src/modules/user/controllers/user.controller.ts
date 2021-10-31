import { Body, Controller, Post, UseFilters } from '@nestjs/common';

import { CreateUserDto } from '../dto/createUserDto.dto';
import { UserService } from '../services/user.service';
import { ValidationPipe } from '../../../pipes/validation.pipe';
import { ValidationExceptionFilter } from '../../../filters/validation-exception.filter';

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
