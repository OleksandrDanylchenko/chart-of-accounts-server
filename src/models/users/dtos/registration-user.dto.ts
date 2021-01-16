import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';
import {
  emailField,
  passwordField,
  registrationSecretField
} from '../documentation/user-fields.descriptors';

export class RegistrationUserDto {
  @ApiProperty(emailField)
  @IsEmail()
  email: string;

  @ApiProperty(passwordField)
  @IsString()
  @MinLength(5)
  password: string;

  @ApiProperty(registrationSecretField)
  @IsString()
  @MinLength(5)
  registrationSecret: string;
}
