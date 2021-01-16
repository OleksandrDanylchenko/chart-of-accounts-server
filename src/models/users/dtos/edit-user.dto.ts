import { ApiProperty } from '@nestjs/swagger';
import {
  emailField,
  passwordField,
  refreshTokenField
} from '../documentation/user-fields.descriptors';
import {
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
  MinLength
} from 'class-validator';

export class EditUserDto {
  @ApiProperty(emailField)
  @IsOptional()
  @IsEmail()
  email: string;

  @ApiProperty(passwordField)
  @IsOptional()
  @IsString()
  @MinLength(5)
  password: string;

  @ApiProperty(refreshTokenField)
  @IsOptional()
  @IsInt()
  refreshTokenId: number | null;
}
