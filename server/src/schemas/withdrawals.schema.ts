import {Prop,Schema} from '@nestjs/mongoose';
import {  IsNumber, IsString } from 'class-validator';
import {Document,  Schema as MSchema} from 'mongoose';
import { User } from './user.schema';


export type WidthrawalsDocument = Widthrawals & Document;

@Schema({timestamps:true})
export class Widthrawals {
 
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

}