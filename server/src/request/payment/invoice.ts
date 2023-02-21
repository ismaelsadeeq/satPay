import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class createInvoice {
  
  @IsNotEmpty()
  @IsNumber()
  amount:number

  @IsString()
  purpose:string

  @IsDate()
  expiryTime:string
  
}

export class widthrawData {

  @IsNotEmpty()
  @IsString()
  paymentReq:string
}