import { IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {
  descriptionField,
  numberField,
  syntheticAccountIdField,
  titleField
} from '../documents/swagger-descriptors';

export class CreateSubAccountDto {
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

  @ApiProperty(syntheticAccountIdField)
  @IsInt()
  @IsPositive()
  syntheticAccountId: number;
}
