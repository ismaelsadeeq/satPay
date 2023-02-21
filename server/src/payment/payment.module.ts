import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';
import { Invoice, InvoiceSchema } from 'src/schemas/invoice.schema';
import { Account, AccountSchema } from 'src/schemas/account.schema';
import { Widthrawal, WidthrawalSchema } from 'src/schemas/withdrawal.schema';
import { Reversal, ReversalSchema } from 'src/schemas/reversal.schema';

@Module({
  imports:[
    MongooseModule.forFeature([
      {name:User.name,schema:UserSchema},
      {name:Invoice.name,schema:InvoiceSchema},
      {name:Account.name,schema:AccountSchema},
      {name:Widthrawal.name,schema:WidthrawalSchema},
      {name:Reversal.name,schema:ReversalSchema}
    ])
  ],
  providers: [PaymentService],
  controllers: [PaymentController]
})
export class PaymentModule {}
