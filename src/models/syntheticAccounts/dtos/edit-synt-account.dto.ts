import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString
} from 'class-validator';

export class EditSyntheticAccountDto {
  @IsOptional()
  @IsInt()
  @IsPositive()
  number: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsOptional()
  @IsInt()
  @IsPositive()
  accountId: number;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  @IsPositive({ each: true })
  byDebitAccountsIds?: number[];

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  @IsPositive({ each: true })
  byCreditAccountsIds?: number[];
}
