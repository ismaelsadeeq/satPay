import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';


export class User {
  id?: string;

  @IsOptional()
  email?: string;

  @IsOptional()
  @IsNotEmpty()
  @MaxLength(20)
  firstName?: string;

  @IsOptional()
  @IsNotEmpty()
  @MaxLength(40)
  lastName?: string;

  @IsOptional()
  @IsOptional()
  @MaxLength(40)
  middleName?: string;

  @IsOptional()
  business?: string;

  @IsOptional()
  @IsOptional()
  @IsString()
  passwordHash?: string;
}
