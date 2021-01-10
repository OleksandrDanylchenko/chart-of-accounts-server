import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString
} from 'class-validator';

export class EditSubAccountDto {
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
  syntheticAccountId: number;
}
