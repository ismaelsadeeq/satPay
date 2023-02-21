import {Prop,Schema, SchemaFactory} from '@nestjs/mongoose';
import { IsBoolean, IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import {Document,  Schema as MSchema} from 'mongoose';
import { User } from './user.schema';


export type DBInvoiceDocument = DBInvoice & Document;

@Schema({timestamps:true})
export class DBInvoice {
 

  @Prop({required:true})
  @IsNumber()
  amount:number

  @Prop({})
  @IsOptional()
  purpose:string

  @Prop({required:true})
  @IsString()
  expirySeconds:string

  @Prop({required:true})
  @IsBoolean()
  status:boolean


  @Prop({required:true})
  @IsString()
  lIvoice:string

  @Prop({ type: MSchema.Types.ObjectId, ref:'User',required:true})
  @IsNumber()
  user:User

}
export const DBInvoiceSchema = SchemaFactory.createForClass(DBInvoice);
