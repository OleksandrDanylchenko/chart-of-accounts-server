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
  syntheticAccountIdField,
  titleField
} from '../documents/swagger-descriptors';

export class EditSubAccountDto {
  @ApiPropertyOptional(numberField)
  @IsOptional()
  @IsInt()
  @IsPositive()
  number: number;

  @ApiPropertyOptional(titleField)
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional(descriptionField)
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiPropertyOptional(syntheticAccountIdField)
  @IsOptional()
  @IsInt()
  @IsPositive()
  syntheticAccountId: number;
}
