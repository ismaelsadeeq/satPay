import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class InitialSignupRequest {
  @IsEmail()
  email: string;
}

export class ValidateSignupRequest {
  @IsString()
  token: string;

  @IsString()
  signup_id: string;
}

export class SignupRequest {


  @IsNotEmpty()
  @Matches(RegExp('^[a-zA-Z0-9\\-]+$'))
  @MaxLength(20)
  firstName: string;

  @IsNotEmpty()
  @Matches(RegExp('^[a-zA-Z0-9\\-]+$'))
  @MaxLength(20)
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsOptional()
  @MaxLength(20)
  middleName?: string;


  @IsNotEmpty()
  @Matches(RegExp('^[a-zA-Z0-9\\-]+$'))
  @MaxLength(20)
  business?:string
  
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}



export class updateUserRequest {


  @IsNotEmpty()
  @Matches(RegExp('^[a-zA-Z0-9\\-]+$'))
  @MaxLength(20)
  firstName?: string;

  @IsNotEmpty()
  @Matches(RegExp('^[a-zA-Z0-9\\-]+$'))
  @MaxLength(20)
  lastName?: string;

  @IsOptional()
  @MaxLength(20)
  middleName?: string;

  @IsNotEmpty()
  @Matches(RegExp('^[a-zA-Z0-9\\-]+$'))
  @MaxLength(20)
  business?:string
}
