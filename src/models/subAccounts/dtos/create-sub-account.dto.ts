import { IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreateSubAccountDto {
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
  syntheticAccountId: number;
}
