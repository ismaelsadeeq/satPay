import {Prop,Schema} from '@nestjs/mongoose';
import {  IsNumber } from 'class-validator';
import {Document,  Schema as MSchema} from 'mongoose';
import { User } from './user.schema';


export type AccountDocument = Account & Document;

@Schema({timestamps:true})
export class Account {
 

  @Prop({required:true})
  @IsNumber()
  balance:number

  @Prop({ type: MSchema.Types.ObjectId, ref:'User',required:true})
  @IsNumber()
  user:User

}