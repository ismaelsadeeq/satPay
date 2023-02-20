
import {  Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { SignupRequest } from 'src/request';
import { AuthService } from './auth.service';
import { SignInRequest } from '../request/auth/login-request.model';
import { Public } from './public.decorator';


@Controller('api/v1/auth')
export class AuthController {
  constructor(
    private readonly authService:AuthService
  )
  {}
  @Public()
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  signup(@Body() signupRequest: SignupRequest) {
    return this.authService.signup(signupRequest);
  }
  @Public()
  @Post('login')
  async login(@Body() data:SignInRequest) : Promise<any>{
    return await this.authService.login(data)
  }

}
