import {
  Body,
  Controller,
  Post,
  UseFilters,
  Get,
  UseGuards,
  Request,
} from '@nestjs/common';

import { CreateUserDto } from '../dto/createUserDto.dto';
import { UserService } from '../services/user.service';
import { ValidationPipe } from '../../../pipes/validation.pipe';
import { ValidationExceptionFilter } from '../../../filters/validation-exception.filter';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  @UseFilters(new ValidationExceptionFilter())
  async createUser(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    const result = await this.userService.createUser(createUserDto);

    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/guard-req')
  getSomeData(@Request() req) {
    return req.user;
  }
}
