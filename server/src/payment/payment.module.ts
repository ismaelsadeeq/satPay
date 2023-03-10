import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';
import { DBInvoice, DBInvoiceSchema } from 'src/schemas/invoice.schema';
import { Account, AccountSchema } from 'src/schemas/account.schema';
import { Widthrawal, WidthrawalSchema } from 'src/schemas/withdrawal.schema';
import { UserModule } from 'src/user/user.module';
import { ResponseHandlerModule } from 'src/response-handler/response-handler.module';
import { SocketGatewayModule } from 'src/socket-gateway/socket-gateway.module';

@Module({
  imports:[
    MongooseModule.forFeature([
      {name:User.name,schema:UserSchema},
      {name:DBInvoice.name,schema:DBInvoiceSchema},
      {name:Account.name,schema:AccountSchema},
      {name:Widthrawal.name,schema:WidthrawalSchema},
    ]),
    UserModule,
    ResponseHandlerModule,
    SocketGatewayModule,
    
  ],
  providers: [PaymentService],
  controllers: [PaymentController]
})
export class PaymentModule {}
