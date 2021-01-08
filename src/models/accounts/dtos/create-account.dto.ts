import { IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreateAccountDto {
  @IsInt()
  @IsPositive()
  number: number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
