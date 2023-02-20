import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ResponseHandlerModule } from 'src/response-handler/response-handler.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local-strategy';
import { JwtModule } from '@nestjs/jwt';
import { User, UserSchema } from 'src/user/user.schema';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports:[
    MongooseModule.forFeature([
      {name:User.name,schema:UserSchema},
    ]),
    ConfigModule.forRoot({
      isGlobal:true
    }),
    ResponseHandlerModule,
    UserModule,
    PassportModule,
    JwtModule.register({
      secret:process.env.SECRET
    })
  ],
  providers: [AuthService,LocalStrategy,JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {
}
