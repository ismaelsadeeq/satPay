import { Injectable, Logger } from '@nestjs/common';
import { createInvoice } from 'src/request/payment/invoice';
import { LndClientService } from '../lnd-client/lnd-client.service';
import { AddInvoiceResponse, Invoice } from '@radar/lnrpc';
import { InjectModel } from '@nestjs/mongoose';
import { DBInvoice, DBInvoiceDocument } from 'src/schemas/invoice.schema';
import { Model } from 'mongoose';
import { UserService } from 'src/user/user.service';
import { ResponseHandlerService } from 'src/response-handler/response-handler.service';
import { Meta } from 'src/response-handler/interface/response.handler.interface';
import { UserDocument } from 'src/schemas/user.schema';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(DBInvoice.name)
    private invoiceModel:Model<DBInvoiceDocument>,
    private readonly userService:UserService,
    private readonly responseHandler:ResponseHandlerService
  ){
  }
  async generateInvoice(invoiceData:createInvoice,userId:string){
    try {
      const invoiceArgs:Invoice = {
        memo:invoiceData.purpose,
        valueMsat:invoiceData.amount.toString(),
        expiry:invoiceData.expiryTime
      }
      const invoice:AddInvoiceResponse = await LndClientService.instance.node.addInvoice(invoiceArgs)
      
      const user:UserDocument = await this.userService.getUserEntityById(userId);
      const newInvoice:DBInvoiceDocument = new this.invoiceModel(new DBInvoice())
      newInvoice.amount = invoiceData.amount;
      newInvoice.expirySeconds = invoiceData.expiryTime;
      newInvoice.status = false;
      newInvoice.lIvoice = invoice.paymentRequest;
      newInvoice.user = user;
      const savedInvoice = await newInvoice.save()
      const response:Meta = {
        status:true,
        message:"success",
        pagination:undefined
      }
      return this.responseHandler.responseBody(savedInvoice,response)
    } catch (error) {
      Logger.log(error)
      const response:Meta = {
        status:false,
        message:"failed",
        pagination:undefined
      }
      return this.responseHandler.responseBody({},response)

    }
  }
}
