import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString
} from 'class-validator';

export class CreateSyncAccountDto {
  @IsInt()
  @IsPositive()
  number: number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsInt()
  @IsPositive()
  accountId: number;

  @IsArray()
  @IsInt({ each: true })
  @IsPositive({ each: true })
  subAccountsIds: number[];

  @IsArray()
  @IsInt({ each: true })
  @IsPositive({ each: true })
  byDebitAccountsIds: number[];

  @IsArray()
  @IsInt({ each: true })
  @IsPositive({ each: true })
  byCreditAccountsIds: number[];
}
