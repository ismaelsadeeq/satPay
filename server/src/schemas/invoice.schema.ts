import {Prop,Schema, SchemaFactory} from '@nestjs/mongoose';
import { IsBoolean, IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import {Document,  Schema as MSchema} from 'mongoose';
import { User } from './user.schema';


export type InvoiceDocument = Invoice & Document;

@Schema({timestamps:true})
export class Invoice {
 

  @Prop({required:true})
  @IsNumber()
  amount:number

  @Prop({})
  @IsOptional()
  purpose:number

  @Prop({required:true})
  @IsDate()
  expiryTime:Date

  @Prop({required:true})
  @IsBoolean()
  status:number


  @Prop({required:true})
  @IsString()
  lIvoice:string

  @Prop({ type: MSchema.Types.ObjectId, ref:'User',required:true})
  @IsNumber()
  user:User

}
export const InvoiceSchema = SchemaFactory.createForClass(Invoice);
