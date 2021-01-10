import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  accountIdField,
  byCreditAccountsIdsField,
  byDebitAccountsIdsField,
  descriptionField,
  numberField,
  titleField
} from '../documentation/swagger-descriptors';

export class EditSyntheticAccountDto {
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

  @ApiPropertyOptional(accountIdField)
  @IsOptional()
  @IsInt()
  @IsPositive()
  accountId: number;

  @ApiPropertyOptional(byDebitAccountsIdsField)
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  @IsPositive({ each: true })
  byDebitAccountsIds?: number[];

  @ApiPropertyOptional(byCreditAccountsIdsField)
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  @IsPositive({ each: true })
  byCreditAccountsIds?: number[];
}
