import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),
    MongooseModule.forRoot(process.env.MONGO_STRING || ''),
    AuthModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide:APP_GUARD,
      useClass:JwtAuthGuard
    }
  ],
})
export class AppModule {}
