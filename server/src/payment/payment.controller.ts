import { Body, Controller, HttpCode, HttpStatus, Post, Request } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { createInvoice } from 'src/request/payment/invoice';

@Controller('api/v1/payment')
export class PaymentController {

  constructor(
    private readonly paymentService:PaymentService
  ){}

  @Post('generate-invoice')
  @HttpCode(HttpStatus.CREATED)
  generateInvoice(@Request() req,@Body() generateInvoiceRequest:createInvoice ){
    return this.paymentService.generateInvoice(generateInvoiceRequest,req.user.id);
  }
}
