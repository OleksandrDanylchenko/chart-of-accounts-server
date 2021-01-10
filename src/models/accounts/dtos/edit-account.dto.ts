import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  descriptionField,
  numberField,
  titleField
} from '../documents/account-fields.descriptors';

export class EditAccountDto {
  @ApiPropertyOptional(numberField)
  @IsOptional()
  @IsInt()
  @IsPositive()
  number?: number;

  @ApiPropertyOptional(titleField)
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title?: string;

  @ApiPropertyOptional(descriptionField)
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: string;
}
