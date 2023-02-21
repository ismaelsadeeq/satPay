import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable,  UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService:AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration:true,
      secretOrKey: process.env.SECRET,
    });
  }

  async validate(payload: any): Promise<User> {
    const user = await this.authService.JwtValidateUser(payload);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}