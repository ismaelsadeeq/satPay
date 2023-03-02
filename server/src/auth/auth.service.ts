import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { SignInRequest } from '../request/auth/login-request.model';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { ResponseHandlerService } from 'src/response-handler/response-handler.service';
import {  SignupRequest } from 'src/request';
import { JwtService } from '@nestjs/jwt';
import { Meta } from 'src/response-handler/interface/response.handler.interface';
import { LnurlService } from 'src/lnurl/lnurl.service';
import { SocketGateway } from 'src/socket-gateway/socket-gateway';


@Injectable()
export class AuthService {
  constructor(
    private readonly userService:UserService,
    private responseHandler:ResponseHandlerService,
    private jwtService: JwtService,
    private lnurlService:LnurlService,
    private socketGateWay:SocketGateway
  ){
  }
  
  async validateUser(email:string,password:string):Promise<any>{
    try{
      const user = await this.userService.getUserEntityByEmail(email);
      if (user && bcrypt.compareSync(password , user.passwordHash)) {
         return  user;
      }
      return null;
    }
    catch(e){
      Logger.log(e)
      return null
    }
  }
  async JwtValidateUser(payload: { username: string; sub: string }): Promise<any> {
    const user = await this.userService.getUserEntityById(payload.sub);
    if (user !== undefined && user !== null && user.email === payload.username) return user;
    return null;
  }
  async signup(signupRequest: SignupRequest): Promise<any> {
    
    try{
      const data = await this.userService.createUser(signupRequest, await bcrypt.hash(signupRequest.password, 10));
      const response:Meta = {
        status:true,
        message:"User created successfully",
        pagination:undefined
      }
      return this.responseHandler.responseBody(data,response);
    }
    catch(e){
      Logger.log(e)
      const response:Meta = {
        status:false,
        message:"failed",
        pagination:undefined
      }
      return this.responseHandler.responseBody({},response)
    }
  }
  async login(data:SignInRequest) {
    try {
      const user = await this.userService.getUserEntityByEmail(data.email);
      if (user === null || user === undefined) throw new UnauthorizedException();
      const validateUser =  await this.validateUser(data.email,data.password);
      if(validateUser == null){
        throw new UnauthorizedException();
      }
      const payload = { username: user.email, sub: user.id, state: 'base'};
      const response:Meta = {
        status:true,
        message:"success",
        pagination:undefined
      }
      user.passwordHash = undefined;
      return this.responseHandler.responseBody(
        {
          token: this.jwtService.sign(payload),
          user: user,
        },
        response
      )
    }catch(e){
      Logger.log(e)
      const response:Meta = {
        status:false,
        message:"failed",
        pagination:undefined
      }
      return this.responseHandler.responseBody({}, response);
    }
  
  
  }
  async lnurlLogin() {
    try {
      const result = await this.lnurlService.lnurlServer.generateNewUrl("login")
      const response:Meta = {
        status:true,
        message:"success",
        pagination:undefined
      }
      return this.responseHandler.responseBody(
        result,
        response
      )
    }catch(e){
      Logger.log(e)
      const response:Meta = {
        status:false,
        message:"failed",
        pagination:undefined
      }
      return this.responseHandler.responseBody({}, response);
    }
  }
  async pseudoLogin(query:any) {
    try {
      if (query.key) {
        const key: string = String(query.key);
        const user  = await this.userService.createLnUrlUser(await bcrypt.hash(query.key, 10))
        const payload = { username: user.email, sub: user.id, state: 'base'};
        const token:string =  this.jwtService.sign(payload);
        this.socketGateWay.server.emit('bearer', { token });
        const response:Meta = {
          status:true,
          message:"success",
          pagination:undefined
        }
        return this.responseHandler.responseBody(
          key,
          response
        )
      }
      const response:Meta = {
        status:false,
        message:"unsuccesssful ln url login",
        pagination:undefined
      }
      return this.responseHandler.responseBody(
        {},
        response
      )
    }catch(e){
      Logger.log(e)
      const response:Meta = {
        status:false,
        message:"failed",
        pagination:undefined
      }
      return this.responseHandler.responseBody({}, response);
    }
  
  
  }

}
