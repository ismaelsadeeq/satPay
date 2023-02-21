import { Module } from '@nestjs/common';
import { LndClientService } from './lnd-client.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),
  ],
  providers:[LndClientService]
})
export class LndClientModule {}
