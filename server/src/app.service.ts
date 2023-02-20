import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello Walker you should not be here, but here you are anyway!';
  }
}
