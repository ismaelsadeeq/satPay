import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UserDocument, User } from '../schemas/user.schema';
import { SignupRequest,updateUserRequest } from '../request';
import { Account, AccountDocument } from 'src/schemas/account.schema';
import { ResponseHandlerService } from 'src/response-handler/response-handler.service';
import { Meta } from 'src/response-handler/interface/response.handler.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    @InjectModel(Account.name)
    private accountModel:Model<AccountDocument>,
    private readonly responseHandler:ResponseHandlerService
  ) {}

  public async getUserEntityById(id: string): Promise<any> {
    const user = await  this.userModel.findById(id);
    user.passwordHash =  undefined;
    return user;
  }

  public async getUserEntityByEmail(email: string): Promise<UserDocument> {
    const normalizedEmail = email;
    const x = await this.userModel.findOne({ email: normalizedEmail });
    return x;
  }

  public async createUser(signupRequest: SignupRequest, passwordHash: string) {
    const exists = await this.userModel.findOne({ email: signupRequest.email });
    if (exists) {
      throw new ConflictException({ message: 'failed User with this phone exists'});
    }
    try {
      const newUser = new this.userModel(new User());
      newUser.passwordHash = passwordHash;
      newUser.firstName = signupRequest.firstName;
      newUser.lastName = signupRequest.lastName;
      newUser.middleName = signupRequest.middleName;
      newUser.email = signupRequest.email;
      newUser.business = signupRequest.business;
      const savedUser = await newUser.save();
      const account = new this.accountModel({balance:0,user:savedUser})
      await account.save();
      return {};
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
  public async createLnUrlUser(passwordHash: string) {
    const exists = await this.userModel.findOne({ passwordHash: passwordHash });
    if (exists) {
      return exists;
    }
    try {
      const newUser = new this.userModel(new User());
      newUser.passwordHash = passwordHash;
      const savedUser = await newUser.save();
      const account = new this.accountModel({balance:0,user:savedUser})
      await account.save();
      return savedUser;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
  public async updateUser(id:string,userUpdate:updateUserRequest) {
    try {
      const user = await this.userModel.findById(id);
      const update = await user.updateOne(userUpdate)
      const response:Meta = {
        status:true,
        message:"success",
        pagination:undefined
      }
      return this.responseHandler.responseBody(
        {},
        response
      )
    } catch (e) {
      const response:Meta = {
        status:false,
        message:e,
        pagination:undefined
      }
      return this.responseHandler.responseBody(
        {},
        response
      )
    }
  }
}

