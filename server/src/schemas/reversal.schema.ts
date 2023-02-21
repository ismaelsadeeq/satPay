import {Prop,Schema} from '@nestjs/mongoose';
import {  IsNumber, IsString } from 'class-validator';
import {Document,  Schema as MSchema} from 'mongoose';
import { User } from './user.schema';
import { Widthrawals } from './withdrawals.schema';


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


  @Prop({ type: MSchema.Types.ObjectId, ref:'Widthrawals',required:true})
  @IsNumber()
  widthrawal:Widthrawals


}