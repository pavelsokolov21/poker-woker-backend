import {
  Body,
  Controller,
  HttpStatus,
  Post,
  UnauthorizedException,
  UseFilters,
} from '@nestjs/common';

import { CreateUserDto } from './dto/createUserDto.dto';
import { LoginUserDto } from './dto/loginUserDto.dto';
import { UserService } from './user.service';
import { ValidationPipe } from '../../pipes/validation.pipe';
import { ValidationExceptionFilter } from '../../filters/validation-exception.filter';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  @UseFilters(new ValidationExceptionFilter())
  async createUser(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    const result = await this.userService.createUser(createUserDto);

    return result;
  }

  @Post('/login')
  @UseFilters(new ValidationExceptionFilter())
  async loginUser(@Body(new ValidationPipe()) loginUserDto: LoginUserDto) {
    const user = await this.userService.loginUser(loginUserDto);

    if (!user) {
      throw new UnauthorizedException({
        statusCode: HttpStatus.UNAUTHORIZED,
        error: 'Password missmatch',
      });
    }

    return user;
  }
}
