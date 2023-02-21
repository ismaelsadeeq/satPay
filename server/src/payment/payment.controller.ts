import { Body, Controller, Get, HttpCode, HttpStatus, Logger, Post, Request } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { createInvoice, widthrawData } from 'src/request/payment/invoice';
import { Cron, CronExpression } from '@nestjs/schedule';

@Controller('api/v1/payment')
export class PaymentController {

  constructor(
    private readonly paymentService:PaymentService
  ){}

  @Post('generate-invoice')
  @HttpCode(HttpStatus.CREATED)
  generateInvoice(@Request() req,@Body() generateInvoiceRequest:createInvoice ):Promise<any>{
    return this.paymentService.generateInvoice(generateInvoiceRequest,req.user.id);
  }
  @Get('get-balance')
  @HttpCode(HttpStatus.CREATED)
  getBalance(@Request() req ){
    return this.paymentService.getBalance(req.user.id);
  }

  @Get('get-user-payments')
  @HttpCode(HttpStatus.CREATED)
  getUserPayments(@Request() req ):Promise<any>{
    return this.paymentService.getUserPayments(req.user.id);
  }

  @Post('widthraw')
  @HttpCode(HttpStatus.CREATED)
  widthrawMSat(@Body() widthrawData:widthrawData,@Request() req):Promise<any>{
    return this.paymentService.widthrawData(widthrawData,req.user.id)
  }

  @Get('get-widthrawals')
  @HttpCode(HttpStatus.CREATED)
  getWidthrawal(@Request() req):Promise<any>{
    return this.paymentService.getWidthrawals(req.user.id)
  }
  @Cron(CronExpression.EVERY_10_SECONDS)
  runEvery10Seconds(){
    return this.paymentService.checkInvoices();
  }

}
