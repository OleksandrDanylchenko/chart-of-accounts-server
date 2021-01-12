import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';
import {
  emailField,
  passwordField
} from '../documentation/user-fields.descriptors';

export class LoginUserDto {
  @ApiProperty(emailField)
  @IsEmail()
  email: string;

  @ApiProperty(passwordField)
  @IsString()
  @MinLength(5)
  password: string;
}
