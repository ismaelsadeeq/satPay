import { Injectable } from '@nestjs/common';
import { Meta, ResponseData } from './interface/response.handler.interface';

@Injectable()
export class ResponseHandlerService {
  data = {};
  meta: Meta = {};
  public static instance: ResponseHandlerService = new ResponseHandlerService();

  constructor() {}

  public async responseBody(data?: unknown, meta?: Meta): Promise<ResponseData> {
    if (data) this.data = data;
    if (meta) this.meta = meta;
    return { data: this.data, meta: this.meta };
  }
}
