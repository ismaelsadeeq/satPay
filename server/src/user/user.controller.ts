import {Controller, HttpCode, HttpStatus,  Get, Query, Request } from '@nestjs/common';

import { UserService } from './user.service';
import { ResponseHandlerService } from 'src/response-handler/response-handler.service';
import { Meta } from 'src/response-handler/interface/response.handler.interface';

@Controller('api/v1/users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly responseHandler:ResponseHandlerService
  ) {}

  @Get('current')
  @HttpCode(HttpStatus.OK)
  async currentUser(@Request() req): Promise<any> {
    const usr = await this.userService.getUserEntityById(req.user.id);
    const response:Meta = {
      status:true,
      message:"success",
      pagination:undefined
    }
    return this.responseHandler.responseBody(usr,response);

  }
}
