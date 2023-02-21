import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UserDocument, User } from '../schemas/user.schema';
import { SignupRequest } from '../request';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
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
      const r = await newUser.save();
      return {};
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}

