import {
  BadRequestException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/createUserDto.dto';
import { LoginUserDto } from './dto/loginUserDto.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    const SALT_ROUNDS = 10;
    const hashedPassword = await bcrypt.hash(createdUser.password, SALT_ROUNDS);

    createdUser.password = hashedPassword;

    try {
      const savedUser = await createdUser.save();

      return savedUser;
    } catch (error) {
      const errors = Object.values(error.errors).map((errorInfo: any) => ({
        field: errorInfo.path,
        message:
          errorInfo.kind === 'unique'
            ? `${errorInfo.path} must be unique`
            : errorInfo.properties.message,
      }));

      throw new BadRequestException(errors);
    }
  }

  async loginUser(loginUserDto: LoginUserDto) {
    const user = await this.userModel
      .findOne({ email: loginUserDto.email })
      .exec();

    if (!user) {
      throw new NotFoundException('User with this email does not exist');
    }

    try {
      const isValid = await bcrypt.compare(
        loginUserDto.password,
        user.password,
      );

      if (!isValid) {
        return null;
      }

      return user;
    } catch (error) {
      throw new InternalServerErrorException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'Internal Server Error',
      });
    }
  }
}
