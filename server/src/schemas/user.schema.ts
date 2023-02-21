import { IsEmail, IsNotEmpty, IsOptional, IsUrl, Matches, MaxLength } from 'class-validator';
import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MSchema } from 'mongoose';


export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {

  @IsOptional()
  @IsEmail()
  @Prop({ unique:false,required: true  })
  email?: string;


  @IsNotEmpty()
  @Prop({ required: true })
  passwordHash: string;
  
  @MaxLength(20)
  @Prop({})
  firstName: string;

  @MaxLength(40)
  @Prop({})
  lastName: string;

  @MaxLength(40)
  @Prop({})
  middleName?: string;

  @Prop({})
  business?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.index({ firstName: 'text', lastName: 'text', email: 'text' });
