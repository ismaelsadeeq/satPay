import { Global, Module } from '@nestjs/common';
import { SocketGateway } from './socket-gateway';
import { ConfigModule } from '@nestjs/config';


@Global()
@Module({

  imports:[
    ConfigModule.forRoot({
      isGlobal:true
    }),
  ],
  exports:[SocketGateway],
  providers: [SocketGateway],
})

export class SocketGatewayModule {}