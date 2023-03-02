import { Module } from '@nestjs/common';
import { LnurlService } from './lnurl.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports:[
    ConfigModule.forRoot({
      isGlobal:true
    }),
  ],
  exports:[LnurlService],
  providers: [LnurlService]
})
export class LnurlModule {}
