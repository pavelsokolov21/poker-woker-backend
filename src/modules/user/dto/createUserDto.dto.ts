import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

import { Match } from '../../../match.decorator';

export class CreateUserDto {
  @IsEmail({}, { message: 'Invalid email address' })
  email: string;

  @IsString()
  @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}$/, {
    message: 'Incorrect password',
  })
  password: string;

  @IsString()
  @Match('password', { message: 'Password mismatch' })
  passwordConfirm: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  nickname: string;
}
