import {Prop,Schema, SchemaFactory} from '@nestjs/mongoose';
import {  IsNumber, IsString } from 'class-validator';
import {Document,  Schema as MSchema} from 'mongoose';
import { User } from './user.schema';
import { Widthrawal } from './withdrawal.schema';


export type ReversalDocument = Reversal & Document;

@Schema({timestamps:true})
export class Reversal {
 
  @Prop({required:true})
  @IsNumber()
  amount:number

  @Prop({required:true})
  @IsString()
  lIvoice:string

  @Prop({required:true})
  @IsString()
  status:string

  @Prop({ type: MSchema.Types.ObjectId, ref:'User',required:true})
  @IsNumber()
  user:User


  @Prop({ type: MSchema.Types.ObjectId, ref:'Widthrawal',required:true})
  @IsNumber()
  widthrawal:Widthrawal


}

export const ReversalSchema = SchemaFactory.createForClass(Reversal);
