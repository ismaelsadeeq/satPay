import {Prop,Schema, SchemaFactory} from '@nestjs/mongoose';
import {  IsNumber, IsString } from 'class-validator';
import {Document,  Schema as MSchema} from 'mongoose';
import { User } from './user.schema';


export type WidthrawalDocument = Widthrawal & Document;

@Schema({timestamps:true})
export class Widthrawal {
 
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
export const WidthrawalSchema = SchemaFactory.createForClass(Widthrawal);
