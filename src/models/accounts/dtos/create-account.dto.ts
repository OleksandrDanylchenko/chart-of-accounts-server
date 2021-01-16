import { IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {
  descriptionField,
  numberField,
  titleField
} from '../documentation/account-fields.descriptors';

export class CreateAccountDto {
  @ApiProperty(numberField)
  @IsInt()
  @IsPositive()
  number: number;

  @ApiProperty(titleField)
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty(descriptionField)
  @IsString()
  @IsNotEmpty()
  description: string;
}
