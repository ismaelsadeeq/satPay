import { Injectable, Logger } from '@nestjs/common';
import { createInvoice, widthrawData } from 'src/request/payment/invoice';
import { LndClientService } from '../lnd-client/lnd-client.service';
import { AddInvoiceResponse, Invoice, SendResponse } from '@radar/lnrpc';
import { InjectModel } from '@nestjs/mongoose';
import { DBInvoice, DBInvoiceDocument } from 'src/schemas/invoice.schema';
import { Model } from 'mongoose';
import { UserService } from 'src/user/user.service';
import { ResponseHandlerService } from 'src/response-handler/response-handler.service';
import { Meta } from 'src/response-handler/interface/response.handler.interface';
import { UserDocument } from 'src/schemas/user.schema';
import { Account, AccountDocument } from 'src/schemas/account.schema';
import { Widthrawal, WidthrawalDocument } from 'src/schemas/withdrawal.schema';


@Injectable()
export class PaymentService {
  
  constructor(
    @InjectModel(DBInvoice.name)
    private invoiceModel:Model<DBInvoiceDocument>,
    @InjectModel(Account.name)
    private accountModel:Model<AccountDocument>,
    @InjectModel(Widthrawal.name)
    private withrawalModel:Model<WidthrawalDocument>,
    private readonly userService:UserService,
    private readonly responseHandler:ResponseHandlerService
  ){
  }

  async generateInvoice(invoiceData:createInvoice,userId:string):Promise<any>{
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
      return this.responseHandler.responseBody(error,response)

    }
  }
  async getBalance(userId:string):Promise<any>{
    try {
      
      const user:UserDocument = await this.userService.getUserEntityById(userId);
      const balance:AccountDocument = await this.accountModel.findOne({user:user});
      const response:Meta = {
        status:true,
        message:"success",
        pagination:undefined
      }
      return this.responseHandler.responseBody(balance,response)
    } catch (error) {
      Logger.log(error)
      const response:Meta = {
        status:false,
        message:"failed",
        pagination:undefined
      }
      return this.responseHandler.responseBody(error,response)

    }
  }
  async getUserPayments(userId:string):Promise<any>{
    try {
      
      const user:UserDocument = await this.userService.getUserEntityById(userId);
      const payments:Array<DBInvoiceDocument> = await this.invoiceModel.find({user:user,status:true}).sort({'createdAt':'descending'});
      const response:Meta = {
        status:true,
        message:"success",
        pagination:undefined
      }
      return this.responseHandler.responseBody(payments,response)
    } catch (error) {
      Logger.log(error)
      const response:Meta = {
        status:false,
        message:"failed",
        pagination:undefined
      }
      return this.responseHandler.responseBody(error,response)

    }
  }

  async widthrawData(widthrawData:widthrawData,userId:string):Promise<any>{
    try {
      const user = await this.userService.getUserEntityById(userId)

      let account:AccountDocument = await this.accountModel.findOne({user:user});

      const decodedInvoice = await LndClientService.instance.node.decodePayReq({payReq:widthrawData.paymentReq});

      if(account.balance < parseInt(decodedInvoice.numMsat)){
        const response:Meta = {
          status:false,
          message:"insufficient balance",
          pagination:undefined
        }
        return this.responseHandler.responseBody({},response)
      }

      await account.updateOne({balance:account.balance - parseInt(decodedInvoice.numMsat)})

      let widthraw:SendResponse;
      
      try {
        widthraw = await LndClientService.instance.node.sendPaymentSync({paymentRequest:widthrawData.paymentReq})
      } catch (error) {
        Logger.log(error)
        account = await this.accountModel.findOne({user:user});
        await account.updateOne({balance:account.balance + parseInt(decodedInvoice.numMsat)})
      }
      
      if(widthraw.paymentError){
        account = await this.accountModel.findOne({user:user});
        await account.updateOne({balance:account.balance + parseInt(decodedInvoice.numMsat)})
        const response:Meta = {
          status:false,
          message:"withrawal failed",
          pagination:undefined
        }
        return this.responseHandler.responseBody({},response)
      }
      if(decodedInvoice.paymentHash !== widthraw.paymentHash.toString('hex') ){
        account = await this.accountModel.findOne({user:user});
        await account.updateOne({balance:account.balance + parseInt(decodedInvoice.numMsat)})
        const response:Meta = {
          status:false,
          message:"incorrect preimage",
          pagination:undefined
        }
        return this.responseHandler.responseBody({widthraw:widthraw,payreq:decodedInvoice},response)
      }
      const widthrawalDocument:WidthrawalDocument = new this.withrawalModel({
        amount:decodedInvoice.numMsat,
        lIvoice:widthrawData.paymentReq,
        status:"successful",
        user:user
      })
      const savedWidthrawalDocument:WidthrawalDocument = await widthrawalDocument.save();
      const response:Meta = {
        status:true,
        message:"success",
        pagination:undefined
      }
      return this.responseHandler.responseBody(savedWidthrawalDocument,response)
    } catch (error) {
      Logger.log(error)
      const response:Meta = {
        status:false,
        message:"failed",
        pagination:undefined
      }
      return this.responseHandler.responseBody(error,response)
    }
  }
  async getWidthrawals(userId:string):Promise<any>{
    try {
      const user:UserDocument = await this.userService.getUserEntityById(userId);
      const widthrawals = await this.withrawalModel.find({user:user}).sort({'createdAt':'descending'});
      const response:Meta = {
        status:true,
        message:"success",
        pagination:undefined
      }
      return this.responseHandler.responseBody(widthrawals,response)
    } catch (error) {
      Logger.log(error)
      const response:Meta = {
        status:false,
        message:"failed",
        pagination:undefined
      }
      return this.responseHandler.responseBody(error,response)
    }
  }
  async checkInvoices(){
    try {
      const invoices:Array<DBInvoiceDocument> = await this.invoiceModel.find({status:false}).populate('user');
      await this.checkInvoicePaymentStatus(invoices);
      const invoices2:Array<DBInvoiceDocument> = await this.invoiceModel.find({status:false})
      await this.checkIfInvoiceExpiry(invoices2)
    } catch (error) {
      Logger.log(error)
    }
  }
  async checkInvoicePaymentStatus(invoices:Array<DBInvoiceDocument>){
    for(let i = 0;i<invoices.length;i++){
      const decodedInvoice = await LndClientService.instance.node.decodePayReq({payReq:invoices[i].lIvoice});
      const lookupInvoice = await LndClientService.instance.node.lookupInvoice({rHashStr:decodedInvoice.paymentHash})

      if(!lookupInvoice.settled){
        continue
      }
      await invoices[i].updateOne({status:true})
      const account:AccountDocument = await this.accountModel.findOne({user:invoices[i].user})
      await account.updateOne({balance: account.balance + invoices[i].amount})
    }
  }
  async checkIfInvoiceExpiry(invoices:Array<any>){
    for(let i = 0;i<invoices.length;i++){
      const currentDate:Date = new Date();
      const expiryDate:Date = new Date(invoices[i].createdAt)
      expiryDate.setSeconds(expiryDate.getSeconds() + parseInt(invoices[i].expirySeconds))
      if (currentDate < expiryDate){
        continue
      }
      await this.invoiceModel.deleteOne({_id:invoices[i].id})
    } 
  }
}
