import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LndClientModule } from './lnd-client/lnd-client.module';
import { PaymentModule } from './payment/payment.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),
    MongooseModule.forRoot(process.env.MONGO_STRING || ''),
    ScheduleModule.forRoot(),
    AuthModule,
    UserModule,
    PaymentModule,
    LndClientModule,
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
