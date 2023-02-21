import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserService } from './user.service';
import { User, UserSchema } from '../schemas/user.schema';
import { UserController } from './user.controller';
import { ResponseHandlerModule } from 'src/response-handler/response-handler.module';
import { Account, AccountSchema } from 'src/schemas/account.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name:Account.name, schema: AccountSchema}
    ]),
    ResponseHandlerModule,
  ],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
