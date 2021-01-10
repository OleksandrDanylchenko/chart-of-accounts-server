import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {
  accountIdField,
  byCreditAccountsIdsField,
  byDebitAccountsIdsField,
  descriptionField,
  numberField,
  titleField
} from '../documentation/swagger-descriptors';

export class CreateSyntheticAccountDto {
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

  @ApiProperty(accountIdField)
  @IsInt()
  @IsPositive()
  accountId: number;

  @ApiProperty(byDebitAccountsIdsField)
  @IsArray()
  @IsInt({ each: true })
  @IsPositive({ each: true })
  byDebitAccountsIds: number[];

  @ApiProperty(byCreditAccountsIdsField)
  @IsArray()
  @IsInt({ each: true })
  @IsPositive({ each: true })
  byCreditAccountsIds: number[];
}
